# ultimate_stock_toolkit.py

import yfinance as yf
import pandas as pd
import numpy as np
from textblob import TextBlob
import telegram
import dash
from dash import dcc, html
from dash.dependencies import Input, Output
import plotly.graph_objs as go
from datetime import datetime
import threading
import math
from scipy.stats import norm
from arch import arch_model

# -------------------------
# CONFIGURATION
# -------------------------
TICKERS = ["AAPL", "MSFT", "GOOGL"]
LOOKBACK = 30        # days for anomaly detection
THRESHOLD = 2        # std deviation for anomaly
TELEGRAM_TOKEN = "YOUR_TELEGRAM_BOT_TOKEN"
TELEGRAM_CHAT_ID = "YOUR_CHAT_ID"
NEWSAPI_KEY = "YOUR_NEWSAPI_KEY"

bot = telegram.Bot(token=TELEGRAM_TOKEN)

# -------------------------
# STOCK DATA FETCH
# -------------------------
def fetch_data(ticker, period=f"{LOOKBACK}d"):
    data = yf.download(ticker, period=period, interval="1d")
    data['Returns'] = data['Close'].pct_change()
    return data

# -------------------------
# ANOMALY DETECTION
# -------------------------
def detect_anomalies(data, threshold=THRESHOLD):
    mean = data['Returns'].mean()
    std = data['Returns'].std()
    data['Anomaly'] = np.where(abs(data['Returns']-mean) > threshold*std, True, False)
    return data

# -------------------------
# NEWS SENTIMENT
# -------------------------
def analyze_news(ticker):
    try:
        import requests
        url = f"https://newsapi.org/v2/everything?q={ticker}&apiKey={NEWSAPI_KEY}"
        articles = requests.get(url).json()['articles'][:5]
        sentiments = []
        for art in articles:
            title = art['title']
            polarity = TextBlob(title).sentiment.polarity
            sentiments.append({'title': title, 'sentiment': polarity})
        return sentiments
    except:
        return []

# -------------------------
# PORTFOLIO OPTIMIZATION
# -------------------------
def optimize_portfolio(tickers=TICKERS):
    data = yf.download(tickers, period="1y")['Adj Close']
    returns = data.pct_change().dropna()
    mean_returns = returns.mean()
    cov_matrix = returns.cov()
    num_portfolios = 5000
    results = np.zeros((3, num_portfolios))

    for i in range(num_portfolios):
        weights = np.random.random(len(tickers))
        weights /= np.sum(weights)
        port_return = np.sum(weights*mean_returns)*252
        port_std = np.sqrt(np.dot(weights.T, np.dot(cov_matrix*252, weights)))
        sharpe = port_return/port_std
        results[0,i] = port_return
        results[1,i] = port_std
        results[2,i] = sharpe

    results_df = pd.DataFrame(results.T, columns=["Return","Volatility","Sharpe"])
    return results_df.iloc[results_df["Sharpe"].idxmax()]

# -------------------------
# MONTE CARLO SIMULATION
# -------------------------
def monte_carlo_simulation(ticker, days=30, sims=100):
    data = yf.download(ticker, period="1y")['Adj Close']
    returns = data.pct_change().dropna()
    S0 = data[-1]
    mu = returns.mean()*252
    sigma = returns.std()*np.sqrt(252)
    paths = []
    for _ in range(sims):
        price = S0
        path = [price]
        for _ in range(days):
            price = price*np.exp((mu-0.5*sigma**2)/252 + sigma*np.random.normal())
            path.append(price)
        paths.append(path)
    return np.array(paths)

# -------------------------
# OPTIONS PRICING (BLACK-SCHOLES)
# -------------------------
def black_scholes(S, K, T, r, sigma, option_type='call'):
    d1 = (math.log(S/K) + (r+0.5*sigma**2)*T)/(sigma*math.sqrt(T))
    d2 = d1 - sigma*math.sqrt(T)
    if option_type=='call':
        return S*norm.cdf(d1)-K*math.exp(-r*T)*norm.cdf(d2)
    else:
        return K*math.exp(-r*T)*norm.cdf(-d2)-S*norm.cdf(-d1)

# -------------------------
# VOLATILITY FORECAST (GARCH)
# -------------------------
def forecast_volatility(ticker):
    data = yf.download(ticker, period="2y")['Adj Close']
    returns = 100*data.pct_change().dropna()
    model = arch_model(returns, vol='Garch', p=1, q=1)
    res = model.fit(disp='off')
    forecast = res.forecast(horizon=5)
    return forecast.variance[-1:]

# -------------------------
# REINFORCEMENT LEARNING TRADING SIGNAL
# -------------------------
def rl_trading_signal(ticker):
    data = yf.download(ticker, period="1y")['Adj Close']
    returns = data.pct_change().dropna().values
    states = 100
    actions = 3  # 0: hold, 1: buy, 2: sell
    Q = np.zeros((states, actions))
    alpha, gamma, epsilon = 0.1, 0.9, 0.1
    discrete = np.digitize(returns, bins=np.linspace(min(returns), max(returns), states-1))
    for _ in range(1000):
        state = discrete[0]
        for t in range(1,len(discrete)):
            action = np.random.randint(0,3) if np.random.rand()<epsilon else np.argmax(Q[state])
            reward = returns[t] if action==1 else -returns[t] if action==2 else 0
            next_state = discrete[t]
            Q[state,action] = Q[state,action]+alpha*(reward+gamma*np.max(Q[next_state])-Q[state,action])
            state = next_state
    return np.argmax(Q[state])

# -------------------------
# TELEGRAM ALERTS
# -------------------------
def send_alert(ticker, message):
    bot.send_message(chat_id=TELEGRAM_CHAT_ID, text=f"{ticker}: {message}")

def monitor_stocks():
    import time
    while True:
        for ticker in TICKERS:
            data = detect_anomalies(fetch_data(ticker))
            if data['Anomaly'].iloc[-1]:
                send_alert(ticker,"⚠️ Anomaly detected today!")
        time.sleep(3600)

threading.Thread(target=monitor_stocks, daemon=True).start()

# -------------------------
# DASHBOARD
# -------------------------
app = dash.Dash(__name__)
app.layout = html.Div([
    html.H1("Ultimate Smart Stock Toolkit"),
    dcc.Dropdown(id='dropdown', options=[{'label': t,'value':t} for t in TICKERS], value=TICKERS[0]),
    dcc.Graph(id='graph'),
    dcc.Interval(id='interval', interval=60000, n_intervals=0)
])

@app.callback(Output('graph','figure'), Input('dropdown','value'))
def update_graph(ticker):
    data = detect_anomalies(fetch_data(ticker))
    fig = go.Figure()
    fig.add_trace(go.Candlestick(x=data.index, open=data['Open'], high=data['High'], low=data['Low'], close=data['Close'], name='Price'))
    anomalies = data[data['Anomaly']==True]
    if not anomalies.empty:
        fig.add_trace(go.Scatter(x=anomalies.index, y=anomalies['Close'], mode='markers', marker=dict(color='red', size=10), name='Anomaly'))
    return fig

if __name__=="__main__":
    print("Portfolio Optimization:\n", optimize_portfolio())
    print("RL Trading Signals:")
    for t in TICKERS:
        print(f"{t}: Action {rl_trading_signal(t)}")
    app.run_server(debug=True)
      

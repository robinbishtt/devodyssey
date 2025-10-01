# smart_stock_toolkit.py

import yfinance as yf
import pandas as pd
import numpy as np
from textblob import TextBlob
import telegram
import dash
from dash import dcc, html
from dash.dependencies import Input, Output
import plotly.graph_objs as go
from datetime import datetime, timedelta
import threading

# -------------------------
# CONFIGURATION
# -------------------------
TICKERS = ["AAPL", "MSFT", "GOOGL"]
LOOKBACK = 30        # days for anomaly detection
THRESHOLD = 2        # standard deviation threshold
TELEGRAM_TOKEN = "YOUR_TELEGRAM_BOT_TOKEN"
TELEGRAM_CHAT_ID = "YOUR_CHAT_ID"

bot = telegram.Bot(token=TELEGRAM_TOKEN)

# -------------------------
# FETCH DATA
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
    data['Anomaly'] = np.where(abs(data['Returns'] - mean) > threshold * std, True, False)
    return data

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
        portfolio_return = np.sum(weights * mean_returns) * 252
        portfolio_std = np.sqrt(np.dot(weights.T, np.dot(cov_matrix*252, weights)))
        sharpe_ratio = portfolio_return / portfolio_std
        results[0,i] = portfolio_return
        results[1,i] = portfolio_std
        results[2,i] = sharpe_ratio

    results_df = pd.DataFrame(results.T, columns=["Return","Volatility","Sharpe"])
    return results_df.iloc[results_df["Sharpe"].idxmax()]

# -------------------------
# NEWS SENTIMENT
# -------------------------
def analyze_news(ticker):
    try:
        import requests
        url = f"https://newsapi.org/v2/everything?q={ticker}&apiKey=YOUR_NEWSAPI_KEY"
        articles = requests.get(url).json()['articles'][:5]
        sentiments = []
        for article in articles:
            title = article['title']
            polarity = TextBlob(title).sentiment.polarity
            sentiments.append({'title': title, 'sentiment': polarity})
        return sentiments
    except:
        return []

# -------------------------
# TELEGRAM ALERTS
# -------------------------
def send_alert(ticker, message):
    bot.send_message(chat_id=TELEGRAM_CHAT_ID, text=f"{ticker}: {message}")

# -------------------------
# DASHBOARD
# -------------------------
app = dash.Dash(__name__)

app.layout = html.Div([
    html.H1("Smart Stock Dashboard"),
    dcc.Dropdown(id='dropdown', options=[{'label': t, 'value': t} for t in TICKERS], value=TICKERS[0]),
    dcc.Graph(id='stock-graph'),
    dcc.Interval(id='interval-component', interval=60000, n_intervals=0)
])

@app.callback(Output('stock-graph','figure'), Input('dropdown','value'))
def update_graph(ticker):
    data = fetch_data(ticker, period="30d")
    fig = go.Figure()
    fig.add_trace(go.Candlestick(x=data.index, open=data['Open'], high=data['High'], low=data['Low'], close=data['Close'], name="Price"))
    anomalies = data[data['Anomaly']==True]
    if not anomalies.empty:
        fig.add_trace(go.Scatter(x=anomalies.index, y=anomalies['Close'], mode='markers', marker=dict(color='red', size=10), name='Anomaly'))
    return fig

# -------------------------
# RUN ALERTS IN BACKGROUND
# -------------------------
def monitor_stocks():
    while True:
        for ticker in TICKERS:
            data = detect_anomalies(fetch_data(ticker))
            if data['Anomaly'].iloc[-1]:
                send_alert(ticker, "⚠️ Anomaly detected today!")
        import time
        time.sleep(3600)  # check every hour

threading.Thread(target=monitor_stocks, daemon=True).start()

# -------------------------
# RUN DASHBOARD
# -------------------------
if __name__ == "__main__":
    app.run_server(debug=True)
  

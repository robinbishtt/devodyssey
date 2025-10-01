# anomaly_detection.py

import yfinance as yf
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from datetime import datetime, timedelta

# -------------------------
# CONFIGURATION
# -------------------------
TICKER = "AAPL"
LOOKBACK = 30  # days
THRESHOLD = 2  # standard deviations for anomaly

# -------------------------
# FETCH HISTORICAL DATA
# -------------------------
def fetch_stock_data(ticker, period="2mo"):
    data = yf.download(ticker, period=period, interval="1d")
    data['Returns'] = data['Close'].pct_change()
    return data

# -------------------------
# DETECT ANOMALIES
# -------------------------
def detect_anomalies(data, threshold=2):
    mean = data['Returns'].mean()
    std = data['Returns'].std()
    data['Anomaly'] = np.where(abs(data['Returns'] - mean) > threshold * std, True, False)
    return data

# -------------------------
# VISUALIZE ANOMALIES
# -------------------------
def plot_anomalies(data, ticker):
    plt.figure(figsize=(12,6))
    plt.plot(data.index, data['Close'], label='Close Price')
    anomalies = data[data['Anomaly']]
    plt.scatter(anomalies.index, anomalies['Close'], color='red', label='Anomaly', marker='x', s=100)
    plt.title(f"{ticker} Price & Detected Anomalies")
    plt.xlabel("Date")
    plt.ylabel("Close Price")
    plt.legend()
    plt.show()

# -------------------------
# RUN ANALYSIS
# -------------------------
data = fetch_stock_data(TICKER, period=f"{LOOKBACK}d")
data = detect_anomalies(data, threshold=THRESHOLD)
plot_anomalies(data, TICKER)

# -------------------------
# ALERTS (optional)
# -------------------------
today_anomaly = data['Anomaly'].iloc[-1]
if today_anomaly:
    print(f"⚠️ ALERT: Anomaly detected in {TICKER} today ({data.index[-1].date()})!")
  

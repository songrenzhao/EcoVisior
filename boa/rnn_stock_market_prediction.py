import fix_yahoo_finance as yf
from keras.models import Sequential
from keras.layers import LSTM, TimeDistributed,Dense,Dropout,Activation
from keras.optimizers import Adam
import numpy as np
from pandas_datareader import data as pdr
import csv
import matplotlib.pyplot as plt
import time
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_squared_error
import math


def create_dataset(dataset, look_back=1):
	dataX, dataY = [], []
	for i in range(len(dataset)-look_back-1):
		a = dataset[i:(i+look_back), 0]
		dataX.append(a)
		dataY.append(dataset[i + look_back, 0])
	return np.array(dataX), np.array(dataY)



#DATA COLLECTION PART
#data = yf.download("AAPL", start="2017-01-01", end="2018-11-30")
yf.pdr_override()
data = pdr.get_data_yahoo("NVDA", start="2017-05-02", end="2018-12-07")

#cols = ['Date', 'Open', 'High', 'Low', 'Close', 'Volume', 'Adj Close']
#data.reindex(columns=cols)

data.to_csv('haha.csv')


dates = []
closes = []
with open('haha.csv') as csvfile:
    readCSV = csv.reader(csvfile, delimiter=',')
    for row in readCSV:
        date = row[0]
        close = row[4]

        dates.append(date)
        closes.append(close)

#print(closes)

dates.pop(0)
closes.pop(0)
new_closes= []
for item in closes:
    new_closes.append(float(item))

#plt.plot(dates,new_closes)
#plt.show()

#print(len(closes))

#print(new_closes[len(new_closes)-2])
X_train = new_closes[0:len(new_closes)]

X_train = np.array(X_train)



#DATA NORMALIZATION

scaler = MinMaxScaler(feature_range=(0, 1))
#X_train = scaler.fit_transform(X_train)
#X_train = X_train/np.mean(X_train)

X_train = X_train.reshape((len(X_train),1))

scaler = MinMaxScaler(feature_range=(0, 1))
X_train = scaler.fit_transform(X_train)



train_size = int(len(X_train) * 0.80)
test_size = len(X_train) - train_size
train, test = X_train[0:train_size,:], X_train[train_size:len(X_train),:]
print(len(train), len(test))

look_back = 1
trainX, trainY = create_dataset(train, look_back)
testX, testY = create_dataset(test, look_back)

#print("hello",trainX.shape)
trainX = np.reshape(trainX, (trainX.shape[0], 1, trainX.shape[1]))
testX = np.reshape(testX, (testX.shape[0], 1, testX.shape[1]))
#print("hello again",trainX.shape)


#RNN TRAIN

model = Sequential()
model.add(LSTM(4, input_shape=(1, look_back)))
model.add(Dense(1))


model.compile(loss='mse', optimizer='adam')
model.fit(trainX, trainY, epochs=10, batch_size=1, verbose=2)




# make predictions
trainPredict = model.predict(trainX)
testPredict = model.predict(testX)
#print(trainX)
#print(trainPredict)


# invert predictions
trainPredict = scaler.inverse_transform(trainPredict)
trainY = scaler.inverse_transform([trainY])
testPredict = scaler.inverse_transform(testPredict)
testY = scaler.inverse_transform([testY])
# calculate root mean squared error
trainScore = math.sqrt(mean_squared_error(trainY[0], trainPredict[:,0]))
#print('Train Score: %.2f RMSE' % (trainScore))
testScore = math.sqrt(mean_squared_error(testY[0], testPredict[:,0]))
#print('Test Score: %.2f RMSE' % (testScore))



trainPredictPlot = np.empty_like(X_train )
trainPredictPlot[:, :] = np.nan
trainPredictPlot[look_back:len(trainPredict)+look_back, :] = trainPredict
# shift test predictions for plotting
testPredictPlot = np.empty_like(X_train )
testPredictPlot[:, :] = np.nan
testPredictPlot[len(trainPredict)+(look_back*2)+1:len(X_train )-1, :] = testPredict
# plot baseline and predictions
plt.plot(scaler.inverse_transform(X_train ))
plt.plot(trainPredictPlot)
plt.plot(testPredictPlot)
print(scaler.inverse_transform(X_train ))
today_closing_price = X_train[X_train.shape[0]-1,:]
print("today's closing prize is to be:%f",today_closing_price)

print(today_closing_price.shape)
today_closing_price=today_closing_price.reshape(1,1)
today_closing_price = np.reshape(today_closing_price, (today_closing_price.shape[0], 1, today_closing_price.shape[1]))
trainPredict_tomorrow= model.predict(today_closing_price)
trainPredict_tomorrow= scaler.inverse_transform(trainPredict_tomorrow)
print("tomorrow's closing prize is estimated to be:%f",trainPredict_tomorrow)
plt.show()

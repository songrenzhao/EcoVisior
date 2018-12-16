import fix_yahoo_finance as yf
from keras.models import Sequential
from keras.layers import LSTM, TimeDistributed,Dense,Dropout,Activation
from keras.optimizers import Adam
import numpy as np
from pandas_datareader import data as pdr
import csv
import time
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_squared_error
import math
import matplotlib.pyplot as plt

from datetime import date
today_time = str(date.today())

class PredictionModel:
    def __init__(self,ticker):
        self.ticker = ticker

    def create_dataset(self,dataset, look_back=1):
    
        for i in range(len(dataset)-look_back):
            a = dataset[i:(i+look_back), 0]
            dataX.append(a)
            dataY.append(dataset[i + look_back, 0])

    
            print(dataset.shape)
        return np.array(dataX), np.array(dataY)

    def main(self):
        yf.pdr_override()
        data = pdr.get_data_yahoo(self.ticker, start="2018-12-6", end="2018-12-13")

        data.to_csv('haha.csv')


        dates = []
        opens = []
        highs= []
        lows = []
        closes = []
        volumes = []
        
        with open('haha.csv') as csvfile:
            readCSV = csv.reader(csvfile, delimiter=',')
            for row in readCSV:
                date = row[0]
                open_value = row[1]
                high = row[2]
                low = row[3]
                close = row[4]
                volume = row [6] 

                dates.append(date)
                opens.append(open_value)
                highs.append(high)
                lows.append(low)
                closes.append(close)
                volumes.append(volume)
                

        #print("length for volume",len(volumes))
        
        dates.pop(0)#1
        opens.pop(0)#2
        highs.pop(0)#3
        lows.pop(0)#4
        closes.pop(0)#5
        volumes.pop(0) #6

        
        #print(dates)
        #print(opens)
        #print(highs)
        #print(lows)
        #print("length for close",len(closes))
        #print("length for volume",len(volumes))
        #print(closes)
            
        
        matrix = np.zeros(((len(opens),5)))
        
        matrix[:,0] = opens
        matrix[:,1] = highs
        matrix[:,2] = lows
        matrix[:,3] = closes
        matrix[:,4] = volumes
        
        
        #today_price = data[len(data)-1,0]
        print(dates)
        print("\n")
        print(matrix)
        print("\n")
        scaler = MinMaxScaler(feature_range=(-10, 10))
        scaler1 = MinMaxScaler(feature_range=(-10, 10))
        #print(closes)
        scale_array = np.asarray(closes)
        scaled_closes = scaler1.fit_transform(scale_array.reshape(-1,1))
        #X_train = X_train.reshape((len(X_train),1))

        #scaler = MinMaxScaler(feature_range=(0, 1))
        X_train = scaler.fit_transform(matrix)
        print(X_train)
        print("\n")
        #print(X_train)
        train_size = int(X_train.shape[0] * 0.7)
        #print(train_size)
        test_size = X_train.shape[0] - train_size
        train, test = X_train[0:train_size,:], X_train[train_size:X_train.shape[0]-1,:]
        #print("\n")
        #print(train)
        #print("\n")
        #print(test)
        #print(len(train), len(test))

        look_back = 1

        trainX = train
        trainY = np.zeros(((train_size,1)))
        #print(train_size)
        for i in range(0,train_size):
            #print(i)
            trainY[i,0] = X_train[i+1,3]

        print(trainX)
        print("\n")
        print(trainY)

        trainX = np.reshape(trainX,(trainX.shape[0],1,trainX.shape[1]))
        trainY = np.reshape(trainY,(trainY.shape[0],1,trainY.shape[1]))
        testX = test
        testY = np.zeros(((testX.shape[0],1)))
        #print(trainX.shape)
        #print(testX.shape[0])
        for i in range(0,testX.shape[0]):
            #print("HELLO WORLD")
            testY[i,0] = X_train[train_size+i+1,3]

        
        print(testX)
        print("\n")
        print(testY)
        testX = np.reshape(testX,(testX.shape[0],1,testX.shape[1]))
        testY = np.reshape(testY,(testY.shape[0],1,testY.shape[1]))
        #trainX, trainY = self.create_dataset(X_train[0:train_size+1,:], look_back)
        #testX, testY = self.create_dataset(test, look_back)
        #print("length_213",len(trainX),len(testX))
        #trainX = np.reshape(trainX, (trainX.shape[0], 1, trainX.shape[1]))
        #testX = np.reshape(testX, (testX.shape[0], 1, testX.shape[1]))
        #print("length",len(trainX),len(testX))

        
        model = Sequential()
        #model.add(Dense(1))
        
        model.add(LSTM(100,input_shape=(1, 5),
                       activation='linear',
                       recurrent_activation='relu',
                       return_sequences = True
                       
        ))


        
        #model.add(Dropout(0.1))

        model.add(LSTM(100,
                       activation='linear',
                       recurrent_activation='relu',
                       return_sequences = True
                       
        ))
        
        model.add(Dense(1))
        model.compile(loss='mse', optimizer='adam')
        model.fit(trainX, trainY, epochs=10, batch_size=1, verbose=2)
        
        trainPredict = model.predict(trainX)
        #print(trainPredict)
        testPredict = model.predict(testX)

        #print(trainPredict.shape)
        trainPredict = np.reshape(trainPredict,(trainPredict.shape[0],trainPredict.shape[1]))
        testPredict = np.reshape(testPredict,(testPredict.shape[0],testPredict.shape[1]))
        testY = np.reshape(testY,(testY.shape[0],testY.shape[1]))
        trainY = np.reshape(trainY,(trainY.shape[0],trainY.shape[1]))

        
        #print(trainPredict)
        #print(testPredict)

        #print("\n")
        #print(trainPredict.shape)

        #print(trainPredict.shape)
        trainPredict = scaler1.inverse_transform(trainPredict)
        trainY = scaler1.inverse_transform(trainY)
        #print("hello this is train",trainPredict)
        testPredict = scaler1.inverse_transform(testPredict)
        testY = scaler1.inverse_transform(testY)
        #print("hello this is test",testY.shape)
        #trainScore = math.sqrt(mean_squared_error(trainY[0], trainPredict[:,0]))
        
        #testScore = math.sqrt(mean_squared_error(testY[0], testPredict[:,0]))
        train_data = []

        for item in closes:
            train_data.append(float(item))
            
        plt.plot(train_data)


        
        #matrix_for_train = 
        plt.plot(trainPredict)
        testPredictPlot = np.zeros((X_train[:,3].shape[0],1))
        testPredictPlot = np.matrix(testPredictPlot)
        testPredictPlot[:, :] = np.nan
        #testPredictPlot[0:70, :] = testPredict
        testPredictPlot[trainPredict.shape[0]:X_train.shape[0]-1,:] = testPredict
        #print(trainPredict.shape,X_train.shape,testPredict.shape,testPredictPlot.shape)
        plt.plot(testPredictPlot)
        plt.show()
        

        today_data = X_train[X_train.shape[0]-1,:]
        today_data = np.matrix(today_data)
        #today_data = np.reshape(today_data,(today_data.shape[0],1,today_data.shape[1]))
        test_pred = np.zeros((today_data.shape[0],1,today_data.shape[1]))
        #print(test_pred.shape)
        test_pred[0,0,:] = today_data
        #print(today_data[:,:],test_pred[:,:,:])
        #print(test_pred.shape)

        
        trainPredict_tomorrow= model.predict(test_pred)
        #print(trainPredict_tomorrow)
        trainPredict_tomorrow = np.reshape(trainPredict_tomorrow,(trainPredict_tomorrow.shape[1],trainPredict_tomorrow.shape[1]))
        
        trainPredict_tomorrow= scaler1.inverse_transform(trainPredict_tomorrow)
        #print(trainPredict_tomorrow)
        

        #print(len(date))
        today_price = today_data[:,3]
        print(today_price)
        original_data = train_data
        trainPredict = trainPredict.tolist()
        testPredict = testPredict.tolist()
        testPredict.append(trainPredict_tomorrow)
        # print(len(original_data)) # original data
        # print(len(trainPredict)) # training  plot
        # print(len(testPredict)) # predicted plot

        total_test_predict = trainPredict + testPredict
        
        # print(len(total_test_predict))
        
        #print(data)
        #print(len(data))
        #print(trainPredict.shape)
        #print(testPredict.shape)
        print(original_data)
        

        return today_price, trainPredict_tomorrow, dates, original_data, total_test_predict

    def calculate_difference(self,today,tommorrow):
        total = (float(tommorrow) - float(today)) / 100
        return total
        


if __name__ == '__main__':
    ticker = input('Input Stock Ticker from Yahoo finance list: ')
    model = PredictionModel(ticker)
    model.main()
   # today, tommorrow, date, original_data, total_test_predict = model.main()
   # total = model.calculate_difference(today,tommorrow)
'''
    print("Today's closing price is: " + str(today) + '\n')
    print("Tommorrow's closing price prediction is " + str(tommorrow) + '\n')
    print('The percentage difference is: ' + str(total))
    print('Dates: ' + str(len(date)))
    print('Original: ' + str(len(original_data)))
    print('Total: ' + str(len(total_test_predict)))
    print('If percentage difference is positive take as gain - Otherwise take as a loss')
'''

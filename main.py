from flask import Flask, jsonify, request
# from rnn import PredictionModel
from rnntest import PredictionModel

app = Flask(__name__)

@app.route('/')
def hello_world():
    return '''<h1>Ecovisor Analysis </h1> 
    <ul>
	    <li>
	    	<p>This Recurrent Neural Network predicts the closing price of a stock - for T+1</p>
	    </li>
	    <li>
	    	<p>To run RNN do the following <b>url/prediction/ticker</b> - Make sure the ticker is in the yahoo finance api</p>
	    </li>
	</ul>'''

@app.route('/test/<ticker>', methods=['GET'])
def get_test(ticker):
	return jsonify({'ticker': ticker})

@app.route('/prediction/<ticker>', methods=['GET'])
def get_prediction(ticker):
	model = PredictionModel(ticker.lower())
	today, tommorrow = model.main()
	return jsonify(
		{
		'ticker': ticker,
		'today': float(today), 
		'predicted': float(tommorrow), 
		})

if __name__ == '__main__':
	app.run(debug=True)
	# To be able to request this api do
	# import requests
	# x = requests.get('url')
	# val = x.json()
	# print(val['ticker'])
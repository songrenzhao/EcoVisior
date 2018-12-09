from flask import Flask, jsonify, request
from rnn import PredictionModel

app = Flask(__name__)

@app.route('/')
def hello_world():
    return '''<h1>Ecovisor Analysis </h1> 
    <ul>
	    <li>
	    	<p>This Recurrent Neural Network predicts the closing price of a stock - for <b>T+1</b></p>
	    </li>
	    <li>
	    	<p>To run RNN do the following <b>url/prediction/ticker</b> - Make sure the ticker is in the yahoo finance api</p>
	    </li>
    	<h2>Notes:</h2>
    	<li>
    		<p>The request may take up to 10 seconds - So be kind and wait :)</p>
    	</li>
    	<li>
    		<p>The request may time out - Please try again with a different ticker <b>AMD is known to have this issue</b></p>
    	</li>
    	<h2>Description:</h2>
    	<li>
    		<p><b>Ticker:</b> Ticker of stock</p>
    	</li>
    	<li>
    		<p><b>Today:</b> Current price of stock from yahoo finance api</p>
    	</li>
    	<li>
    		<p><b>Tomorrow predicted:</b> Stock price prediction of T+1</p>
    	</li>
    	<li>
    		<p><b>Percentage Difference:</b> If positive value then take as gain of 1 day to another. If negative value take as loss</p>
    	</li>

    	<h2>Tested tickers - All of these are known to work!</h2>
    	<li>
    		<p>FB</p>
    	</li>
    	<li>
    		<p>AAPL</p>
    	</li>
    	<li>
    		<p>NFLX</p>
    	</li>
    	<li>
    		<p>GOOGL</p>
    	</li>

	</ul>'''

@app.route('/test/<ticker>', methods=['GET'])
def get_test(ticker):
	return jsonify({'ticker': ticker})

@app.route('/prediction/<ticker>', methods=['GET'])
def get_prediction(ticker):
	model = PredictionModel(ticker.lower())
	today, tommorrow = model.main()
	difference = model.calculate_difference(today,tommorrow)
	return jsonify(
		{
		'ticker': ticker,
		'today': float(today), 
		'tommorrow_predicted': float(tommorrow),
		'percentage_difference': difference, 
		})

# if __name__ == '__main__':
# 	app.run(debug=True)
	# To be able to request this api do
	# import requests
	# x = requests.get('url')
	# val = x.json()
	# print(val['ticker'])
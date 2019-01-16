var request = require('request');
const axios = require('axios');
const fs = require('fs');

const id = 'ivv';


displayID = () => {
	console.log("fetch data")
	console.log("ticker:", id)
	var url = "http://ecovisorv2.herokuapp.com/prediction/" + id
	var resultsURL = "http://ecovisorv2.herokuapp.com/results/" + '80b18a1d-8266-4df1-aab5-e21e01bcafaf'
	console.log(url)

	request
	  .get(resultsURL)
	  .on('error', function(err) {
	    console.log(err)
	  })
	  .pipe(fs.createWriteStream('./ivvData.json')).on('finish', function (err) {
	        console.log("Finished");
	        if (err != null) {
	          console.log(err);
	        } else {
	          console.log("Saved data locally")
	        }
	    });


	// fetch(url, {
	// 	crossDomain:true,
	//     method: 'GET',
	//     headers: {'Content-Type':'application/json'},
	// 	})
	// .then(response => response.json())
	// .then(responseJson => {
	// 	console.log(responseJson)
	// 	const id = responseJson["id"]
	// 	console.log(id)
	// 	var resultsURL = "http://ecovisorv2.herokuapp.com/results/" + id
	// 	// this.performPredictionFetch(resultsURL)
	// })
}

displayID();
import React from 'react';
import HistComparson from '../Line/HistComparson.jsx';

class SimulatedTrend extends React.Component{
    constructor(){
        super();
        this.state = {
            name: 'S&P 500',
        };
        this.display();
    }

    display = () => {
        console.log("fetch data")
        console.log("ticker: ", "IVV")
        var url = "http://ecovisorv2.herokuapp.com/songmodel/IVV";
        fetch(url, {
          crossDomain:true,
          method: 'GET',
          headers: {'Content-Type':'application/json'},
        })
          .then(response => response.json())
          .then(responseJson => {
            console.log(responseJson)
            const id = responseJson["id"]
            console.log(id)
            var resultsURL = "http://ecovisorv2.herokuapp.com/results/" + id
            this.performPredictionFetch(resultsURL)
        })
    }
    performPredictionFetch(url) {
        // 20 second timeout seems to be enough time to finish training
        // and display the predicted values
        setTimeout(() => {
            // console.log('5 seconds have passed')
            fetch(url, {
                crossDomain: true,
                method: 'GET',
                headers: {'Content-Type':'application/json'},
            })
                .then(response => response.json())
                .then(data => {
                    // console.log(url)
                    // console.log(data)
                    if (data["Message"] === "The job is still running - try again in a few seconds") {
                        console.log("Perform request again with the same id")
                        this.performPredictionFetch(url)
                    } else {
                        this.setState({
                            timeSeries1: data["Time Series"],
                            percentage_difference: data["percentage_difference"],
                            today: data["today"],
                            tommorrow: data["tommorrow"],
                        },function(){
                            this.updateMLArray();
                        })
                    }
                })
                .catch((error) => { console.log("There was an error", error)})
            }, 10000)
    }
    updateMLArray = () => {
        const dateArr = [];
        const originArr = [];
        const predictArr = [];
        console.log(this.state.timeSeries1);
        Object.keys(this.state.timeSeries1).forEach(key => {
            if(key.includes("2008") || key.includes("2009")){
                dateArr.push(key);
                originArr.push(this.state.timeSeries1[key]["original"]);
                predictArr.push(this.state.timeSeries1[key]["predicted"]);
            }
        });
        dateArr.reverse(); originArr.reverse(); predictArr.reverse();
        // console.log(timeArr);
        this.setState({
            date: dateArr,
            original: originArr,
            predicted: predictArr,
        }, function(){
            console.log(this.state.date);
            console.log(this.state.original);
            console.log(this.state.predicted);
        });
    }

    render(){
        return(
            <div>
                <HistComparson
                      name = {this.state.name}
                      dateArr = {this.state.date}
                      predArr = {this.state.predicted}
                      origArr = {this.state.original}
                      />
            </div>
        )
    }
}

export default SimulatedTrend;
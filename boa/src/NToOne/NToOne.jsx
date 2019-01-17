import React from 'react'
import MultaData from '../Line/MultiData.jsx'
class NToOne extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            input: this.props.input,
            name: [],
            object: [],
            timeArr: [],
            openArr: [],
            highArr: [],
            lowArr: [],  
            closeArr: [],
            volumeArr: [],
            url: null,
            type: "High",
            percentage_difference: "",
            today: "",
            tommorrow: "",
            original: [],
            predicted: [],
            date: [],
            timeSeries1: [],
        }
        this.displayNeunetwork();
    }

    displayNeunetwork = () => {
        console.log("fetch data")
        console.log("ticker: ", this.state.input)
        var url = "http://ecovisorv2.herokuapp.com/nmodel/" + this.state.input;
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
            dateArr.push(key);
            originArr.push(this.state.timeSeries1[key]["original"]);
            predictArr.push(this.state.timeSeries1[key]["predicted"]);
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
                <MultaData date = {this.state.date} origin = {this.state.original} predict = {this.state.predicted}/>
                <div class="col mb-3">
                    <button type="button" class="btn btn btn-outline-info btn-block disabled">Percentage Difference: <span class="badge badge-pill badge-warning">{this.state.percentage_difference}</span></button>
                    <button type="button" class="btn btn btn-outline-info btn-block disabled">Current Price: <span class="badge badge-pill badge-warning">{this.state.today}</span></button>
                    <button type="button" class="btn btn btn-outline-info btn-block disabled">Predicted Price: <span class="badge badge-pill badge-warning">{this.state.tommorrow}</span></button>
                </div>
            </div>
        )
    }
}

export default NToOne;
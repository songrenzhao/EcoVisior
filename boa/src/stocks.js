import React, {Component} from 'react';
import LineExample from './Line/LineExample'

class Stocks extends Component{
    constructor(){
        super();
        this.state = {
            input: "",
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
            // "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=AMD&interval=5min&outputsize=full&apikey=KJEQ4OXGXSCLWKKV",
        }
        this.getNews = this.getNews.bind(this)
    }
    updateObeject=()=>{
        fetch(this.state.url)
            .then(response => response.json())
            .then(data => this.setState({
                name: data["Meta Data"]["2. Symbol"],
                object: data["Time Series (5min)"],
            },function(){
                this.updateArray();
            }))
            .catch(error => console.log(error));
    }
    updateArray=()=>{
        const timeArr = [];
        const openArr = [];
        const highArr = [];
        const lowArr = [];
        const closeArr = [];
        const volumeArr = [];
        Object.keys(this.state.object).forEach(key => {
            timeArr.push(key);
            openArr.push(this.state.object[key]["1. open"]);
            highArr.push(this.state.object[key]["2. high"]);
            lowArr.push(this.state.object[key]["3. low"]);
            closeArr.push(this.state.object[key]["4. close"]);
            volumeArr.push(this.state.object[key]["5. volume"]);
        });
        timeArr.reverse(); openArr.reverse(); highArr.reverse(); lowArr.reverse(); closeArr.reverse(); volumeArr.reverse();
        // console.log(timeArr);
        this.setState({
            timeArr: timeArr,
            openArr: openArr,
            highArr: highArr,
            lowArr: lowArr,
            closeArr: closeArr,
            volumeArr: volumeArr,
        });
    }

    

    displayNeunetwork = (input) => {
        console.log("fetch data")
        console.log("ticker: ", this.state.input)
        var url = "http://ecovisor.herokuapp.com/prediction/" + this.state.input
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

            var resultsURL = "http://ecovisor.herokuapp.com/results/" + id
            this.performPredictionFetch(resultsURL)
            
        })

    }

    display = () => {
        let input = document.getElementById("nameInput").value;
        console.log(input);
        let newUrl = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=" + input + "&interval=5min&outputsize=full&apikey=KJEQ4OXGXSCLWKKV";
        this.setState({url: newUrl, input: input}, function () {
            this.updateObeject();
        });
    }

    showHigh = () => {
        this.setState({type: "High"})
    }
    showLow = () => {
        this.setState({type: "Low"})
    }
    showVol = () => {
        this.setState({type: "Vol"})
    }

    onButton() {
        console.log("This works")
        console.log("stock state:", )

    }

    performPredictionFetch(url) {
        // 20 second timeout seems to be enough time to finish training
        // and display the predicted values
        setTimeout(() => {
            console.log('5 seconds have passed')

            fetch(url, {
                crossDomain: true,
                method: 'GET',
                headers: {'Content-Type':'application/json'},
            })
                .then(response => response.json())
                .then(data => {
                    console.log(url)
                    console.log(data)
                    if (data["Message"] === "The job is still running - try again in a few seconds") {
                        console.log("Perform request again with the same id")
                        this.performPredictionFetch(url)

                    } else {
                        console.log(data["percentage_difference"])
                        console.log(data["today"])
                        console.log(data["tommorrow"])
                    }
                    
                })
                .catch((error) => {
                    console.log("There was an error", error)

                })

        }, 5000)

    }

    getNews() {
        console.log("Get news")
        console.log("Current ticker: ", this.state.input)

        var queryParam =  "amd stocks"

        // max page size is 100 for fetch

        var url = 'https://newsapi.org/v2/everything?' +
              'q=' + queryParam +
              '&from=2018-12-11&' +
              'sortBy=popularity&' + 
              'pageSize=100&' +
              'apiKey=f9878693aa7d4de394cc43948d1e19d9';
        var req = new Request(url);

        fetch(req).then(
        function(response) {
          if (response.status !== 200) {
            console.log('Problem in fetching');
            return;
          }
          response.json().then(function(data) {
            console.log(data);
          });
        })    
    }

    render(){
        let Person;
        if(this.state.type === "High"){
            Person = <LineExample
                    name = {this.state.name}
                    time = {this.state.timeArr}
                    input = {this.state.highArr}/>;
        }else if(this.state.type === "Low"){
            Person = <LineExample
                    name = {this.state.name}
                    time = {this.state.timeArr}
                    input = {this.state.lowArr}/>;
        }else{
            Person = <LineExample
                    name = {this.state.name}
                    time = {this.state.timeArr}
                    input = {this.state.volumeArr}/>;
        }
        
        return(
            <div class="jumbotron">
                <div class="row">
                    <div class="col-6">
                        <div class="row">
                            <div class="col-md-6">
                                <button class="btn btn-info btn-lg btn-block" onClick = {this.display}>Submit</button>
                                <button class="btn btn-info btn-lg btn-block" onClick = {this.showHigh}>Show High Price</button>
                            </div>
                            <div class="col-md-6">
                                <button class="btn btn-info btn-lg btn-block" onClick = {this.showLow}>Show Low Price</button>
                                <button class="btn btn-info btn-lg btn-block" onClick = {this.showVol}>Show volume sold</button>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-group mb-3 mt-3 pl-3 pr-3">
                                <input class="form-control" type = "text" id = "nameInput" placeholder = "Enter your stock symbol" ></input>
                            </div>
                        </div>
                        <div class="container">
                            {Person}
                        </div>

                        <div class="row border-top">
                            <div class="col-md- mt-3">
                                <button class="btn btn-warning btn-lg btn-block" onClick = {this.displayNeunetwork}>Display Prediction</button>
                            </div>
                        </div>
                    </div>

                    <div class="col-6 border-left">
                        <h1> NEWS VIEW GOES HERE</h1>
                        <div class="col-md-6 mt-3">
                                <button class="btn btn-warning btn-lg btn-block" onClick={this.getNews}>Get News</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Stocks;
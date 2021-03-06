import React, {Component} from 'react';
import LineExample from './Line/LineExample';
import MultaData from './Line/MultiData';
import HisTred from './HistoricalTrend/histTrend.jsx';
import YieldCurve from './YieldCurve/YieldCurve.jsx';
import NToOne from './NToOne/NToOne.jsx'
import YieldCurveRateC from './YieldCurve/YieldCurveRateC';
import SimulatedTrend from './HistoricalTrend/SimulatedTrend';

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
            percentage_difference: "",
            today: "",
            tommorrow: "",
            original: [],
            predicted: [],
            date: [],
            timeSeries1: [],
            click: false,
            articles: [],
            title: [],
            OneToOne: -1,
            nToOne: -1,
            SimulatedTrend: -1,
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
    displayNeunetwork = () => {
        console.log("fetch data")
        console.log("ticker: ", this.state.input)
        var url = "http://ecovisorv2.herokuapp.com/prediction/" + this.state.input
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

    getNews() {
        console.log("Get news")
        console.log("Current ticker: ", this.state.input)
        var queryParam =  document.getElementById("nameInput").value;
        // max page size is 100 for fetch
        var url = 'https://newsapi.org/v2/everything?' +
              'q=' + queryParam +
              '&from=2018-12-26&' +
              'sortBy=popularity&' + 
              'pageSize=100&' +
              'apiKey=f9878693aa7d4de394cc43948d1e19d9';
        var req = new Request(url);
        console.log(url);
        fetch(req)
            .then(response => response.json())
            .then(data => this.setState({
                articles: data["articles"]
            },function(){
                console.log(this.state.articles);
                this.updateNew();
            }))
            .catch(error => console.log(error));     
        this.setState({
            click: !this.state.click,
        })       
    }

    updateNew = () => {
        let urlArr = [];
        let titleArr = [];
        Object.keys(this.state.articles).forEach(key => {
            urlArr.push(this.state.articles[key]["url"]);
            titleArr.push(this.state.articles[key]["title"]);
        })
        urlArr.reverse(); titleArr.reverse();
        this.setState({
            url: urlArr,
            title: titleArr,
        }, function(){
            console.log(this.state.url);
            console.log(this.state.title);
        });
    }

    displayNToOne = () => {
        this.setState({
            nToOne: 1,
        });
    }

    toggleSimulate = () => {
        this.setState({
            SimulatedTrend: -this.state.SimulatedTrend,
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
        let table = [];
        if(this.state.click){
            for(let i = 0; i < 10; i++){
                table.push(
                    <li><a href={this.state.url[i]}>{this.state.title[i]}</a></li>
                );
            }
        }else{
            table = [];
        }

        return(
            <div class="container">
                <div class="row">
                        <div class="col-md-6 pt-4">
                            <div class="row">
                                <div class="col-md-6">
                                    <button class="btn btn-info btn-lg btn-block" onClick = {this.display}>Submit</button>
                                    <button class="btn btn-info btn-lg btn-block" onClick = {this.showHigh}>Show High Price</button>
                                </div>
                                <div class="col-md-6">
                                    <button class="btn btn-info btn-lg btn-block" onClick = {this.showLow}>Show Low Price</button>
                                    <button class="btn btn-info btn-lg btn-block" onClick = {this.showVol}>Show Volume Sold</button>
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-group mb-3 mt-3 pl-3 pr-3">
                                    <input class="form-control" type = "text" id = "nameInput" placeholder = "Enter your stock symbol" ></input>
                                </div>
                            </div>
                            <div>
                                {Person}
                            </div>
                        </div>

                        <div class="col-md-6 pt-4 border-left">
                            <button class="btn btn-success btn-lg btn-block" onClick = {this.displayNeunetwork}>Model #1 Display One to One Prediction</button>
                            <MultaData date = {this.state.date} origin = {this.state.original} predict = {this.state.predicted}/>
                            <div class="row">
                                <div class="col mb-3">
                                    <button type="button" class="btn btn btn-outline-info btn-block disabled">Percentage Difference: <span class="badge badge-pill badge-warning">{this.state.percentage_difference}</span></button>
                                    <button type="button" class="btn btn btn-outline-info btn-block disabled">Current Price: <span class="badge badge-pill badge-warning">{this.state.today}</span></button>
                                    <button type="button" class="btn btn btn-outline-info btn-block disabled">Predicted Price: <span class="badge badge-pill badge-warning">{this.state.tommorrow}</span></button>
                                </div>
                            </div>
                            <button class="btn btn-success btn-lg btn-block mb-4" onClick = {this.displayNToOne}>Model #2 Display N to One Prediction</button>
                            {this.state.nToOne == 1 && <NToOne date = {this.state.date} input = {this.state.input}/>}
                        
                        </div>
                </div>

                <div class="row">
                    <div class = "col-md-6 pt-4 border-top">
                        <p class="h2">S&P 500 Historical Trend 2008-2009</p>
                        <HisTred></HisTred>
                    </div>
                    <div class="col-md-6 pt-4 border-left border-top">
                        <div class="col-md-12 mt-3">
                            {/* <button class="btn btn-warning btn-lg btn-block" onClick={this.getNews}>Get News</button>
                            <ul class="list-group pt-4 pb-4">
                                <li class="list-group-item list-unstyled">
                                    <p>{table}</p>
                                </li>
                            </ul> */}
                            <button class="btn btn-success btn-lg btn-block mb-3" onClick = {this.toggleSimulate}>Simulated Historical Data</button>
                            {this.state.SimulatedTrend == 1 && <SimulatedTrend />}
                        </div>
                    </div>
                </div>
                <div class="border-top"> 
                    <p class="h1 pt-3">U.S treasuries 10 year Vs 1 year - Yield Curve</p>
                    <YieldCurve></YieldCurve>
                    <YieldCurveRateC />
                </div>
                <div>
                    <button class="btn btn-warning btn-lg btn-block" onClick={this.getNews}>Get News</button>
                            
                    <ul class="list-group pt-4 pb-4">
                        <li class="list-group-item list-unstyled">
                            <p>{table}</p>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Stocks;
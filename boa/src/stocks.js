import React, {Component} from 'react';
import LineExample from './Line/LineExample';
import MultaData from './Line/MultiData';

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
            url: [],
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
              '&from=2018-12-11&' +
              'sortBy=popularity&' + 
              'pageSize=100&' +
              'apiKey=f9878693aa7d4de394cc43948d1e19d9';
        var req = new Request(url);

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
            <div>
                <div className = ".col-sm-5 .col-md-6">
                    <div className="row">
                        <div className="col-md-6">
                            <button className="btn btn-info btn-lg btn-block" onClick = {this.display}>Submit</button>
                            <button className="btn btn-info btn-lg btn-block" onClick = {this.showHigh}>Show High Price</button>
                        </div>
                        <div className="col-md-6">
                            <button className="btn btn-info btn-lg btn-block" onClick = {this.showLow}>Show Low Price</button>
                            <button className="btn btn-info btn-lg btn-block" onClick = {this.showVol}>Show volume sold</button>
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-group mb-3 mt-3 pl-3 pr-3">
                            <input className="form-control" type = "text" id = "nameInput" placeholder = "Enter your stock symbol" ></input>
                        </div>
                    </div>

                    <div className="container">
                        {Person}
                    </div>
                </div>

                <div className=".col-sm-5 .col-md-6">
                    <div className="col-md- mt-3">
                        <button className="btn btn-warning btn-lg btn-block" onClick = {this.displayNeunetwork}>Display Prediction</button>
                        <MultaData date = {this.state.date} origin = {this.state.original} predict = {this.state.predicted}/>
                        <p>The percentage difference is <span>{this.state.percentage_difference}</span></p>
                        <p>Today price is <span>{this.state.today}</span></p>
                        <p>Tommorow Price will be <span>{this.state.tommorrow}</span></p>
                    </div>
                </div>

                <div className="col-6 border-left">
                    <h1> NEWS VIEW GOES HERE</h1>
                    <div className="col-md-6 mt-3">
                        <button className="btn btn-warning btn-lg btn-block" onClick={this.getNews}>Get News</button>
                        {table}
                    </div>
                </div>
            </div>
        )
    }
}

export default Stocks;
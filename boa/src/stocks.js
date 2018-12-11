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
        },function () {
            this.displayNeunetwork(this.state.input);
        });
    }

    displayNeunetwork = (input) => {
        fetch("https://cors-anywhere.herokuapp.com/afternoon-reef-20637.herokuapp.com/prediction/" + input, {headers: {'Access-Control-Allow-Origin': '*'}})
            .then(response => response.json())
            .then(data => this.setState({
                percentDiff: data["percentage_difference"],
                today: data["today"],
                tmrPredict: data["tommorrow_predicted"]
            }, function() {
                console.log("Percentage of difference is", this.state.percentDiff);
                console.log("Today's price is", this.state.today);
                console.log("Tommorow's price will be", this.state.tmrPredict);
            }))
            .catch(error => console.log(error));
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

    render(){
        let Person;
        if(this.state.type == "High"){
            Person = <LineExample
                    name = {this.state.name}
                    time = {this.state.timeArr}
                    input = {this.state.highArr}/>;
        }else if(this.state.type == "Low"){
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
            <div>
                <button onClick = {this.display}>Submit</button>
                <button onClick = {this.showHigh}>Show High Price</button>
                <button onClick = {this.showLow}>Show Low Price</button>
                <button onClick = {this.showVol}>Show volume sold</button>
                <input type = "text" id = "nameInput" placeholder = "Enter your stock symbol" ></input>
                {Person}
            </div>
        );
    }
}

export default Stocks;
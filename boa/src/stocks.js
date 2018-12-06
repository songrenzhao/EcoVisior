import React, {Component} from 'react';
import LineExample from './Line/LineExample'
class Stocks extends Component{
    constructor(){
        super();
        this.state = {
            name: [],
            object: [],
            timeArr: [],
            openArr: [],
            highArr: [],
            lowArr: [],  
            closeArr: [],
            volumeArr: [],
            url: "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=AMD&interval=5min&outputsize=full&apikey=KJEQ4OXGXSCLWKKV",
        }
    }
    componentDidMount = () => {
        
        fetch(this.state.url)
        .then(response => response.json())
        .then(data => this.setState({
            name: data["Meta Data"]["2. Symbol"],
            object: data["Time Series (5min)"],
        }))
    }

    display = () => {
        let input = document.getElementById("nameInput").value;
        this.setState({
            url: "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=" + input + "&interval=5min&outputsize=full&apikey=KJEQ4OXGXSCLWKKV"
        })
        console.log(this.state.url);
        // let obj = this.state.object;
        const timeArr = [];
        const openArr = [];
        const highArr = [];
        const lowArr = [];
        const closeArr = [];
        const volumeArr = [];
        Object.keys(this.state.object).forEach(key => {
            //console.log(key, obj[key]["1. open"]);
            timeArr.push(key);
            openArr.push(this.state.object[key]["1. open"]);
            highArr.push(this.state.object[key]["2. high"]);
            lowArr.push(this.state.object[key]["3. low"]);
            closeArr.push(this.state.object[key]["4. close"]);
            volumeArr.push(this.state.object[key]["5. volume"]);
        });
        timeArr.reverse(); openArr.reverse(); highArr.reverse(); lowArr.reverse(); closeArr.reverse(); volumeArr.reverse();
        this.setState({
            timeArr: timeArr,
            openArr: openArr,
            highArr: highArr,
            lowArr: lowArr,
            closeArr: closeArr,
            volumeArr: volumeArr,
        });
        console.log(timeArr, highArr);
    }
    render(){
        return(
            <div>
                <p>Hello</p>
                <button onClick = {this.display}>Click meeee</button>
                <input type = "text" id = "nameInput" placeholder = "Enter your stock symbol" ></input>
                <LineExample
                 name = {this.state.name}
                 time = {this.state.timeArr}
                 high = {this.state.highArr}
                 low = {this.state.lowArr}
                 close = {this.state.closeArr}
                 volume = {this.state.volumeArr}/>
            </div>
        );
    }
}

export default Stocks;
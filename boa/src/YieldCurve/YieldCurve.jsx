import React, {Component} from 'react';
import YieldLine from '../Line/YieldLine';

class YieldCurve extends Component{
    constructor(){
        super();
        this.state = {
            object: [],
            visibleFive: -1,
            visibleSeven: -1,
            visibleTen: -1,
            visibleTwenty: -1,
            visibleThirty: -1,
        };
        this.launch();
    };

    launch = () => {
        let newUrl = "https://www.quandl.com/api/v3/datasets/USTREASURY/REALYIELD.json?api_key=bro-uGJemJuznZ5Qs7XZ";
        fetch(newUrl)
            .then(response => response.json())
            .then(data => this.setState({
                object: data["dataset"]["data"],
            },function(){
                this.updateArray();
            }))
            .catch(error => console.log(error));
    }

    updateArray = () => {
        let timeArr = [];
        let fiveArr = [];
        let sevenArr = [];
        let tenArr = [];
        let twentyArr = [];
        let thirtyArr = [];
        Object.keys(this.state.object).forEach(key => {
            timeArr.push(this.state.object[key][0]);
            fiveArr.push(this.state.object[key][1]);
            sevenArr.push(this.state.object[key][2]);
            tenArr.push(this.state.object[key][3]);
            twentyArr.push(this.state.object[key][4]);
            thirtyArr.push(this.state.object[key][5]);
        })
        timeArr.reverse(); fiveArr.reverse(); sevenArr.reverse();
        tenArr.reverse(); twentyArr.reverse(); thirtyArr.reverse();

        this.setState({
            timeArr: timeArr,
            fiveArr: fiveArr,
            sevenArr: sevenArr,
            tenArr: tenArr,
            twentyArr: twentyArr,
            thirtyArr: thirtyArr,
        });

        console.log(timeArr);
        console.log(fiveArr);
    }

    // displayFive = () => {
    //     this.setState({
    //         visibleFive: -this.state.visibleFive,
    //     });
    // }

    // displaySeven = () => {
    //     this.setState({
    //         visibleSeven: -this.state.visibleSeven,
    //     });
    // }

    // displayTen = () => {
    //     this.setState({
    //         visibleTen: -this.state.visibleTen,
    //     });
    // }

    // displayTwenty = () => {
    //     this.setState({
    //         visibleTwenty: -this.state.visibleTwenty,
    //     });
    // }

    // displayThirty = () => {
    //     this.setState({
    //         visibleThirty: -this.state.visibleThirty,
    //     });
    // }

    render(){
        return(
            <div>
                {/* <button onClick = {this.displayFive}>5 year</button>
                <button onClick = {this.displaySeven}>7 year</button>
                <button onClick = {this.displayTen}>10 year</button>
                <button onClick = {this.displayTwenty}>20 year</button>
                <button onClick = {this.displayThirty}>30 year</button> */}
                <YieldLine timeArr = {this.state.timeArr}
                           fiveArr = {this.state.fiveArr}
                           sevenArr = {this.state.sevenArr}
                           tenArr = {this.state.tenArr}
                           twentyArr = {this.state.twentyArr}
                           thirtyArr = {this.state.thirtyArr}/>
            </div>
        )
    }
}

export default YieldCurve;
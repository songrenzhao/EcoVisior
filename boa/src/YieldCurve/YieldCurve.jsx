import React, {Component} from 'react';
import YieldLine from '../Line/YieldLine';
import YieldCurveRate from '../Line/YieldCurveRate.jsx'

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
        let newUrl = "https://www.quandl.com/api/v3/datasets/USTREASURY/YIELD.json?api_key=bro-uGJemJuznZ5Qs7XZ";
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
        let oneArr = [];
        let tenArr = [];
        let diffArr = [];
        Object.keys(this.state.object).forEach(key => {
            if(this.state.object[key][5] != null){
                timeArr.push(this.state.object[key][0]);
                tenArr.push(this.state.object[key][10]);
                oneArr.push(this.state.object[key][5]);
                diffArr.push(((this.state.object[key][10]) - (this.state.object[key][5]))/this.state.object[key][5]);
            }
        })
        timeArr.reverse(); oneArr.reverse(); tenArr.reverse(); diffArr.reverse();
        console.log(this.state.object);
        this.setState({
            timeArr: timeArr,
            oneArr: oneArr,
            tenArr: tenArr,
            diffArr: diffArr,
        });
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
                           oneArr = {this.state.oneArr}
                           tenArr = {this.state.tenArr}
                    />
                <YieldCurveRate timeArr = {this.state.timeArr}
                                diffArr = {this.state.diffArr}
                    />
                
            </div>
        )
    }
}

export default YieldCurve;
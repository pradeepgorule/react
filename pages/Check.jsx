import React, { Component } from 'react';
import axios from 'axios';

class ChecqueDetails extends Component {
    constructor() {
        super();
        this.state = {
            fDetails: [],
            res:[],
            name: '',
            
        }
        
    }

    componentDidMount() {
        this.chqData();
    }

    chqData() {
        let url = "http://192.168.4.138/IB_CBS_API/api/Source/GetAccountNumbers";
        const data = { CustNo: 731416 }
        const res = axios.post(url, data)
            .then(res => {
                this.setState({
                    fDetails: res.data
                });
            })
    }
    chqList() {

        return (this.state.fDetails).map((data) => {
            const { prdAcctId, custNo, lBrCode } = data
            return (

                <tr>
                    <td>{custNo}</td>
                    <td>{prdAcctId}</td>
                    <td>{lBrCode}</td>
                </tr>
            )
        })

    }

    handleData= (e) => {

        this.state.value = e.target.value;
        //console.log(e.target.value);
        if (e.target.value !== "0") {
           // alert("done");
            let url = "http://192.168.4.138/IB_CBS_API/api/Source/GetAccountNumbers";
            const data = { "PrdAcctId": e.target.value }
            console.log(e.target.value + "if part");    
            const res = axios.post(url, data)
                .then(res => {
                    this.setState({
                        fDetails: res.data

                    })
                })
        }
        else {
            console.log(e.target.value +"else part");
        }
    }


 





    renderData() {
        return this.state.fDetails.map((data) => {
            const { prdAcctId } = data

            return (
                <li><input type="radio" name="details" value={prdAcctId} onChange={this.handleData} /> {prdAcctId}</li>
            )
        })
    }
    render() {
        return (
            <div>
                {this.renderData()}
                <table className="table">
                    {this.chqList()}
                </table>
            </div>
           
            )
    }
}

export default ChecqueDetails;
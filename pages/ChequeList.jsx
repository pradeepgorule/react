import React, { Component } from 'react'
import axios from 'axios'
 import { Table } from "antd";


class ChequeList extends React.Component {


    constructor(props) {
        super(props);
        this.handleData = this.handleData.bind(this);
        this.state = {
            accno: [],
            res: [],
            resHandle: [],
            title:"Cheque Details",
         
        }

        
    }

    handleData = async (event) => {
        
        this.state.value = event.target.value;
        if (event.target.value != '0') {

            let url = "http://192.168.4.138/IB_CBS_API/api/Source/GetNomineeDetails";

            const data =
        
                { "PrdAcctId": event.target.value }

            const res = await axios.post(url, data,
                { headers: { 'Content-Type': 'application/json' } }
            ).then(res => {
                this.setState({
                    resHandle: res.data

                });
            })
        }
        else {
           this.tablelist()
        }

    };

    componentDidMount() {
        this.tablelist()
        this.radioList()
 


    }


     tablelist() {
        let url = "http://192.168.4.138/IB_CBS_API/api/Source/GetAllNomineeDetrails";

        const data =
            // { "CustNo": 731416, "PrdAcctId": "2-21/17205" }
            { "CustNo": 731416 }

        const res = axios.post(url, data,
            { headers: { 'Content-Type': 'application/json' } }
        ).then(res => {
            this.setState({
                resHandle: res.data

            });
        })
    }
    chequeData() {

        return this.state.resHandle.map((account, index) => {
            const SrNo = account.srNo
            const Name = account.nomineeName
            const PrdId = account.prdAcctId


            return (
                <tr>
                    <td >{SrNo}</td>
                    <td>{Name}</td>
                    <td>{PrdId}</td>
                </tr>

            )
        })
    }


    radioList() {
        let url = "http://192.168.4.138/IB_CBS_API/api/Source/GetAccountNumbers";


        const data =
            { CustNo: 731416 }


        const res =  axios.post(url, data,
            { headers: { 'Content-Type': 'application/json' } }
        ).then(res => {
            this.setState({
                res: res.data

            });
        })

    }
    radioData() {

        return (this.state.res).map((NomDetail, index) => {
            const prdAcctId = NomDetail.lBrCode +'-'+ NomDetail.prdAcctId  
            //this.state.value = NomDetail.lBrCode + '-' + NomDetail.prdAcctId
            const module = NomDetail.moduleType
            return (

               
                <tr >
                    <th scope="row"><input type="radio" name="details" value={prdAcctId} onChange={this.handleData} /> {prdAcctId}</th>
                    <td>{module}</td>
                    </tr>
            )
        })

    }




    render() {
        const label = 'All'
        return (


            <div className="container">
                <h2 className="text-center">{this.state.title}</h2>
                <table className="table table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Product ID</th>
                            <th scope="col">Module Type</th>
                            
                        </tr>
                    </thead>
                        {this.radioData()}
                    </table>

                <h3 className="btn-success">Account Holder Details</h3>
                <table className="table">
                    <tr>
                        <th>SRNO</th>
                        <th>Name</th>
                        <th>ProductId</th>
                    </tr>
                    {this.chequeData()}
					</table>   
            </div>
        )

    }

}
export default ChequeList;









 import React, { Component } from 'react'
 import axios from 'axios'

 class ChequeDetails extends Component {
     constructor(props) {
        super(props);
       
         this.state = {
             chkd: [],
             res: []

         }
     }


     async componentDidMount() {
         let url = "http: localhost:64851/api/source/GetChequebookDetails";
         const data = { CustNo: "731416", PrdAcctID: "2-21/17205", ChequeBkReqNo: "156907", Option: "All" }
        
         const response = await axios.post(url, data,
             { headers: { 'Content-Type': 'application/json' } }
         ).then(response => {
             this.setState({
                 res: response.data
             });
         })
     }

  

 

     renderData(){
         return (this.state.res).map((details) => {
             const product = details.prdAcctID
             return (
                 <li>{product}</li>
                 )
         })
     }


     render() {
         return (
             <div>
                 <label>Account no</label>
                 {this.renderData()}
             </div>
         )
     }
 }
 export default ChequeDetails;

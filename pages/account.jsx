import React, { Component } from 'react'
import { Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Alert } from 'reactstrap';

import axios from 'axios'
import EnvConfiguration from './EnvConfiguration';

class AccountStatement extends Component {


  constructor(props) {
    super(props);
    this.state = {
      response: [],
      tableresponse: [],
      FromDate: '',
      ToDate: '',
      prdAcctId: '',
      value: "",
      showComponent: false,
      diffmonths: ''

    }
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeFromDate = this.handleChangeFromDate.bind(this);
    this.handleChangeToDate = this.handleChangeToDate.bind(this);
    this.renderOnSubmit = this.renderOnSubmit.bind(this);
    this.envConfig = new EnvConfiguration();

  }

  handleChange = async (event) => {

    this.setState({ value: event.target.value }, function () {
      console.log(this.state.value);

    })

  }

  handleChangeFromDate = async (event) => {
    //Note: 00 is month i.e. January  
    this.setState({ FromDate: event.target.value }, function () {
      console.log(this.state.FromDate);
      //console.log((this.state.FromDate).getMonth())


      //var Xmas95 = new Date(this.state.FromDate);
      //var month = Xmas95.getMonth();

      //console.log(month);
    })
  }



  async renderOnSubmit() {

    this.state.tableresponse = []
    const date1 = new Date(this.state.FromDate);
    const date2 = new Date(this.state.ToDate);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffmonths = date2.getMonth() - date1.getMonth() + (12 * (date2.getFullYear() - date1.getFullYear()))
    console.log(diffDays);
    console.log(diffmonths);
    this.state.diffmonths = diffmonths;
    this.setState({ diffmonths })
    const form = {

      "prdAcctId": this.state.value,
      "FromDate": this.state.FromDate,
      "ToDate": this.state.ToDate

    }


    //let url = "http://192.168.4.138/IB_External_API/api/Source/GetAccountStatement";

    let url = this.envConfig.REACT_EXTERNAL_API_URL + "GetAccountStatement";

    const response = await axios.post(url, form,
      { headers: { 'Content-Type': 'application/json' } }
    ).then(response => {
      this.setState({
        tableresponse: response.data,
        showComponent: true
      });
    })

  }


  handleChangeToDate = async (event) => {

    this.setState({ ToDate: event.target.value }, function () {
      console.log(this.state.ToDate);
      //console.log((this.state.value).getMonth())
      // var Xmas95 = new Date(this.state.value);
      // var month = Xmas95.getMonth();

      // console.log(month);
    })
  }

  async componentDidMount() {

    //Getting DropDown Values

    //let url = "http://192.168.4.138/IB_CBS_API/api/Source/GetAccountNumbers";

    let url = this.envConfig.REACT_EXTERNAL_API_URL + "GetAccountNumbers";

    const data =
      { CustNo: sessionStorage.getItem('CustNo') }

    const response = await axios.post(url, data,
      { headers: { 'Content-Type': 'application/json' } }
    ).then(response => {
      this.setState({
        response: response.data,

      });
    })

    //END:Getting DropDown Values

  }


  renderDropDownData() {
    if (this.state.response.length != 0) {
      return (this.state.response).map((accounts, index) => {
        const prdAcctId = accounts.lBrCode + '-' + accounts.prdAcctId //destructuring
        //this.state.value = accounts.lBrCode + '-' + accounts.prdAcctId

        return (

          <option key={index} value={prdAcctId}>
            {prdAcctId}
          </option>
        )
      })
    }


  }


  render() {

    const label = '--Select--'

    return (
      <div>
        <h1 id='title'>Account Statement</h1>
        <div>
          <label>Account No.</label>&nbsp;
        <select onChange={this.handleChange} value={this.state.value} >
            <option value={label}>
              {label}
            </option>
            {this.renderDropDownData()}
          </select>
        </div>

        <div>
          <label>From Date.</label>&nbsp;
          <input type="date" id="txt_FromDate" onChange={this.handleChangeFromDate} value={this.state.FromDate} />

          <label>To Date.</label>&nbsp;
          <input type="date" id="txt_ToDate" onChange={this.handleChangeToDate} value={this.state.ToDate} />

        </div>

        <div>
          <input type="submit" id="btn_Submit" value="Submit" onClick={this.renderOnSubmit} />
        </div>
        <div class="form-group">
          <AccountStatementTable tableresponse={this.state.tableresponse} fromdate={this.state.FromDate} todate={this.state.ToDate} diffmonths={this.state.diffmonths} />
        </div>
      </div>
    )
  }

}

class AccountStatementTable extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  renderTableAccountDetails() {


    if (this.props.tableresponse.length != 0) {
      return this.props.tableresponse.map((account, index) => {
        const LBrCode = account.lBrCode
        const PrdAcctId = account.lBrCode + '-' + account.prdAcctId
        const TransDt = account.transDt
        const Particulars = account.particulars
        const Instrument = account.instrumentNo
        const Type = account.type
        const TotalAmt = account.totalAmt

        //custNo: 0
        //data: null
        //fromDate: null
        //instrumentNo: "100"
        //lBrCode: 2
        //moduleType: 0
        //particulars: "D"
        //prdAcctId: "21/17205"
        //toDate: null
        //totalAmt: null
        //transDt: "15/03/2018"
        //type: "ATM/60771501000"
        return (
          <tr key={index}>
            <td>{LBrCode}</td>
            <td>{PrdAcctId}</td>
            <td>{TransDt}</td>
            <td>{Particulars}</td>
            <td>{Instrument}</td>
            <td>{Type}</td>
            <td>{TotalAmt}</td>
          </tr>

        )
      })
    }

  }

  render() {
    if (this.props.fromdate < this.props.todate) {
      if (this.props.diffmonths < 6) {
        if (this.props.tableresponse.length != 0) {
          return (
            <div class>
              <h3 id='title'></h3>
              <div class="form-group">
                <Row>
                  <Col>
                    <Card>
                      <CardHeader>
                        <i className="fa fa-align-justify"></i> Account Statement
              </CardHeader>
                      <CardBody>
                        <Table hover bordered striped responsive size="sm">
                          <thead>
                            <tr>
                              <th>LBrCode</th>
                              <th>PrdAcctId</th>
                              <th>TransDt</th>
                              <th>Particulars</th>
                              <th>Instrument</th>
                              <th>Type</th>
                              <th>TotalAmt</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.renderTableAccountDetails()}
                          </tbody>
                        </Table>
                        <nav>
                          <Pagination>
                            <PaginationItem><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                            <PaginationItem active>
                              <PaginationLink tag="button">1</PaginationLink>
                            </PaginationItem>
                            <PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                            <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                            <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                            <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                          </Pagination>
                        </nav>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>


              </div>


            </div>

          )
        }
        else {
          if (this.props.tableresponse.length == 0) {
            return <Alert color="primary">No Records Found</Alert>
          }
        }
      } else {
        return <Alert color="primary">Statement Details Of Only Six Months can be Viewed</Alert>
      }
    } else  {
      return <Alert color="primary">To Date must be greater than From Date</Alert>
    }
  }

}

export default AccountStatement

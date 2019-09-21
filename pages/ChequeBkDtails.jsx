





import React, { Component } from 'react'
import axios from 'axios'
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Button } from 'reactstrap';
 
import { Alert } from 'reactstrap';

class ChkDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           
            res: []

        }
        
    };
    async componentDidMount() {

let url = "http://localhost:64851/api/source/GetChequebookDetails";
const data = { CustNo: "731416", PrdAcctID: "2-21/17205", ChequeBkReqNo: "156907", Option: "All" }
        const response = await axios.post(url, data,
            { headers: { 'Content-Type': 'application/json' } }
        ).then(response => {
            this.setState({
                res: response.data
            });
        })
    }
    resDataFromApi() {
        if (this.state.res.length != 0) {
            return (this.state.res).map((Data, index) => {
                const Customer_no = Data.mainCustNo 
                const Account_no = Data.prdAcctID
                const Request_date = Data.requestDate
                const Request_time = Data.requestTime
               


                return (
                    <tr>
                        
                        <td><input type="radio" name="details" value={Customer_no}/>{Customer_no}</td>
                        <td>{Account_no}</td>
                        <td>{Request_date}</td>
                        <td>{Request_time}</td>
                      
                    </tr>

                )
            })
        }
    }
 

    render() {

        return (
            <div>
                <h3>ChequeBook Details</h3>
                <h3 id='title'></h3>
                <Card className="p-4">
                    <CardBody>
               
                        <div className="mt-10">
                            <div className="animated fadeIn">
                                <Row>
                                    <Col xs="12" lg="12">
                                        <Card>
                                            <CardHeader>
                                                <i className="fa fa-align-justify"></i>ChequeBook Details
              </CardHeader>
                                            <CardBody>
                                                <Table hover bordered striped responsive size="sm">
                                                    <thead>
                                                        <tr>
                                                            <th>Customer No</th>
                                                            <th>Account No</th>
                                                            <th>Request Date</th>
                                                            <th>Request Time</th>
                                                          
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.resDataFromApi()}
                                                    </tbody>

                                                </Table>
                                                <Pagination>
                                                    <PaginationItem>
                                                        <PaginationLink previous tag="button"></PaginationLink>
                                                    </PaginationItem>
                                                    <PaginationItem active>
                                                        <PaginationLink tag="button">1</PaginationLink>
                                                    </PaginationItem>
                                                    <PaginationItem>
                                                        <PaginationLink tag="button">2</PaginationLink>
                                                    </PaginationItem>
                                                    <PaginationItem>
                                                        <PaginationLink tag="button">3</PaginationLink>
                                                    </PaginationItem>
                                                    <PaginationItem>
                                                        <PaginationLink tag="button">4</PaginationLink>
                                                    </PaginationItem>
                                                    <PaginationItem>
                                                        <PaginationLink next tag="button"></PaginationLink>
                                                    </PaginationItem>
                                                </Pagination>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                            </div>
                        </div>

                    </CardBody>
                </Card>
                
            </div>
        )
    }
}
export default ChkDetails;

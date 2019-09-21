import React, { Component } from "react";
import axios from "axios";
import { Table } from "antd";

const columns = [
    {
        title: "srNo",
        dataIndex: "srNo",
        key: "srNo"
    },
    {
        title: "nomineeName",
        dataIndex: "nomineeName",
        key: "nomineeName"
    },
    {
        title: "prdAcctId",
        dataIndex: "prdAcctId",
        key: "prdAcctId"
    }
];
class AntTable extends Component {
    state = {};
    componentDidMount() {
        let url = "http://192.168.4.138/IB_CBS_API/api/Source/GetAllNomineeDetrails";
        const data = { "CustNo": 731416 }

        const res = axios.post(url, data,).then(resp => {
            this.setState({
                data: resp.data
            });
        });
    }


    render() {
        return (
            <div>
                Hello
        <Table columns={columns} dataSource={this.state.data} />
            </div>
        );
    }
}

export default AntTable;

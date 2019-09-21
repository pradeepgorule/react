import React, { Component } from 'react';
import { message, Button } from 'antd';


class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            act: 0,
            index: '',
            name:'',
            datas: []
        }
    }

    componentDidMount() {
        this.refs.name.focus();
    }

    handleAll = (e) => {
        this.setState({ [e.target.name]: e.target.value }) // using this we get the form value from name attribute and display it on alert
    }
    fSubmit = (e) => {
        e.preventDefault();
        console.log('try');

        let datas = this.state.datas;
        let name = this.refs.name.value;
        let email = this.refs.email.value;
        let mobile = this.refs.mobile.value;
        debugger;
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (name == "") {

            alert("name not be blank");
            return false;
        } else if ((email == "") || (!email.match(mailformat))) {
            alert("invalid email address or not blank");
            return false;
        } else if (  mobile == "" ) {
            alert("mobile cannot blank");
            return false;
        }

        if (this.state.act === 0) {   //new
            let data = {
                name, email, mobile
            }
            datas.push(data);
        } else {                      //update
            let index = this.state.index;
            datas[index].name = name;
            datas[index].email = email;
            datas[index].mobile = mobile;
        }

       

        this.setState({
            datas: datas,
            act: 0
        });

        this.refs.myForm.reset();
        this.refs.name.focus();
    }

    fRemove = (i) => {
        let datas = this.state.datas;
        datas.splice(i, 1);
        this.setState({
            datas: datas
        });

        this.refs.myForm.reset();
        this.refs.name.focus();
    }

    fEdit = (i) => {
        let data = this.state.datas[i];
        this.refs.name.value = data.name;
        this.refs.email.value = data.email;
        this.refs.mobile.value = data.mobile;

        this.setState({
            act: 1,
            index: i
        });

        this.refs.name.focus();
    }


    render() {
        let datas = this.state.datas;
        return (
            <div className="container">
                <h2>{this.state.title}</h2>
                <form ref="myForm" className="myForm" id="cform">
                    <div className="form-group">
                        <label>Name :-</label>
                        <input type="text" ref="name"  name="name" placeholder="Enter your name"  className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Email :- </label>
                        <input type="text" ref="email" placeholder="Enter your email" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Mobile No :-</label>
                        <input type="text" ref="mobile" placeholder="Enter your mobile no" maxLength="10" className="form-control" />
                    </div>
                    <button onClick={(e) => this.fSubmit(e)} className="btn btn-success">submit </button>
                </form>
                <table className="table text-center">
                    <tr>
                        <th>Sr No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th></th>
                        <th></th>
                    </tr>
                    {datas.map((data, i) =>
                        <tr key={i} className="myList">
                            <td>{i + 1}</td><td> {data.name}</td><td> {data.email}</td><td> {data.mobile}</td>

                            <td><button onClick={() => this.fRemove(i)} className="btn btn-danger">remove </button></td>
                            <td><button onClick={() => this.fEdit(i)} className="btn btn-primary">edit </button></td>
                        </tr>
                    )}
                </table>
            </div>
        )
    }

}

export default Form;

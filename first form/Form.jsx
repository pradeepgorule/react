import React, { Component } from 'react';

class Form extends Component {

    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            mobile:"",

        }
    }
   // handlename = (e) => {
        //console.log(e.target.value); display typed value in console
     //   this.setState({ name: e.target.value }) // set typed value for name
        //console.log(e.target); //display input type in console
   // }
  //  handleEmail = (e) => {
       // this.setState({ email: e.target.value })
       // console.log(e.target.value);
   // }
    //handleMobile = (e) => {
    //    this.setState({ mobile: e.target.value })
     //  console.log(e.target);
    //}

    handleAll = (e) => {
        this.setState({[e.target.name]: e.target.value}) // using this we get the form value from name attribute and display it on alert
    }
    handleSubmit = (e) => {
        alert("Name :- " + this.state.name + "\nEmail :- " + this.state.email + "\nMobile :- " + this.state.mobile)
        //alert(JSON.stringify(this.state));//display this.state array (same as print_r in php in other way display array)
       // return (
        //    <div>
         //       <h2>{this.state.name}</h2>
          //      <h2>{this.state.email}</h2>
          //      <h2>{this.state.mobile}</h2>
          //  </div>
        //)

    }
    render() {
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label for="name">Name</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Enter Name" name="name" value={this.state.name} onChange={this.handleAll} />
                    </div>
                    <div className="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email" name="email" value={this.state.email} onChange={this.handleAll} />
                    </div>
                    <div className="form-group">
                        <label for="mobile">Mobile</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Enter Mobile Number" name="mobile" value={this.state.mobile} onChange={this.handleAll} />
                        
                    </div>
                    <input type="submit" name="submit" value="Submit" className="btn btn-success" />
                    
                </form>
                
            </div>
        )
    }

}   

export default Form;
            
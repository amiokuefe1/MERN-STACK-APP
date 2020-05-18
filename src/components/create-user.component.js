import React, { Component } from 'react';
import axios from 'axios';
// the above react package will help us send; post and get requests with which we can connect the frontend to our server through our node backend folder

class CreateUser extends Component {
  constructor(props){

	  super(props);

	  this.onChangeUsername = this.onChangeUsername.bind(this);
	  this.onSubmit = this.onSubmit.bind(this);
	  // the above will make it possible to use the 'this' keyword when we place Event Handler methods on the form fields

	  this.state ={
		username: '',
	  }

	}

	onChangeUsername(e){
		this.setState({
			username: e.target.value
		})
	}

	onSubmit(e){
		e.preventDefault();

		const user = {
			username: this.state.username,
		}; // the above will store the form values as the new state values

		console.log(user);

		axios.post('http://localhost:5000/users/add', user)
		.then(res => console.log(res.data));
		// the above will summon the node route to add a user to the mongoDB database and equally upload/parse our form data

		this.setState({
			username: ''
		})
	}



  render() {
	return (
	  <div>
		<h3> Create New User</h3>
		<form onSubmit={this.onSubmit}>
			 <div className="form-group">
			  <label> Username: </label>
		      <input type="text"
		         required
		         className="form-control"
		         value={this.state.username}
		         onChange={this.onChangeUsername}
		         />
		    </div>
		    <div className="form-group">
		    	<input type="submit" value="Create User" className="btn btn-primary" />
		    </div>
		</form>
	  </div>
	);
  }
}

export default CreateUser;
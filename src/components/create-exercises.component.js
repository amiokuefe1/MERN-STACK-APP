import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios'

class CreateExercises extends Component {
	constructor(props){

	  super(props);

	  this.onChangeUsername = this.onChangeUsername.bind(this);
	  this.onChangeDescription = this.onChangeDescription.bind(this);
	  this.onChangeDuration = this.onChangeDuration.bind(this);
	  this.onChangeDate = this.onChangeDate.bind(this);
	  this.onSubmit = this.onSubmit.bind(this);
	  // the above will make it possible to use the 'this' keyword when we place Event Handler methods on the form fields

	  this.state ={
		username: '',
		description: '',
		duration:0,
		date: new Date(),
		users: []
	  }

	}

	componentDidMount() {
	  	axios.get('http://localhost:5000/users/')
	  	  .then(response => {
	  	  	if(response.data.length > 0){
	  	  			// the above condition states that if we do have usernames in mongoDB then list them out
		  	  	this.setState({
				  		users:response.data.map(user=>user.username),
				  		username: response.data[0].username
		  	  	
		  	  })
	  	  	}

	  	 })

	} //this will load the 'added users' before the UI is loaded to the users

	onChangeUsername(e){
		this.setState({
			username: e.target.value
		})
	}

	onChangeDescription(e){
		this.setState({
			description: e.target.value
		})
	}

	onChangeDuration(e){
		this.setState({
			duration: e.target.value
		})
	}

	onChangeDate(date){
		this.setState({
			date: date
		})
	}

	onSubmit(e){
		e.preventDefault();

		const exercise = {
			username: this.state.username,
			description: this.state.description,
			duration:this.state.duration,
			date: this.state.date
		}; // the above will store the form values as the new state values

		console.log(exercise);

		axios.post('http://localhost:5000/exercises/add', exercise)
		.then(res => console.log(res.data));
		// the above will summon the node route to add a user to the mongoDB database and equally upload/parse our form data

		window.location = '/';
	}
  
  render() {
	return (
	  <div>
		<p>
		  You are on the Create Exercises component!
		</p>

		<h3> Create New Exercise Log </h3>
		<form onSubmit ={this.onSubmit}>
		  <div className="form-group">
		    <label> Username: </label>
		    <select ref="userinput"	required className="form-control" value={this.state.username}  	onChange={this.onChangeUsername}>
		    	{
		    		this.state.users.map(function(user) {
		    			return <option 
		    			key={user}
		    			value={user}>
		    			   
		    			   {user}

		    			</option>
		    		})
		    	} 

		     </select>
		    </div>

		    <div className="form-group">
		      <label> description </label>
		      <input type="text"
		         required
		         className="form-control"
		         value={this.state.description}
		         onChange={this.onChangeDescription}
		         />
		    </div>
		    <div className="form-group">
		      <label> Duration (in minutes): </label>
		      <input type="text"
		         required
		         className="form-control"
		         value={this.state.duration}
		         onChange={this.onChangeDuration}
		         />
		    </div>
		    <div className="form-group">
		      <label> Date: </label>
		      <div>
		         <DatePicker 
		         selected={this.state.date}
		         onChange={this.onChangeDate}
		         />
		      </div>

		    </div>

		    <div className="form-group">
		    	<input type="submit" value="Create Exercise Log" className="btn btn-primary" />
		    </div>
		  
		</form>
	  </div>
	);
  }
}

export default CreateExercises;
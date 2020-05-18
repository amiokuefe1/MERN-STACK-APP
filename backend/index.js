const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// const conString = process.env.ATLAS_URI;
mongoose.connect('mongodb+srv://ecommerce:u3XvDdzmGVK83nxC@mern-stack-dsosa.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useCreateIndex:true,  useUnifiedTopology: true}
	);

const connect = mongoose.connection;
connect.once('open', () => {
  console.log("MongoDB database is connected");
});


const exercisesRouter = require('./routes/exercise');
const usersRouter = require('./routes/user.js');
// saving route (that includes the controllers) files to variables

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);
// the above attaches a url path to the route files (bearing the controllers) we it can be accessed



app.listen(port, ()=>{
	console.log(`Server is running on port: ${port}`);
})
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT||5000;

app.use(cors());
app.use(express.json());

// const uri = process.env.ATLAS_URI;
// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// const connection = mongoose.connection;
// connection.once('open', () =>{
//     console.log("MongoDb database connection established successfully");
// })

//   .then(() => console.log("Mongodb connected..."))
//   .catch(err => console.error('MongoDB connection error:', err));


const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

const TasksRouter = require('./routes/Tasks');
const UsersRouter = require('./routes/Users');

app.use('/Tasks', TasksRouter);
app.use('/Users', UsersRouter);

app.listen(port, () =>{
    console.log('server is running on port: ' +port);
});
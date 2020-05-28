const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const port = process.env.PORT || 4000;

const JoinRoute = require('./route/api/join');
const LoginRoute = require('./route/api/signin');
const LogoutRoute = require('./route/api/logout');
const VerifyRoute = require('./route/api/verify');
const UserFindRoute = require('./route/api/UserFind');
const UserUpdateRoute = require('./route/api/UserUpdate');
const SignUpRoute = require('./route/api/signup')
const CreateBoardRoute = require('./route/api/CreateBoard');
const BoardListRoute = require('./route/api/BoardList');
const BoardDetailRoute = require('./route/api/BoardDetail');
const BoardUpdateRoute = require('./route/api/BoardUpdate');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/self', { useUnifiedTopology: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

app.use('/api', JoinRoute);
app.use('/api', LoginRoute);
app.use('/api', LogoutRoute);
app.use('/api', VerifyRoute);
app.use('/api', UserFindRoute);
app.use('/api', UserUpdateRoute);
app.use('/api', SignUpRoute);
app.use('/api', CreateBoardRoute);
app.use('/api', BoardListRoute);
app.use('/api', BoardDetailRoute);
app.use('/api', BoardUpdateRoute);

app.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
})


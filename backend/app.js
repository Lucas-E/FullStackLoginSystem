var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
const userRouter = require('./routes/user')
const authRouter = require('./routes/auth');
const refreshRouter = require('./routes/refresh');
const logouRouter = require('./routes/logout')

var app = express();

//setting up cors
const cors = require('cors')
app.use(cors())

//importing bodyparser
const bodyParser = require('body-parser')

//importing sequelize and models
const Sequelize = require('sequelize')
const models = require('./models/index')


//setting up sequelize connection
const conn = async (Sequelize, models) => {
    const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: './db.sqlite'
    })
    try {
        await sequelize.authenticate();
        console.log('Connection established')
    } catch (error) {
        console.log(error)
        console.log('an error ocurred')
    }
    // try {
    //     const qry = await models.sequelize.sync({force:true});
    //     console.log('tables created')
    // } catch (error) {
    //     console.log('An error ocurred while creating the tables')
    // }
}
conn(Sequelize, models)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}))

app.use('/', indexRouter);
app.use('/auth', authRouter)
app.use('/refresh', refreshRouter)
app.use('/logout', logouRouter)

app.use('/user', userRouter)

module.exports = app;

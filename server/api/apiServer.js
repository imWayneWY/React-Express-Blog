import Express from 'express';
import config from '../../config/config.js';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import mongoose from 'mongoose';

const port = config.apiPort;

const app = new Express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser('express_react_cookie'));
app.use(session({
    secret: 'express_react_cookie',
    resave: true,
    saveUninitialized: true,
    cookie: {maxAge: 60 * 1000 * 30}
}));

app.use('/',require('./main'));
app.use('/admin',require('./admin'));

mongoose.Promise = require('bluebird');
mongoose.connect(`cmongodb://${config.dbHost}:${config.dbPort}/blog`,function(err){
    if(err){
        console.log(err, "DataBase connect failed");
    }

    app.listen(port, function(err){
        if(err){
            console.error('err:',err);
        } else {
            console.info(`===> api server is running at ${config.apiHost}:${config.apiPort}`);
        }
    });
});
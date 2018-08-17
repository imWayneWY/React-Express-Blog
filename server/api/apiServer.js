import Express from 'express';
import config from '../../config/config.js';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import session from 'express-session';

const port = config.apiPort;

const app = new Express();

/** 跨域用代码，发布时可以删除 */
const router = Express.Router()
router.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
app.use('*',router);


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
mongoose.connect(`mongodb://${config.dbHost}:${config.dbPort}/blog`,{ useNewUrlParser: true },function(err){
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
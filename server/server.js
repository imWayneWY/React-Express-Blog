require('babel-register');
import path from 'path';
import Express from 'express';
import connectHistoryApiFallback from 'connect-history-api-fallback';
import httpProxy from 'http-proxy';
import config from '../config/config';
import compression from 'compression';


const app = new Express();
const port = config.port;

app.use('/api',(req,res)=>{
    proxy.web(req,res,{target:targetUrl});
});

app.use('/',Express.static(path.join(__dirname,"..",'build')));
app.use('/', connectHistoryApiFallback());

const targetUrl = `http://${config.apiHost}:${config.apiPort}`;
const proxy = httpProxy.createProxyServer({
    target:targetUrl
});

app.use(compression());

app.listen(port, (err)=>{
    if(err){
        console.error(err);
    }else{
        console.log(`===>open http://${config.host}:${config.port} in a browser to view the app`)
    }
});


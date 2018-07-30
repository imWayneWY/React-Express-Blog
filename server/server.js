import path from 'path';
import Express from 'express';
import connectHistoryApiFallback from 'connect-history-api-fallback';
import httpProxy from 'http-proxy';

const app = new Express();
const port = config.port;

app.use('/api',(req,res)=>{
    proxy.web(req,res,{target:targetUrl});
});

app.use('/',Express.static(path.join(__dirname,"..",'build')));
app.use('/', connectHistoryApiFallback());

const targetUrl = `http://${config.apiHost}:${config.apiPost}`;
const proxy = httpProxy.createProxyServer({
    target:targetUrl
});


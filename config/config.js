const HOST,PORT,APIHOST,APIPORT,NODE_ENV;
module.exports = {
    host: HOST || '127.0.0.1',
    port: PORT || (NODE_ENV === 'production'?8080:3000),
    apiHost: APIHOST || '127.0.0.1',
    apiPort: APIPORT || '3030',
    dbHost: "localhost",
    dbport: "27017",
    app: {
        title: "personal blog",
        description: "demo",
        head:{
            titleTemplate: 'blog',
            meta:[
                {
                    name: "description",
                    content:"react express demo"
                },
                {charset: "urf-8"}
            ]
        }
    }
};
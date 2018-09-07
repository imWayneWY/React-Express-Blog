import Express from 'express';

const router = Express.Router();
import Article from '../../models/article';
import {responseClient} from '../util';

router.get('/getArticles',function(req,res){
    let skip = (req.query.pageNum-1)<0?1:(req.query.pageNum-1)*req.query.rowsPerPage;
    let limit = Number.parseInt(req.query.rowsPerPage,10);
    let onlyShowAuditing = req.query.onlyShowAuditing;
    let searchCondition = {};
    if(onlyShowAuditing){
        searchCondition = {
            state: 'posted',
        };
    }else{
        searchCondition = {
            $or: [
                {state: 'published'},
                {state: 'posted'},
            ]
        };
    }

    let responseData = {
        list: [],
    };
    Article.count(searchCondition).then(count => {
        responseData.total = count;
        let totalPage = count/5 + 1;
        if(req.query.pageNum>totalPage){
            err = {
                msg: 'unvalid page number',
            };
            throw err;
        }

        Article.find(searchCondition, '_id title tags content author time state', {
            skip,
            limit ,
            sort: {'time': 1},
        }).then(result => {
            responseData.list = result;
            responseClient(res,200,0,'success',responseData);
        }).cancel(err => {
            throw err;
        });
    }).catch(err => {
        responseClient(res);
    })
});

router.post('/dealArticle',function(req,res){
    const {id,state} = req.body;
    Article.update({_id:id},{state})
        .then(result=>{
            responseClient(res,200,0,'deal success',result);
        }).cancel(err=>{
            responseClient(err);
        });
});
module.exports = router;
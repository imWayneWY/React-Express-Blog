import Express from 'express';

const router = Express.Router();
import Article from '../../models/article';
import {responseClient} from '../util';

router.get('/getArticles',function(req,res){
    let skip = (req.query.pageNum-1)<0?1:(req.query.pageNum-1)*req.query.rowsPerPage;
    let limit = Number.parseInt(req.query.rowsPerPage,10);
    let searchCondition = {
        $or: [
            {state: 'published'},
            {state: 'posted'},
        ]
    };
    let responseData = {
        list: [],
    };
    Article.count(searchCondition).then(count => {
        let totalPage = count/5 + 1;
        if(req.query.pageNum>totalPage){
            err = {
                msg: 'unvalid page number',
            };
            throw err;
        }

        Article.find(searchCondition, '_id title  content author time state', {
            skip,
            limit ,
            sort: {'time': 1},
        }).then(result => {
            responseData.list = result;
            responseClient(res,200,0,'success',responseData);
        }).cancel(err => {
            console.log(err);
            throw err;
        });
    }).catch(err => {
        console.log(err);
        responseClient(res);
    })
});
module.exports = router;
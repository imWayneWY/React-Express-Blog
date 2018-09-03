import Express from 'express';

const router = Express.Router();
import Article from '../../models/article';
import {responseClient} from '../util';

router.post('/addArticle', function(req, res){
    const {
        title,
        content,
        time,
        tags,
        state,
    } = req.body;
    const author = req.session.userInfo.username;
    const viewCount = 0;
    const commentCount = 0;
    const summary = content.length>120
                    ? content.slice(0,120)
                    : content;
    let tempArticle = new Article({
        title,
        summary,
        content,
        state,
        viewCount,
        commentCount,
        time,
        author,
        tags: tags.split(',')
    });
    tempArticle.save().then(data=>{
        responseClient(res,200,0,'post success');
    }).cancel(err=>{
        responseClient(res);
    });
});

router.get('/getArticleList',function(req,res){
    let state = 'published';
    let tag = req.query.tag;
    let pageNum = req.query.pageNum;

    let searchCondition = {
        state,
    };
    if(tag){
        searchCondition.tags = tag;
    };
    let skip = (pageNum-1)<0 ? 0 : (pageNum-1) * 5;
    let responseData = {
        endOfAll: false,
        list: [],
    };
    Article.count(searchCondition).then(count => {
        let totalPage = count/5 + 1;
        if(pageNum>totalPage){
            err = {
                msg: 'unvalid page number',
            };
            throw err;
        }else if(pageNum === totalPage){
            responseData.endOfAll = true;
        }

        Article.find(searchCondition, '_id title summary author viewCount commentCount time', {
            skip:skip,
            limit: 5,
            sort: {'time': -1},
        }).then(result => {
            responseData.list = result;
            responseClient(res,200,0,'success',responseData);
        }).cancel(err => {
            throw err;
        });
    }).cancel(err => {
        responseClient(res);
    })

});
module.exports = router;
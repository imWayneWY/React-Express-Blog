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
    if(!req.session.userInfo){
        responseClient(res,400,2,'user session is over due, plz login');
        return;
    }
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

router.post('/saveArticle', function(req, res){
    const {
        _id,
        title,
        content,
        time,
        tags,
        state,
    } = req.body;
    if(!req.session.userInfo){
        responseClient(res,200,2,'user session is over due, plz login');
        return;
    }
    const author = req.session.userInfo.username;


    const summary = content.length>120
                    ? content.slice(0,120)
                    : content;
    Article.findOne({_id})
        .then(data=>{
            if(author!==data.author){
                responseClient(res,200,2,'You are not the author');
                return;
            }
            Article.update({_id},{title,content,time,tags:tags.split(','),state,summary})
            .then(result=>{
                responseClient(res,200,0,'save success',result)
            }).cancel(err=>{
                throw err;
            });
        }).catch(err=>{
            responseClient(err);
        })

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
    }).catch(err => {
        responseClient(res);
    })

});
router.get('/getArticleDetail',function(req,res){
    const _id = req.query.id;
    if(!_id){
        responseClient(res,400,2,'id is needed');
        return;
    };
    Article.findOne({_id})
        .then(data=>{
            data.viewCount = data.viewCount+1;
            Article.update({_id},{viewCount: data.viewCount})
                .then(
                    result=>{
                        responseClient(res,200,0,'success',data);
                    }
                ).cancel(err=>{throw err;});
        }).catch(err=>{
            responseClient(res);
        });
});

router.get('/getMyArticleList',function(req,res){
    let skip = (req.query.pageNum-1)<0?1:(req.query.pageNum-1)*req.query.rowsPerPage;
    let limit = Number.parseInt(req.query.rowsPerPage,10);
    if(!req.session.userInfo){
        responseClient(res,400,2,'user session is over due, plz login');
        return;
    }
    const author = req.session.userInfo.username;
    
    let searchCondition = {
        author,
    };
    let state = req.query.state;
    if(state){
        searchCondition.state = state;
    }
    let responseData = {
        total: 0,
        list: [],
    };
    Article.count(searchCondition).then(count => {
        responseData.total=count;

        Article.find(searchCondition, '_id title content author time state', {
            skip,
            limit,
            sort: {'time': -1},
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
router.get('/delArticle',function(req,res){
    let id = req.query.id;
    const author = req.session.userInfo.username;

    Article.findOne({_id:id}).
        then(data=>{
            if(author!==data.author){
                responseClient(res,200,2,'You are not the author');
                return;
            }
            Article.remove({_id:id})
            .then(result=>{
                if(result.n===1){
                    responseClient(res,200,0,'delete success');
                }else{
                    responseClient(res,200,1,'this article does not exist');
                }
            }).cancel(err=>{
                throw err;
            });
        }).catch(err=>{
            responseClient(res);
        });
});
module.exports = router;
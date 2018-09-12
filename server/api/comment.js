import Express from 'express';
import Comment from '../../models/comment';
import Article from '../../models/article';
import {responseClient} from '../util';

const router = Express.Router();
router.post('/addComment',function(req,res){
    const {
        articleId,
        content,
        time,
    } = req.body;
    if(!req.session.userInfo){
        responseClient(res,400,2,'user session is over due');
        return;
    }
    const author = req.session.userInfo.username;
    const isReported = false;
    const reportUser = '';
    const reportReason = '';
    const reportTime = '';
    let tempComment = new Comment({
        articleId,
        author,
        content,
        time,
        isReported,
        reportUser,
        reportReason,
        reportTime,
    });
    const _id = articleId;
    Article.findOne({_id})
    .then(data=>{
        data.commentCount = data.commentCount+1;
        Article.update({_id},{commentCount: data.commentCount})
            .then(result=>{
                tempComment.save().then(data=>{
                    responseClient(res,200,0,'comment success')
                }).cancel(err=>{
                    throw err;
                });
            }).cancel(err=>{throw err;});
    }).catch(err=>{
        responseClient(res);
    });

});


router.get('/getCommentList',function(req,res){
    const articleId = req.query.id;

    Comment.find({articleId},'_id author time content isReported',{sort: {time: -1}}).then(result => {
        responseClient(res,200,0,'success',result);
    }).catch(err=>{
        responseClient(res);
    });
});

router.post('/report',function(req,res){
    const {
        _id,
        reportReason,
        reportTime,
    } = req.body;
    if(!req.session.userInfo){
        responseClient(res,200,2,'user session is over due, plz login');
        return;        
    }
    const reportUser = req.session.userInfo.username;
    Comment.findOne({_id})
        .then(data=>{
            Comment.update({_id},{reportReason,reportTime,reportUser,isReported:true})
                .then(result=>{
                    responseClient(res,200,0,'report success',result);
                }).cancel(err=>{
                    throw err;
                });
        }).catch(err=>{
            responseClient(err);
        });
});
module.exports = router;
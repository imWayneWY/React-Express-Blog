import Express from 'express';
const router = Express.Router();
import Comment from '../../models/comment';
import {responseClient} from '../util';

router.get('/getReportedCommentList',function(req,res){
    Comment.find({isReported: true},null,{sort:{'reportTime': 1}})
        .then(result => {
            let responseData = result;
            responseClient(res,200,0,'success',responseData);
        }).catch(err=>{
            responseClient(res);
        });
});

router.get('/checkedComment',function(req,res){
    const _id = req.query.id;
    console.log('checked comment: '+_id);
    Comment.findByIdAndUpdate(_id,{
        isReported: false,
        reportTime: '',
        reportUser: '',
        reportReason: '',
    }).then(
        result=>{
            let responseData = result;
            responseClient(res,200,0,'success',responseData);
    }).catch(err=>{
        responseClient(res);
    });
});

router.get('/deleteComment',function(req,res){
    const _id = req.query.id;
    console.log('delete comment: '+_id);
    Comment.findByIdAndRemove(_id).then(
        result=>{
            let responseData = result;
            responseClient(res,200,0,'success',responseData);
    }).catch(err=>{
        responseClient(res);
    });
});
module.exports = router;
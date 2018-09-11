import Express from 'express';
import Comment from '../../models/comment';
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
    tempComment.save().then(data=>{
        responseClient(res,200,0,'comment success')
    }).cancel(err=>{
        responseClient(res);
    });
});
module.exports = router;
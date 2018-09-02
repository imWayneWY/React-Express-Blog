import Express from 'express';

const router = Express.Router();
import Article from '../../models/article';
import {responseClient} from '../util';

router.post('/', function(req, res){
    const {
        title,
        content,
        time,
        tags,
        state
    } = req.body;
    const author = req.session.userInfo.username;
    const viewCount = 0;
    const commentCount = 0;
    let tempArticle = new Article({
        title,
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
module.exports = router;
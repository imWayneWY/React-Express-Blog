import Express from 'express';
import Tag from '../../models/tag';
import {responseClient} from '../util';

const router = Express.Router();
router.use('/user', require('./user'));
router.use('/addArticle', require('./article'));

router.get('/getTags',function(req,res){
    Tag.find(null, 'name').then(data => {
        responseClient(res, 200, 0, 'request success.', data);
    }).catch(err => {
        responseClient(res);
    })
});
module.exports = router;
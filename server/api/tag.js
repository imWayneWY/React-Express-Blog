import Express from 'express';
const router = Express.Router();
import Tag from '../../models/tag';
import {responseClient} from '../util';

router.post('/addTag', function(req, res){
    let {name} = req.body;
    Tag.findOne({name})
        .then(result=>{
            if(!result){
                let tag = new Tag({
                    name,
            });
            tag.save()
                .then(data => {
                    responseClient(res,200,0,'Tag add success.')
                }).catch(err=>{
                    throw err
                })
          }else{
              responseClient(res,200,1,'This tag has already existed');
          }
        }).catch(err=>{
            responseClient(res);
        })
});

router.get('/delTag', function(req, res){
    let {name} = req.query;
    Tag.remove({name})
        .then(result=>{
            if(result.result.n === 1){
                responseClient(res,200,0,'Tag delete success.');
            }else{
                responseClient(res,200,1,'Tag does not exist.');
            }
        }).catch(err=>{
            responseClient(res);
        })
});

module.exports = router;
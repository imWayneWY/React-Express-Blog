import Express from 'express';
import {responseClient} from '../util';
import User from '../../models/user';

const router = Express.Router();
router.use( (req,res,next) =>{
    if(req.session.userInfo){
        next()
    }else{
        res.send(responseClient(res,200,1,'user info is over due, please login again'));
    }
});

router.get('/getUsers',(req,res)=>{
    let skip = (req.query.pageNum-1)<0?1:(req.query.pageNum-1)*req.query.rowsPerPage;
    let limit = Number.parseInt(req.query.rowsPerPage,10);
    let responseData = {
        total: 0,
        list: []
    };
    User.count()
        .then(count=>{
            responseData.total=count;
            User.find(null,'_id username type state password',{skip:skip, limit:limit})
                .then((result)=>{
                    responseData.list = result;
                    responseClient(res,200,0,'',responseData);
                })
        }).catch(err=>{
            responseClient(res)
        });
});
router.post('/updateUser',(req,res)=>{
    let {id,type,state} = req.body;
    if(!id){
        responseClient(res,400,2,'id is needed');
        return;
    }
    if(!state){
        responseClient(res,400,2,'state is needed');
        return;
    }
    if(!type){
        responseClient(res,400,2,'type is needed');
        return;
    }
    User.update({_id:id},{state,type})
        .then(result=>{
            console.log(result);
            responseClient(res,200,0,'update success!',result)
        }).cancel(err=>{
            console.log(err);
            responseClient(res);
        });

});
module.exports = router;
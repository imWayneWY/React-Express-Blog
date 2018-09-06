import Express from 'express';
import {MD5_SUFFIX, responseClient, md5} from '../util';
import User from '../../models/user';
const router = Express.Router();

router.post('/login',(req,res)=>{
    let {username,password} = req.body;
    if(!username){
        responseClient(res,400,2,'username is needed');
        return;
    }
    if(!password){
        responseClient(res,400,2,'password is needed');
        return;
    }
    User.findOne({
        username,
        password: md5(password + MD5_SUFFIX)
    }).then(userInfo => {
        if(userInfo){
            //login success
            let data = {};
            data.username = userInfo.username;
            data.userType = userInfo.type;
            data.userId = userInfo._id;
            data.userState = userInfo.state;
            //set session
            req.session.userInfo = data;

            responseClient(res,200,0, 'login success', data);
            return;
        }
        responseClient(res,400,1,'wrong username or password');
    }).catch(err => {
        responseClient(res);
    })
});
router.post('/register',function(req,res){
    let {username, password} = req.body;
    if(!username){
        responseClient(res,400,2,'username is needed');
        return;
    }
    if(!password){
        responseClient(res,400,2,'password is needed');
        return;
    }
    User.findOne({username})
      .then(data=>{
        if(data){
            responseClient(res,200,1,'this username is occupied');
            return;
        }
        let user = new User({
            username,
            password: md5(password + MD5_SUFFIX),
            type: 'user',
            state: 'actived'
        });
        user.save()
          .then(function(){
              User.findOne({username})
                .then(userInfo=>{
                    let data={};
                    data.username = userInfo.username;
                    data.userType = userInfo.type;
                    data.userState = userInfo.state;
                    responseClient(res,200,0,'register successful',data);
                    return;
                });
          });
    })
});
router.get('/userInfo',function(req,res){
    if(req.session.userInfo){
        responseClient(res,200,0,'',req.session.userInfo);
    }else{
        responseClient(res,200,1,'please login again',req.session.userInfo);
    }
});
router.post('/logout',function(req,res){
    req.session.destroy();
//    res.redirect('/');
    responseClient(res,200,0,'logouted');
});

module.exports = router;
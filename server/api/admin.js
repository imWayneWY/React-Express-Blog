import Express from 'express';
const router = Express.Router();

router.get('/getUsers',(req,res)=>{
    let skip = (req.query.pageNum-1)<0?1:(req.query.pageNum-1)*10;
    let responseData = {
        total: 0,
        list: []
    };
})
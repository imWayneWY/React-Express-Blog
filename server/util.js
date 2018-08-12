import crypto from 'crypto';

module.exports = {
    MD5_SUFFIX: 'Ss8aLJ20hsL0(S0ad*(l21l5ffllz)KAd3',
    md5: function(pwd){
        let md5 = crypto.createHash('md5');
        return md5.update(pwd).digest('hex');
    },
    responseClient(res, 
        httpCode=500, 
        code=3, 
        message='server connection failed',
        data={}){
            let responseDate = {};
            responseDate.code = code;
            responseDate.message = message;
            responseDate.data = data;
            res.status(httpCode).json(responseDate);
    }
};
import Express from 'express';

const router = Express.Router();
router.use('/user', require('./user'));

module.exports = router;
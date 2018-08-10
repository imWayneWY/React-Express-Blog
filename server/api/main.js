import Express from 'express';

const router = Express.Router();
router.user('user', require('./user'));

module.exports = router;
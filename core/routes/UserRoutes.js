var express = require('express')
var router = express.Router();

var LoginService = require('../services/loginService');
router.use(function(req,res,next){
	/*if (req.session.username){
		res.redirect('/');
		res.end();
	}*/
	next();
})
router.get('/',LoginService.sessionValidation);
router.post('/login', LoginService.login);
router.get('/register',LoginService.register);
router.post('/register',LoginService.NewRegister);

module.exports=router;
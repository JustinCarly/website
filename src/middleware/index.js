import Utils from '../routes/utils';
const request = require('request');
import {recaptchaSecret} from "../secrets";
const secretCaptcha = recaptchaSecret;

export function loggedOut(req, res, next) {
	if(req.session && req.session.userId){
		return res.redirect('/profile');
	}
	return next();
}


export function requiresLogin(req, res, next){
	if(!req.session || !req.session.userId){
		return Utils.throwError(401, 'You must be logged in to view Profile Assets, Please login now', '/login', next);
	}
	return next();
}

// export function getUser(req, res, next){
// 	if(req.session.userId){
// 		User.findById(req.session.userId)
// 			.exec(function (error, user) {
// 				if (error) {
// 					return next(error);
// 				}
// 				res.locals.user = user;
// 				return next();
// 			});
// 	}
// 	else { //Need the else or it will hit both next() and get race conditions...
// 		res.locals.user = "";
// 		return next();
// 	}
// }


export function passCaptcha(req, res, next){
	if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' ||	req.body['g-recaptcha-response'] === null){
		let status = 422;
		return res.status(status).json({success: false, status: status, message:"", errorMessage: "Please Select captcha"});
	}
	const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${secretCaptcha}&response=${req.body['g-recaptcha-response']}&remoteip=${req.connection.remoteAddress}`;
	
	request(verifyUrl, (err, response, body) => {
		body = JSON.parse(body);
		if(body.success !== undefined && !body.success){
			Utils.logWarning(body);
			let status = 400;
			return res.status(status).json({success: false, status: status, message:"", errorMessage: "Captcha URL potentially malformed, Please try again."});
		}
		next();
	});
}
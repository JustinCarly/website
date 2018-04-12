const express = require('express');
const router = express.Router();

import Utils from './utils';
import {loggedOut, getUser, passCaptcha} from '../middleware/index';

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/',  (req, res) => {
	return Utils.renderView('page/index', { title: 'Home', navId: '#homeLink', recaptcha: true }, req, res)
});

module.exports = router;

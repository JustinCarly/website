import CountdownController from '../controllers/countdown';

export default function(ctx, next) {
	new CountdownController();
	next();
}
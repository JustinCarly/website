import HelloEveryWorldController from '../controllers/helloEveryWorld';

export default function(ctx, next) {
	new HelloEveryWorldController();
	next();
}
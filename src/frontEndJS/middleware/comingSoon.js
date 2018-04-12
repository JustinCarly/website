import ComingSoonController from '../controllers/comingSoon';

export default function(ctx, next) {
	new ComingSoonController();
	next();
}
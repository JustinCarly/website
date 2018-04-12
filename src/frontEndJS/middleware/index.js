// import HelloEveryWorldMiddleware from './helloEveryWorld';
// import NavigationMiddleware from './navigation';
// import ComingSoonMiddleware from './comingSoon';

import Bootstrap from './dependencies/bootstrap';


export default class Middleware {
    constructor(page) {
	      page('*', Bootstrap);
	      // page('*', HelloEveryWorldMiddleware);
	      // page('*', NavigationMiddleware);
	      // page('*', ComingSoonMiddleware);
	      //page('*', SideBarToggle);
    }
}
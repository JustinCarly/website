import Middleware from '../middleware';
import route from 'page';
//import Countdown from './countdown';
//import ParsleyFormValidation from './parsleyFormValidation';



export default class Router extends Middleware {
    constructor() {
        super(route);
        this._bindRoutes();
        route.start({ click: false });
    }

    _bindRoutes() {
    }

    refresh() {
        route(window.location.pathname);
    }
}

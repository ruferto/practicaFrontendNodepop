import BaseController from './BaseController.js';

export default class AdController extends BaseController {

    constructor(element) {
        super(element);
        this.element.addEventListener('click', (event) => {
            console.log("este")
        });
    }

}

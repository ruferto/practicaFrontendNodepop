import BaseController from './BaseController.js';
import dataService from '../services/DataService.js';

export default class NewAdFormController extends BaseController {

    constructor(element) {
        super(element);
        this.checkIfUserIsLogged();
        this.attachEventListeners();
        this.focusInField();
    }

    async checkIfUserIsLogged() {
        const userIsLogged = await dataService.isUserLogged();
        if (!userIsLogged) {
            window.location.href = '/login.html?next=/new-ad.html';
        } else {
            this.publish(this.events.FINISH_LOADING);
        }
    }

    focusInField() {
        const firstField = this.element.querySelector('input');
        firstField.focus();
    }

    attachEventListeners() {
       
        this.element.addEventListener('submit', async event => {
            event.preventDefault();
            let adTags = this.element.querySelector('.ad-tags').value;
            adTags=adTags.split(',');
            
            for(let i=0; i<adTags.length; i++){
                adTags[i]=adTags[i].trim();
            }

            const ad = {
                nombre: this.element.querySelector('.ad-name').value,
                precio: parseFloat(this.element.querySelector('.ad-price').value),
                venta: this.element.querySelector('.ad-sale').value == 'true',
                foto: null,
                tags: adTags
            };
            if(this.element.querySelector('.ad-photo').files.length > 0){
                ad.foto = this.element.querySelector('.ad-photo').files[0];
            }
            this.publish(this.events.START_LOADING);
            try {
                await dataService.saveAd(ad);
                window.location.href = '/?mensaje=adOK';
            } catch (error) {
                this.publish(this.events.ERROR, error);
            } finally {
                this.publish(this.events.FINISH_LOADING);
            }
        });
    }

}

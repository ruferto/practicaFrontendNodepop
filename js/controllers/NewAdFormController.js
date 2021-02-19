import BaseController from "./BaseController.js";
import dataService from "../services/DataService.js";

export default class NewAdFormController extends BaseController {

    constructor(element) {
        super(element);
        this.checkIfUserIsLogged();
        this.attachEventListeners();
    }

    async checkIfUserIsLogged() {
        const userIsLogged = await dataService.isUserLogged();
        if (!userIsLogged) {
            window.location.href = '/login.html?next=/new-ad.html';
        } else {
            this.publish(this.events.FINISH_LOADING);
        }
    }

    focusInTextarea() {
        const firstField = this.element.querySelector('input');
        firstField.focus();
    }

    attachEventListeners() {
        // // a medida que el usuario escribe, comprobamos si el formulario es válido para habiltiar o no el botón de enviar
        // const textarea = this.element.querySelector('textarea');
        // textarea.addEventListener('keyup', () => {
        //     const button = this.element.querySelector('button');
        //     if (this.element.checkValidity()) {
        //         button.removeAttribute('disabled');
        //     } else {
        //         button.setAttribute('disabled', true);
        //     }
        // });

        // controlamos cuando se envía el formulario
        this.element.addEventListener('submit', async event => {
            event.preventDefault();  // cancelamos el envío del formulario (comportamiento por defecto)
            let adTags = this.element.querySelector('.ad-tags').value;
            adTags=adTags.split(',');
            
            for(let i=0; i<adTags.length; i++){
                adTags[i]=adTags[i].trim();
            }

            const ad = {
                nombre: this.element.querySelector('.ad-name').value,
                precio: parseFloat(this.element.querySelector('.ad-price').value),
                venta: this.element.querySelector('.ad-sale').value == 'true',
                foto: this.element.querySelector('.ad-photo').value,
                tags: adTags
            };
            this.publish(this.events.START_LOADING);
            try {
                await dataService.saveAd(ad);
                window.location.href = '/?mensaje=adOK'
            } catch (error) {
                this.publish(this.events.ERROR, error)
            } finally {
                this.publish(this.events.FINISH_LOADING)
            }
        });
    }

}

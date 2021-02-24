import BaseController from "./BaseController.js";
import dataService from "../services/DataService.js";
import { editFormView } from '../views.js';


export default class EditAdFormController extends BaseController {

    constructor(element) {
        super(element);
        this.checkIfUserIsLogged();
        //this.checkIfUserIsAuthor();
        this.attachEventListeners();
    }

    async render() {
        try{
            this.pubSub.publish(this.events.START_LOADING, {});

            const { userId } = await dataService.getUserDetails();
            const {id} = dataService.getStringQueries();
            const ad = await dataService.getAd(id);
            const isAuthor = (userId == ad.userId);

            const innerHTMLEdit = isAuthor ?  editFormView(ad) : '<div class="message"><br>No tiene permiso para editar este anuncio<br><br><a href="/">Volver</a></div>';
            const article = document.createElement('article');

            article.innerHTML = innerHTMLEdit;
            this.element.appendChild(article);
            if(!isAuthor) throw new Error(`No tiene permiso para editar este anuncio`);

            const backBtn = this.element.querySelector('.button-cancel');
            backBtn.addEventListener('click', (event) => {
                //window.history.back();
                console.log('patrás')
            });

        }catch(error){
            this.pubSub.publish(this.events.ERROR, error);
        }finally{
            this.pubSub.publish(this.events.FINISH_LOADING, {});
        }
    }

    async checkIfUserIsLogged() {
        const userIsLogged = await dataService.isUserLogged();
        if (!userIsLogged) {
            window.location.href = '/login.html?next=/edit-ad.html';
        } else {
            this.publish(this.events.FINISH_LOADING);
        }
    }

    async attachEventListeners() {
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
                id: this.element.querySelector('.ad-id').value,
                userId: this.element.querySelector('.ad-userId').value,
                nombre: this.element.querySelector('.ad-name').value,
                precio: parseFloat(this.element.querySelector('.ad-price').value),
                venta: this.element.querySelector('.ad-sale').value == 'true',
                foto: this.element.querySelector('.ad-photo').value,
                tags: adTags
            };
            // if(this.element.querySelector('.ad-photo').files.length > 0){
            //     ad.foto = this.element.querySelector('.ad-photo').files[0];
            // }
            this.publish(this.events.START_LOADING);
            try {
                await dataService.editAd(ad);
                window.location.href = '/?mensaje=editOK'
            } catch (error) {
                this.publish(this.events.ERROR, error)
            } finally {
                this.publish(this.events.FINISH_LOADING)
            }
        });
    }

}

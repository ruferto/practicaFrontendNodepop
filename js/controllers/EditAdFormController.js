import BaseController from "./BaseController.js";
import dataService from "../services/DataService.js";
import { editFormView } from '../views.js';


export default class EditAdFormController extends BaseController {

    constructor(element) {
        super(element);
        this.checkIfUserIsLogged();
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
                event.preventDefault();
                window.history.back();
            });

            const changePhotoButton = this.element.querySelector('.change-photo');
            changePhotoButton.addEventListener('click', event => {
                event.preventDefault();
                const img = this.element.querySelector('.image-selected');
                img.classList.add('hidden');
                const imgContainer = this.element.querySelector('.photo-container');
                imgContainer.classList.add('hidden');
                const inputChangePhoto = this.element.querySelector('.change-image-input');
                inputChangePhoto.innerHTML = '<input type="file" style="font-size: 1rem; width: 310px;" class="ad-new-photo" name="foto" id="foto" accept="image/*">';
                changePhotoButton.parentNode.removeChild(changePhotoButton);               
            })

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
        
        this.element.addEventListener('submit', async event => {
            event.preventDefault();
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

            const inputPhotoOriginal = this.element.querySelector('.ad-photo');
            const inputPhoto = this.element.querySelector('.ad-new-photo');
            
            if(inputPhoto && inputPhoto.files.length > 0){
                ad.foto = inputPhoto.files[0];
            }else {
                ad.foto = inputPhotoOriginal.value;
            }

            this.publish(this.events.START_LOADING);
            try {
                await dataService.editAd(ad);
                window.location.href = '/?mensaje=editOK';
                
            } catch (error) {
                this.publish(this.events.ERROR, error);
            } finally {
                this.publish(this.events.FINISH_LOADING);
            }
        });
    }

}

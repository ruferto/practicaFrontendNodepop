import BaseController from './BaseController.js';
import dataService from '../services/DataService.js';
import { logInfoView } from '../views.js';

export default class SubtitleController extends BaseController {

    constructor(element){
        super(element);
    }

    async render() {
        const logged = await dataService.isUserLogged();
        if(logged) {
            
            const user = dataService.getUserDetails();
            const logInfo = document.querySelector('.subtitle');
            logInfo.innerHTML = logInfoView(user.username);//`<div style="font-size: 0.7rem;">Conectado como</div> ${user.username}&nbsp;<a href=""><img class="logout-icon" src="./public/images/logout.png" width="15"/></a>`;
            const logoutIcon = document.querySelector('.logout-icon');
            logoutIcon.addEventListener('click', (event) => {
                dataService.logout();
            })
        }
        // article.itemId=ad.nombre;
        // this.element.appendChild(article);
        // article.addEventListener('click', (event) => {
        //     console.log(article.itemId);
        //     window.location.href = `detalle.html?id=${ad.id}`;////////TODO
        // });        
    }

}

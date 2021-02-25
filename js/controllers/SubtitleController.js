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
            const butonAdd = document.querySelector('.buttonAdd');
            butonAdd.addEventListener('click', (event) => {
                window.location.href = '/new-ad.html';
            });
            butonAdd.classList.remove('hidden');
            const user = await dataService.getUserDetails();
            const logInfo = document.querySelector('.subtitle');
            logInfo.innerHTML = logInfoView(user.username);//`<div style="font-size: 0.7rem;">Conectado como</div> ${user.username}&nbsp;<a href=""><img class="logout-icon" src="./public/images/logout.png" width="15"/></a>`;
            const logoutIcon = document.querySelector('.logout-icon');
            logoutIcon.addEventListener('click', (event) => {
                dataService.logout();
            });
        }       
    }

}

import BaseController from './BaseController.js';
import dataService from '../services/DataService.js';


export default class LoginFormController extends BaseController {

    constructor(element) {
        super(element);
        this.attachEventListener();
    }

    attachEventListener() {

        this.element.addEventListener('submit', async (event) => {
            event.preventDefault();
            const user = {
                username: this.element.querySelector('.form-login-email').value,
                password: this.element.querySelector('.form-login-password').value
            };
            this.publish(this.events.START_LOADING);
            try {
                const data = await dataService.login(user);
                dataService.saveToken(data.accessToken);
                let { next } = dataService.getStringQueries();
                window.location.href = next || '/';
              } catch (error) {
                this.publish(this.events.ERROR, error);
              } finally {
                this.publish(this.events.FINISH_LOADING);
              }
        });

        this.element.querySelectorAll('input').forEach(input => {
          const button = this.element.querySelector('button');
          input.addEventListener('keyup', event => { 

            if (input.validity.valid) {
              input.classList.add('is-success');
              input.classList.remove('is-danger');
            } else {
              input.classList.remove('is-success');
              input.classList.add('is-danger');
            }

            if (this.element.checkValidity()) {
              button.removeAttribute('disabled');
            } else {
              button.setAttribute('disabled', true);
            }
          });
        });
    }

}

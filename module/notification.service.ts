import { Injectable } from '@angular/core';

import { notyHtml } from './constants';

export class NotificationConfig {
    type: string;
    message: string;
    handlers: {
        ok: () => void,
        cancel: () => void
    };
}

@Injectable()
export class NotificationService {

    private html = notyHtml;

    private noty: HTMLElement;

    constructor () {
        this.prepareInstance();
     }

    private getId(): string {
        return 'noty-id' + (+new Date());
    }

    private prepareInstance() {
        this.noty = document.createElement('div');
        this.noty.innerHTML = this.html;
    }

    private hideElements(elements: HTMLElement[]) {
        elements = [].slice.apply(elements, [0]);
        elements.forEach( ele => {
            ele.hidden = true;
        });
    }

    private assignCloseListener(element: HTMLElement) {
        element.querySelector('.noty-cancel').addEventListener('click', () => {
            element.remove();
        });
    }

    private noop() {

    }

    private assignConfirmActionListeners(element: HTMLElement, config: NotificationConfig) {
        config.handlers = config.handlers || <any>({ ok: () => {}, cancel: ()  => {} });
        config.handlers.ok = config.handlers.ok || <any>this.noop;
        config.handlers.cancel = config.handlers.cancel || <any>this.noop;
        element.querySelector('.noty-btn-cancel').addEventListener('click' , () => {
            config.handlers.cancel();
            this.delayRemove(element);
        });
        element.querySelector('.noty-btn-ok').addEventListener('click' , () => {
             config.handlers.ok();
            this.delayRemove(element);
        });
    };

    private delayRemove(element: HTMLElement) {
        setTimeout(() => {
            element.remove();
        });
    }

    show(message: string, msgType?: string) {
        let id: string = this.getId();
        let noty = <HTMLElement>this.noty.cloneNode(true);
        msgType = msgType || 'success';
        if (msgType !== 'success') {
            (<HTMLElement>noty.querySelector('.noty-backdrop')).style.display = 'block';
        }
        (<HTMLElement>noty.querySelector('.noty')).classList.add(msgType);
        noty.querySelector('.noty-message').innerHTML = (message || ' ').split('\\n').join('<br />');
        noty.setAttribute('id', id);
        this.assignCloseListener(noty);
        this.hideElements(<any>noty.querySelectorAll('.noty-buttons'));
        document.body.appendChild(noty);
        if (msgType === 'success') {
            setTimeout(() => {
                noty.remove();
            }, 3000);
        }
    }

    confirm(config: NotificationConfig) {
        let id: string = this.getId();
        let noty = <HTMLElement>this.noty.cloneNode(true);
        (<HTMLElement>noty.querySelector('.noty-backdrop')).style.display = 'block';
        noty.querySelector('.noty-message').innerHTML = (config.message || ' ').split('\\n').join('<br />');
        noty.setAttribute('id', id);
        this.hideElements(<any>noty.querySelectorAll('.noty-cancel'));
        this.assignConfirmActionListeners(noty, config);
        document.body.appendChild(noty);
    }

}

import { NotificationService } from '../notification.service';

describe('NotificationService Test Suite', () => {

    let service: NotificationService;

    beforeEach(() => {
        service = new NotificationService();
         jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
    });

    it('NotificationService constructor invocation should prepare and cache a div element as a property', () => {
        expect(service['noty']).toBeDefined();
        expect((<HTMLElement>service['noty']).innerHTML).toBeDefined();
    });

    it('prepareInstance should create a div element and should persist into one of the property', () => {
        service['noty'] = null;
        expect(service['noty']).toEqual(null);
        service['prepareInstance']();
        expect(service['noty']).toBeDefined();
        expect((<HTMLElement>service['noty']).innerHTML).toBeDefined();
    });

    it('getId method should return unique id on every delayed invocation', () => {
        let idOne: string, idTwo: string;
        idOne = service['getId']();
        setTimeout(() => {
            idTwo = service['getId']();
            expect(idOne).not.toEqual(idTwo);
        });
    });

    it('show method should show notifier', () => {

        let testMsg = 'Test Message';

        service.show(testMsg);

        let allNotyElements: HTMLElement[] = [].slice.call(document.body.querySelectorAll('.noty'), 0);
        let notyElement: HTMLElement = allNotyElements[0];

        expect(allNotyElements.length).toEqual(1);
        expect(notyElement).toBeDefined();
        expect(notyElement.querySelector('.noty-message').textContent.trim()).toEqual(testMsg);
        expect(allNotyElements[1]).toBeUndefined();

    });

    it('success type notification should auto remove after 3sec delay', ((done) => {

        let testMsg = 'Test Message';
        let notyElement: HTMLElement;

        service.show(testMsg);

        setTimeout(() => {
            notyElement = document.body.querySelector('.noty') as HTMLElement;
            expect(notyElement).toBeNull();
            done();
        }, 3000);

    }));

    it('non success type notification should not be auto removed', ((done) => {

        let testMsg = 'Test Message';

        let notyElement: HTMLElement;

        service.show(testMsg, 'warning');

        setTimeout(() => {
            notyElement = document.body.querySelector('.noty') as HTMLElement;
            expect(notyElement).toBeDefined();
            let elem: HTMLElement = <HTMLElement>document.body.querySelector('.noty-cancel');
            elem.click();
            done();
        }, 3000);

    }));

    it('incase of none success type notification backdrop should be displayed', () => {

        let testMsg = 'Test Message', backdrop: HTMLElement;

        service.show(testMsg, 'warning');

        backdrop = document.body.querySelector('.noty-backdrop') as HTMLElement;

        expect(backdrop).toBeDefined();

        let elem: HTMLElement = <HTMLElement>document.body.querySelector('.noty-cancel');

        elem.click();

    });

    it('clicking on cancel icon should remove backdrop', (done) => {

        let testMsg = 'Test Message', backdrop: HTMLElement;

        service.show(testMsg, 'warning');

        backdrop = document.body.querySelector('.noty-backdrop') as HTMLElement;

        expect(backdrop).toBeDefined();

        let elem: HTMLElement = <HTMLElement>document.body.querySelector('.noty-cancel');
        elem.click();

        setTimeout(() => {
            backdrop = document.body.querySelector('.noty-backdrop') as HTMLElement;
            expect(backdrop).toBeNull();
            done();
        });

    });

    it('confirm method should show confirmation dialogue', (done) => {

        let testMsg = 'Test Message', backdrop: HTMLElement;

        let config  = {
            type: 'warning',
            message: testMsg,
            handlers: {
                ok: function ok() {

                },
                cancel: function cancel() {

                }
            }
        };

        spyOn(config.handlers, 'ok');
        spyOn(config.handlers, 'cancel');

        service.confirm(config);

        backdrop = document.body.querySelector('.noty-backdrop') as HTMLElement;

        expect(backdrop).toBeDefined();

        (<HTMLElement>document.body.querySelector('.noty-btn-ok')).click();
        (<HTMLElement>document.body.querySelector('.noty-btn-cancel')).click();

        expect(config.handlers.ok).toHaveBeenCalled();
        expect(config.handlers.cancel).toHaveBeenCalled();

        setTimeout(() => {
            backdrop = document.body.querySelector('.noty-backdrop') as HTMLElement;
            expect(backdrop).toBeNull();
            done();
        });

    });

});

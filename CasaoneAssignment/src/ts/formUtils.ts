import { Validator } from './validator'
import { Rule, ValidationStatus } from './interfaces'
import { httpHelper } from './httpHelper';

export class formUtils {

    validator: Validator;
    form: HTMLFormElement;
    payload: any;

    constructor(form: HTMLFormElement) {
        this.validator = new Validator();
        this.form = form;
    }

    formbind() {
        this.form.addEventListener('focusout', (e) => {
            let tartgetEl = e.target as HTMLInputElement;
            if ((e.target as HTMLInputElement).type === 'text') {
                this.elementValidate(tartgetEl);
            }
        });

        this.form.addEventListener('click', (e) => {
            if ((e.target as HTMLInputElement).type === 'button') {
                e.preventDefault();
                e.stopImmediatePropagation();
                if (this.formValidate()) {
                    this.formSubmit();
                }
                return false;
            }

        });
    }
    formSubmit() {
        let elements = this.form.elements;
        let rc = 1;
        for (var index in elements) {
            let element = elements[index] as HTMLInputElement;
            if (element.type === 'text') {
                let id1 = element.id;
                let selEl = document.getElementById(id1.slice(0, 6) + 1) as HTMLSelectElement
                let conftype = selEl.options[selEl.selectedIndex].text;

                let selEl2 = document.getElementById(id1.slice(0, 6) + 2) as HTMLSelectElement
                let operand = selEl2.options[selEl2.selectedIndex].text;

                let conf: Rule = {
                    'config': conftype,
                    'operand': operand,
                    'value': element.value,
                    'nextLogical': 'And'
                }
                this.payload['rule' + rc++] = conf;
            }
        }

        let url = 'http://www.mocky.io/v2/5df60e3a3400002900e5a4ff'
        httpHelper.httpCall('POST', url, this.payload, (responseText) => {
            let spanEl = document.getElementById('rulemsg');
            if(responseText.status === 'success'){
                spanEl.textContent = "Rules successfully created";
                this.form.reset();
            }
            else{
                //Error handling based on errocases
                spanEl.textContent = responseText.errormsg;
            }
            setTimeout(() => {
                spanEl.textContent = ''
            }, 3000)

        })
    }

    formValidate() {
        let elements = this.form.elements;
        this.payload = {};
        this.form.reset
        let rc = 1;
        for (var index in elements) {
            let element = elements[index] as HTMLInputElement;
            if (element.type === 'text') {
                var ret = this.elementValidate(element);
                if (!ret) {
                    return false;
                }
            }
        }
        return true;
    }
    elementValidate(el: HTMLInputElement) {
        let id1 = el.id;
        let selEl = document.getElementById(id1.slice(0, 6) + 1) as HTMLSelectElement
        let conftype = selEl.options[selEl.selectedIndex].text;
        let errorHolder = document.getElementById(id1).nextSibling.nextSibling;
        errorHolder.textContent = '';
        let ret: ValidationStatus;
        ret = this.validator.validate(conftype, el.value) as ValidationStatus;
        if (ret.status === false) {
            this.formerror(el, ret.errormsg);
            return false
        }
        return true;

    }
    formerror(tartgetEl: HTMLInputElement, errormsg: string) {
        let errorHolder = document.getElementById(tartgetEl.id).nextSibling.nextSibling;
        errorHolder.textContent = errormsg;
    }
}
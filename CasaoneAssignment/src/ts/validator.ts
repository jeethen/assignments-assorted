
import { Component } from './component';
import { Inputs, ZipCode, RentOrAgeOrTenure, OrderType } from './interfaces';

export class Validator {

    comp: Component;
    configdata: any = {}

    constructor() {
        this.comp = new Component();
        this.configdata = this.comp.configData();
    }

    validate(name: string, value: string) {
        let dataset = this.configdata[name];
        let retval = {};
        if (this.isempty(value)) {
            return { "status": false, "errormsg": 'Please enter a non empty value' };
        }
        value = value.trim();
        switch (dataset.type) {
            case "num":
                retval = this.validate_range(dataset, parseInt(value));
                break;
            case "list":
                retval = this.validate_list(dataset, value.split(","));
                break;
            case "text":
                retval = this.validate_text(dataset, value);
                break;
            default:
                console.log('Broken out');
                retval = { "status": false, "errormsg": 'Unknown data type' };
                break;

        }
        return retval;
    }
    validate_range(dataset: RentOrAgeOrTenure, value: number) {
        var status = true,
            errormsg = '';
        if (value <= 0) {
            errormsg = 'Provide a positive number';
            status = false;
        }
        else if (value > dataset.max || value < dataset.min) {
            errormsg = `Please provide value in the range of ${dataset.min} and  ${dataset.max}`;
            status = false;
        }
        return { "status": status, "errormsg": errormsg };

    }
    validate_text(dataset: ZipCode, list: string) {
        let regexp = new RegExp('\d{5}(,\s*\d{5})*');
        return regexp.test(list);
    }
    validate_list(dataset: OrderType, list: Array<string>) {
        var status = true,
            errormsg = '';
        for (var value in list) {
            if (dataset.options.indexOf(value.trim()) === -1) {
                errormsg = `The element ${value} is not valid`;
                status = false;
            }

        }
        return { "status": status, "errormsg": errormsg };
    }

    isempty(value: string) {
        if (typeof (value) === undefined || value === undefined || value === '') {
            return true;
        }
    }
}
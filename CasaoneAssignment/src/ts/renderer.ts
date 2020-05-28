import { Component } from './component';
import { formUtils } from './formUtils';

export class renderer {

    private component: Component;
    config: Array<string> = [];
    ops: Array<string> = [];
    logicalOps: Array<string> = [];
    srCount: number = 0;
    configdata: any = {}
    formutils: formUtils;

    constructor() {
        this.component = new Component();
        this.formutils = new formUtils(document.querySelector('form#ruleform'));
        
    }

    init() {
        this.getData();
        this.bind();
        this.addSubRules(true);
        this.formutils.formbind();
    }

    private bind() {
        // Handles the new rule creation
        let addButton = document.getElementById('addSubrule');
        addButton.addEventListener("click", (e: Event) => {
            if(this.srCount > 4){
                document.getElementById('deny-rules').removeAttribute('class');
                setTimeout(() => {
                    document.getElementById('deny-rules').setAttribute('class', 'hide');
                }, 3000)
            }
            else this.addSubRules();
        });
    }

    addSubRules(defaultrule = false) {
        let sdiv = document.createElement('div');
        let id = 'sub_' + this.srCount;
        sdiv.setAttribute('id', id);
        sdiv.setAttribute('class', 'subrule');

        sdiv.appendChild(this.createSelect(this.config, id + '_1'));
        sdiv.appendChild(this.createSelect(this.ops, id + '_2'));

        let inputEl = document.createElement('input');
        inputEl.setAttribute('id', id + '_3');
        inputEl.setAttribute('class', 'rule-data')
        sdiv.appendChild(inputEl);

        let unitEl = document.createElement('span');
        unitEl.setAttribute('class', 'units')
        unitEl.textContent = '$';
        sdiv.appendChild(unitEl);

        let errorHolder = document.createElement('span');
        errorHolder.textContent = '';
        errorHolder.setAttribute('class', 'error-msg')
        sdiv.appendChild(errorHolder);

        if (!defaultrule) {
            let imgEl = document.createElement('img')
            imgEl.setAttribute('src', "./static/icons8-trash-can-26.png");
            imgEl.setAttribute('id', id+'_del');
            sdiv.appendChild(imgEl);

            imgEl.addEventListener('click', () => { 
                sdiv.parentNode.removeChild(sdiv);
                this.srCount--;
            })
        }

        let formdiv = document.getElementById('inputs');
        formdiv.appendChild(sdiv);
        this.bindSelect(id + '_1', unitEl );
        this.srCount++;
    }

    private createSelect(options: Array<string>, id: string) {
        let sel = document.createElement('select');
        sel.setAttribute('id', id);

        for (const iterator of options) {
            let opt = document.createElement('option');
            opt.text = opt.value = iterator;
            sel.appendChild(opt);
        }

        return sel;
    }

    private getData() {
        let inputs = this.component.configData();
        let operands = this.component.operands();
        this.configdata = inputs;

        for (var types in inputs) {
            this.config.push(types);
        }

        this.ops = operands.arithemticops;
        this.logicalOps = operands.logicalOps;

    }
    private bindSelect(id:string, unitEl:HTMLSpanElement){
        var selEl:HTMLSelectElement = document.getElementById(id) as HTMLSelectElement;
        selEl.addEventListener('change', () =>{
            let operand:string = selEl.options[selEl.selectedIndex].text;
            let dataset = this.configdata[operand]
            unitEl.textContent = dataset.unit;
        })
        

    }

    addRule() {
        //Place holder method to create multiple New rules together
        //Not needed as per the requirement.
        
    }

}
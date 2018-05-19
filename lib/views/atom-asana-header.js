'use babel';

import {
    el, text
}
from 'redom';

// define component
export default class AtomAsanaView {
    // ..how to create it
    constructor() {
        this.options = [];
        this.title = '';
        this.change = null;
    }
    update(target) {
        this.title = target.title;
        this.onChange = target.onChange;
        for (var i = 0; i < target.options.length - 1; i++) {
            this.options.push(
                el('option', {
                    value: target.options[i].id
                }, target.options[i].name)
            );
        }

        return this;
    }

    get(data) {
        return this.update(data).getEl();
    }

    getEl() {
        var selectElement = el(
            'select.project-selector.input-select.input-lg.inline-block',
            this.options
        );

        selectElement.onchange = e => {
            e.preventDefault();

            if (this.onChange) {
                this.onChange(e.target.value);
            }
        }

        return el('div.flex-container.block',
            el('h2.inline-block', this.title),
            selectElement
        );
    }
}

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
        this.config = target.config;
        this.onConfigChange = target.onConfigChange;
        this.onRefresh = target.onRefresh;
        for (var i = 0; i < target.options.length; i++) {
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
        
        var button = el('button.refresh-button.btn.btn-xs',el("span.icon icon-sync"));
        
        button.onclick = e => {
            e.preventDefault();
        
            if (this.onRefresh) {
                this.onRefresh();
            }
        }

        var input = el('input.input-checkbox', {
            type: 'checkbox',
            value: 'now',
            checked: !(this.config && this.config.completed_since)
        });
        
        input.onchange = e => {
            e.preventDefault();
        
            if (this.onConfigChange) {
                this.onConfigChange('completed_since', e.target.checked);
            }
        }

        return el('div.flex-container.block',
            el('h2.inline-block.project-label', this.title),
            selectElement,
            el('div.asana-project-controller',
                el('label.input-label.completed_checkbox', [
                    input,
                    text('Display Completed')
                ]),
                button
            )
        );
    }
}

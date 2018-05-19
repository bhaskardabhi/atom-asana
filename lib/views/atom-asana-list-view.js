'use babel';

import {
    el, text, list
}
from 'redom';

// define component
export default class AtomAsanaListView {
    // ..how to create it
    constructor() {
        this.tasks = [];
        this.onChange = null;
    }
    update(target) {
        this.tasks = target.tasks;
        this.onChange = target.onChange;

        return this;
    }

    get(data) {
        return this.update(data).getEl();
    }

    getEl() {
        var li = [];

        for (var i = 0; i < this.tasks.length - 1; i++) {
            var input = el('input.input-checkbox', {
                type: 'checkbox',
                value: this.tasks[i].id,
                checked: !!this.tasks[i].completed_at
            });

            input.onchange = e => {
                e.preventDefault();

                if (this.onChange) {
                    console.log(e.target.value, e.target.checked);
                    this.onChange(e.target.value, e.target.checked);
                }
            }

            li.push(
                el('li',
                    el('label.input-label.task',
                        input,
                        el('span', null, this.tasks[i].name)
                    )
                )
            );
        }

        return el('ol.list-group', li);
    }
}

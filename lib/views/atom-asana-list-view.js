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
        this.taskStatusChanged = null;
    }
    update(target) {
        this.tasks = target.tasks;
        this.taskStatusChanged = target.taskStatusChanged;

        return this;
    }

    get(data) {
        return this.update(data).getEl();
    }

    getEl() {
        var li = [];

        for (var i = 0; i < this.tasks.length; i++) {
            var input = el('input.input-checkbox', {
                type: 'checkbox',
                value: this.tasks[i].id,
                checked: !!this.tasks[i].completed_at
            });

            input.onchange = e => {
                e.preventDefault();

                if (this.taskStatusChanged) {
                    this.taskStatusChanged(e.target.value, e.target.checked);
                }
            }

            li.push(
                el('li.task-list',
                    el('label.input-label.task',
                        input,
                        el('span', null, this.tasks[i].name)
                    )
                )
            );
        }

        return el('.select-list', el('ol.list-group', li));
    }
}

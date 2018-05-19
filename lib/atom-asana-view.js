'use babel';

import AsanaProvider from './asana-provider';
import {
    el, mount
}
from 'redom';
import AtomAsanaHeader from './views/atom-asana-header';
import AtomAsanaListView from './views/atom-asana-list-view';

export default class AtomAsanaView {

    constructor(serializedState) {
        this.extendDocument();
        // Create root element
        this.element = el('div.atom-asana');
        this.asanaProvider = new AsanaProvider(atom.config.get(
            'atom-asana.key'));
        this.asanaProjects = [];
        this.asanaTasks = [];

        var that = this;

        that.asanaProvider.getAllProjects().then(function(projects) {
            that.asanaProjects = that.asanaProjects.concat(projects);
            that.generateViewForTasks();
        });

        window.x = this;
        window.z = el;
        window.y = AtomAsanaHeader;
    }


    generateViewForTasks() {
        this.element.textContent = "";

        // Add Project selection
        this.element.appendChild(this.generateListViewForProjectSelection());
        this.element.appendChild(this.generateListViewForTasks());
        // this.element.appendChild(this.generateTaskAddForm());

        // Selecting first as selected
        this.projectSelected(
            this.asanaProjects.length ?
            this.asanaProjects[0].id : null
        );
    }

    generateListViewForProjectSelection() {
        var that = this;
        return (new AtomAsanaHeader).get({
            options: this.asanaProjects,
            title: 'Project',
            onChange: function(selectedProjectId) {
                that.projectSelected(selectedProjectId);
            }
        });
    }

    generateListViewForTasks() {
        return el('#task-container', {
            style: {
                height: (atom.window.innerHeight / 2) + 'px',
            }
        }, this.generateTaskList());
    }

    generateTaskList() {
        var that = this;

        return (new AtomAsanaListView).get({
            tasks: that.asanaTasks,
            onChange: function(taskId, isChecked) {
                that.TaskStatusChanged(taskId, isChecked);
            }
        });
    }

    generateTaskAddForm() {
        return document.addElement('div', {
            child: function() {
                return [
                    document.addElement('label', {
                        class: 'input-label'
                    }),
                    document.addElement('input', {
                        class: 'input-text'
                    }),
                    document.addElement('button', {
                        class: 'btn'
                    })
                ];
            }
        });
    }

    projectSelected(projectID) {
        var that = this;
        console.log(projectID);
        that.asanaProvider.getAllProjectTasks(projectID)
            .then(function(tasks) {
                that.asanaTasks = tasks;
                that.reRenderListViewForTasks();
            });
    }

    TaskStatusChanged(taskID, status) {
        this.asanaProvider.updateTask(taskID, {
            completed: status
        });
    }

    reRenderListViewForTasks() {
        document.getElementById("task-container").innerHTML = "";
        document.getElementById("task-container").appendChild(this.generateTaskList());
    }

    // Returns an object that can be retrieved when package is activated
    serialize() {}

    // Tear down any state and detach
    destroy() {
        this.element.remove();
    }

    getElement() {
        return this.element;
    }

    extendDocument() {
        this.getExtenderOfDocument().prototype.appendToElement = function(
            ele, callback) {
            ele.appendChild(callback());
            return ele;
        };
        this.getExtenderOfDocument().prototype.addElement = function(
            element, attr) {
            var ele = this.createElement(element);

            if (attr && attr.child) {
                ele.appendChild(attr.child);
            }

            return ele;
        };
    }

    getExtenderOfDocument() {
        if (typeof HTMLDocument !== 'undefined') {
            return HTMLDocument;
        } else {
            return Document;
        }
    }

}

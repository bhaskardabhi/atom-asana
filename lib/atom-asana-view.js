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
        this.asanaProvider = new AsanaProvider(atom.config.get('atom-asana.key'));
        this.asanaProjects = [];
        this.asanaTasks = [];
        this.asanaTaskListConfig = {};
        
        if(!atom.config.get('atom-asana.displayCompletedByDefault')){
            this.asanaTaskListConfig.completed_since = 'now'
        }
        
        this.selectedAsanaProject = null;

        var that = this;

        that.asanaProvider.getAllProjects().then(function(projects) {
            that.asanaProjects = that.asanaProjects.concat(projects);
            that.generateViewForTasks();
        });
    }
    
    
    refreshListView(){
        var that = this;
        if(that.selectedAsanaProject){
            that.projectSelected(that.selectedAsanaProject);
        }
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
            config: this.asanaTaskListConfig,
            title: 'Project',
            onChange: function(selectedProjectId) {
                that.projectSelected(selectedProjectId);
            },
            onConfigChange: function(slug, value) {
                if (slug == 'completed_since') {
                    if(value){
                        delete that.asanaTaskListConfig.completed_since;
                    } else {
                        that.asanaTaskListConfig.completed_since = 'now';
                    }
                    that.projectSelected(that.selectedAsanaProject);
                }
            },
            onRefresh: function(){
                that.refreshListView();
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
            taskStatusChanged: function(taskId, status) {
                that.TaskStatusChanged(taskId, status, function(){
                    that.projectSelected(that.selectedAsanaProject);
                });
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
        
        that.selectedAsanaProject = projectID;
        that.asanaProvider.getAllProjectTasks(projectID, that.asanaTaskListConfig)
            .then(function(tasks) {
                that.asanaTasks = tasks;
                that.reRenderListViewForTasks();
            });
    }

    TaskStatusChanged(taskID, status, callback) {
        this.asanaProvider.updateTask(taskID, {
            completed: status
        },callback);
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

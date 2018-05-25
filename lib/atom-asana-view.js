'use babel';

import AsanaProvider from './asana-provider';
import {
    el, mount
}
from 'redom';
import AtomAsanaHeader from './views/atom-asana-header';
import AtomAsanaListView from './views/atom-asana-list-view';
import {
    dot
}
from 'dot';
import React from 'react';
import ReactDOM from 'react-dom';
var dots = require("dot").process({
    path: __dirname + "/views"
});


export default class AtomAsanaView extends React.Component  {

    // constructor(props) {
    //     super(props);
    //     // Create root element
    //     var that = this;
    //     this.element = document.createElement('div');
    //     this.element.setAttribute("id", "test");
    // 
    //     this.asanaProvider = new AsanaProvider(
    //         atom.config.get('atom-asana.key')
    //     );
    // 
    //     this.asanaProjects = [];
    //     this.asanaTasks = [];
    // 
    //     this.header = React.createElement(AtomAsanaHeader, {
    //         projects: that.asanaProjects
    //     });
    // 
    //     that.asanaProvider.getAllProjects().then(function(projects) {
    //         that.asanaProjects = that.asanaProjects.concat(projects);
    //         that.element = document.createElement('div');
    //         that.element.setAttribute("id", "test");
    //         // that.header.setProps(that.asanaProjects);
    //     });
    // 
    //     ReactDOM.render(
    //         that.header,
    //         that.element
    //     );
    // }

    projectSelected(projectID) {
        var that = this;

        that.asanaProvider.getAllProjectTasks(projectID)
            .then(function(tasks) {
                that.asanaTasks = tasks;
            });
    }

    TaskStatusChanged(taskID, status) {
        this.asanaProvider.updateTask(taskID, {
            completed: status
        });
    }

    // serialize() {}
    // 
    // destroy() {
    //     this.element.remove();
    // }

    render() {
        return [
            "<div class='flex-container block'>",
                "<h2>Project</h2>",
            "</div>",
        ];
        // Change this to div.childNodes to support multiple top-level nodes
        return this.element; 
    }

}

'use babel';

import {
    el, text
}
from 'redom';
import React from 'react';
import ReactDOM from 'react-dom';

// define component
export default class AtomAsanaView extends React.Component {
    render() {
        var options = this.props.projects;
        for(var i = 0; i < this.props.projects.length - 1;i++){
            options.push(
                "<option value="+this.props.projects[i].id+" "+(this.props.projects[i].id == this.props.selectedProject ? 'selected':'')+">"+this.props.projects[i].name+"</option>"
            );
        }
        return [
            "<div class='flex-container block'>",
                "<h2>Project</h2>",
                "<select value="+this.props.selectedProject+" class='project-selector input-select input-lg inline-block'>",
                    options.join(" "),
                "</select>",
                "<label class='input-label completed_checkbox'>",
                    "<input class='input-checkbox' type='checkbox' value='now'>",
                    "Display Completed",
                "</label>",
            "</div>",
        ];
    }
}

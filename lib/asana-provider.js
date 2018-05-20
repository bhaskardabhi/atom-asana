'use babel';

var Asana = require('asana');

export default class AsanaProvider {

    constructor(token) {
        this.token = token;
        this.header = new Headers({
            "Authorization": "Bearer " + token
        });
        this.client = Asana.Client.create().useAccessToken(token);
        console.log(token);
    }

    getUser() {
        var that = this;
        return new Promise(function(resolve, reject) {
            fetch('https://app.asana.com/api/1.0/users/me', {
                    headers: that.header
                })
                .then(function(response) {
                    return response.json();
                }).then(function(json) {
                    resolve(json.data);
                }).catch(function(ex) {
                    reject(ex);
                });
        });
    }

    getTasksByWorkspace(workspaceID, assignID) {
        var that = this;

        return new Promise(function(resolve, reject) {
            fetch('https://app.asana.com/api/1.0/tasks?workspace=' +
                    workspaceID + '&assignee=' + assignID, {
                        headers: that.header
                    })
                .then(function(response) {
                    return response.json();
                }).then(function(json) {
                    resolve(json.data);
                }).catch(function(ex) {
                    reject(ex);
                });
        });
    }

    getAllProjects() {
        var that = this;

        return new Promise(function(resolve, reject) {
            fetch('https://app.asana.com/api/1.0/projects', {
                    headers: that.header
                })
                .then(function(response) {
                    return response.json();
                }).then(function(json) {
                    resolve(json.data);
                }).catch(function(ex) {
                    reject(ex);
                });
        });
    }

    getAllProjectTasks(projectID, data) {
        var that = this;

        return new Promise(function(resolve, reject) {
            fetch('https://app.asana.com/api/1.0/projects/' +
                    projectID +
                    '/tasks?opt_fields=name,completed_at&' + that.getObjectToUrlParam(
                        data), {
                        headers: that.header
                    })
                .then(function(response) {
                    return response.json();
                }).then(function(json) {
                    resolve(json.data);
                }).catch(function(ex) {
                    reject(ex);
                });
        });
    }

    updateTask(taskID, data, callback) {
        var that = this;
        return new Promise(function(resolve, reject) {
            fetch('https://app.asana.com/api/1.0/tasks/' + taskID, {
                    headers: that.header,
                    method: 'put',
                    body: JSON.stringify({
                        data: data
                    })
                })
                .then(function(response) {
                    return response.json();
                    if(callback){
                        callback();
                    }
                }).then(function(json) {
                    resolve(json.data);
                }).catch(function(ex) {
                    reject(ex);
                });
        });
    }

    getAllWorkspaces() {
        var that = this;

        return new Promise(function(resolve, reject) {
            that.client.users.me()
                .then(function(user) {
                    resolve(user.workspaces);
                }, function(error) {
                    reject(error);
                });
        });
    }

    getObjectToUrlParam(dataObject) {
        if(!dataObject){
            return null;
        }
        return Object.keys(dataObject).map(function(key) {
            return key + '=' + dataObject[key];
        }).join('&');
    }
}

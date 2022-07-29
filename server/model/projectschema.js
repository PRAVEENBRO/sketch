const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    projectID: { type: String, default: Math.floor(Math.random() * 10000000).toString(), trim: true },
    projectname: { type: String, default: "", trim: true },
    projectstartdate: { type: Date, default: new Date().toISOString() },
    projectmanager: { type: String, default: "", },
    tasks: [{
        tasksname: { type: String, default: "" },
    }],
    status: { type: String, default: 'pending' },
});


module.exports = mongoose.model('projects', ProjectSchema);
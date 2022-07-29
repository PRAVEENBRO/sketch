const express = require('express');
const projectRoutes = express.Router();
const { createProject, readAllProject, readProject, updateProject, addtask, readTask, UpdateTask } = require('../controller/projectcontroller.js')
const Authenticate = require('../middleware/authentication')
projectRoutes.post('/createProject', Authenticate, createProject);
projectRoutes.get('/readAllProject', Authenticate, readAllProject);
projectRoutes.post('/readProject', Authenticate, readProject);
projectRoutes.put('/updateProject', Authenticate, updateProject);

projectRoutes.post('/addtask', Authenticate, addtask);
projectRoutes.post('/readTask', Authenticate, readTask);
projectRoutes.put('/UpdateTask', Authenticate, UpdateTask);


module.exports = projectRoutes
const ProjectSchema = require('../model/projectschema');


// =========================== PROJECT CRUD ===========================//

const createProject = async (req, res, next) => {
    try {
        const { projectname, projectstartdate, projectmanager } = req.body
        // console.log(projectname, projectstartdate, projectmanager)
        const repproject = await ProjectSchema.findOne({ projectname: projectname });
        // console.log(repproject, "repproject")
        if (!repproject) {
            const newproject = new ProjectSchema({ projectname, projectmanager });
            newproject.save().then(() => {
                res.status(200).json({ error: false, message: "Project added", data: null });
            });
        } else {
            res.status(200).json({ error: false, message: "Project name already exist", data: null });
        }
    } catch (err) {
        res.status(200).json({ error: true, message: "failed", data: null });
        next(err)
    }

}

const readAllProject = async (req, res, next) => {
    try {
        const Projectshow = await ProjectSchema.find({});
        if (Projectshow) {
            res.status(200).send(Projectshow)
        } else {
            res.status(404).json({ error: true, message: "project not found", data: null })
        }
    } catch (err) {
        res.status(500).json({ error: true, message: "failed", data: null })

        nexy(err)
    }
}

const readProject = async (req, res, next) => {
    const { projectID } = req.body
    try {
        const Projectshow = await ProjectSchema.findOne({ projectID: projectID });
        if (Projectshow) {
            res.status(200).send(Projectshow)
        } else {
            res.status(200).json({ error: true, message: "project not found", data: null })
        }

    } catch (err) {
        res.status(500).json({ error: true, message: "failed", data: null })
        nexy(err);
    }
}

const updateProject = async (req, res, next) => {
    const { projectID, projectname, projectmanager, status } = req.body

    const projectdetails = await ProjectSchema.updateOne({ projectID: projectID }, { $set: { projectname, projectmanager, status } })

    if (projectdetails.modifiedCount && projectdetails.matchedCount) {
        res.status(200).json({ error: false, message: "projected updated", data: null })
    } else {
        res.status(200).json({ error: true, message: "projected update failed", data: null })
    }
}

// =========================== TASK CRUD ===========================//



const addtask = async (req, res, next) => {
    try {
        const { projectID, task } = req.body
        console.log(projectID, task);
        // const addto = await ProjectSchema.findOne({ projectID: projectID })
        const repproject = await ProjectSchema.updateOne({ projectID: projectID }, { $push: { 'tasks': { 'tasksname': task } } });
        console.log(repproject);
        if (repproject.modifiedCount && repproject.matchedCount) {
            res.status(200).json({ error: false, message: "task added successfilly", data: null });
        } else {
            res.status(200).json({ error: false, message: "task add failed", data: null });
        }


    } catch (err) {
        res.status(500).json({ error: true, message: "failed", data: null });
        next(err)
    }

}

const readTask = async (req, res, next) => {
    const { projectID } = req.body;
    console.log(projectID)
    const gettasks = await ProjectSchema.findOne({ projectID: projectID }, {})
    if (gettasks) {
        res.status(200).json({ error: true, message: "task found", data: gettasks['tasks'] })
    } else {
        res.status(200).json({ error: true, message: "no task found", data: null })
    }
}

const UpdateTask = async (req, res, next) => {
    const { projectID, taskid, task } = req.body;
    console.log(projectID, taskid, task);

    const updatetasks = await ProjectSchema.updateOne({ projectID: projectID, 'tasks': { $elemMatch: { "_id": taskid } } }, { $set: { 'tasks.$.tasksname': task } });

    if (updatetasks.modifiedCount && updatetasks.matchedCount) {
        res.status(200).json({ error: false, message: "task updated", data: null })
    } else {
        res.status(200).json({ error: true, message: "task update failed", data: null })
    }

}

module.exports = {
    createProject, readAllProject, readProject, updateProject,
    addtask, readTask, UpdateTask
};

const Task = require("./model")

const services = {}

services.add_task = async (payload, context)=>{
    try {
        const task = await Task.create({userID: context.req.decodedToken.id, ...payload});
        return  task
    } catch (error) {
        console.error(error.message);
        throw new Error(error.message)
    } 
}

services.update_task = async (updates, context)=>{
    try {
        const taskID = updates.id
        delete updates.id
        const result = await Task.update(updates, {
            where: {
                userID: context.req.decodedToken.id,
                id: taskID
            }
        });

       if (result[0] === 0) throw new Error('Task not found or already up-to-date');

       //get updated task
       const updatedTask = await Task.findOne({
            where: { 
                userID: context.req.decodedToken.id,
                id: taskID
            },
            attributes: ["id", "userID", "title", "description", "dueDate", "priority", "status", "completed" ]
        });

        return  updatedTask.dataValues
    } catch (error) {
        console.error(error.message);
        throw new Error(error.message)
    } 
}


services.get_tasks = async (context)=>{
    try {
        const tasks = await Task.findAll({
            where: { userID: context.req.decodedToken.id}
        });
        return  {tasks: tasks}
    } catch (error) {
        console.error(error.message);
        throw new Error(error.message)
    }   
}

services.get_task = async (payload, context)=>{
    try {
        const task = await Task.findOne({
            where: { 
                userID: context.req.decodedToken.id,
                id: payload.id
            },
            attributes: ["id", "userID", "title", "description", "dueDate", "priority", "status" ]
        });
        if (!task) throw new Error('Task not found')
        return  task.dataValues
    } catch (error) {
        console.error(error.message);
        throw new Error(error.message)
    }   
}

services.delete_task = async (payload, context)=>{
    try {
        
        const task = await Task.destroy({
            where: { 
                userID: context.req.decodedToken.id,
                id: payload.id
            }
        })

        if(task == 0) throw new Error("task doesnt exist")
        return  {message: "task successfully deleted"}
    } catch (error) {
        console.error(error.message);
        throw new Error(error.message)
    }   
}


module.exports = services
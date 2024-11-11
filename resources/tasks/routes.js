const taskServices = require('./services')

const taskSchemas = {
  mutation: `
    add_task(title: String!, description: String!, dueDate: String, priority: String, status: String, completed: String): Task
    update_task(id: ID!, title: String, description: String, dueDate: String, priority: String, status: String, completed: String): Task
    delete_task(id: ID!): Success
  `,
query: `
  get_tasks: Tasks
  get_task(id: ID!): Task
  `
}


const taskResolvers = {
  Mutation:{
    add_task: async (payload, context) => {
      try {
        return await taskServices.add_task(payload, context)
      } catch (error) {
        throw new Error(error.message);
      }
    },

    update_task: async (payload, context) => {
      try {
        return await taskServices.update_task(payload, context)
      } catch (error) {
        throw new Error(error.message);
      }
      
    },

    delete_task: async(payload, context)=>{
      try {
        return await taskServices.delete_task(payload, context)
      } catch (error) {
        throw new Error(error.message);
      }
    }
  },

  Query: {
    get_tasks: async(payload, context)=>{
      try {
        return await taskServices.get_tasks(context)
      } catch (error) {
        throw new Error(error.message);
      }
    },

    get_task: async(payload, context)=>{
      try {
        return await taskServices.get_task(payload, context)
      } catch (error) {
        throw new Error(error.message);
      }
    }
  }

};

module.exports = {taskSchemas, taskResolvers};

// 
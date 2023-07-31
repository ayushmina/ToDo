let universalFunctions = require("../utils/universalFunctions");

let Joi = require("joi");

let tasks = [];

function findTaskById(id) {
  return tasks.find(task => task.id === id);
}

let curd = {

  createTask: async function (req, res) {
    try {
      const { title, description } = req.body;


      const schema = Joi.object().keys({
        
        title: Joi.string().trim().required(),
        
        description: Joi.string().trim().required()

      })


      await universalFunctions.validateRequestPayload(req.body, res, schema)

      const newTask = {
        id: tasks.length + 1,
        title,
        description,
        completed: false,
      };

      tasks.push(newTask);


      return universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "task add Successfull",
          data: newTask,
        },
        res
      )
    }
    catch (error) {
      return universalFunctions.sendError(error, res)
    }
  },
  getTaskkId: async function (req, res) {
    try {

      const taskId =  req.body.id;
      
      console.log(taskId,"here is taskId");

      const task = findTaskById(taskId);
      
      if (task) {
        return universalFunctions.sendSuccess(
          {
            statusCode: 200,
            message: "get task Successfull",
            data: task,
          },
          res
        )
      }
      else {
        return universalFunctions.sendSuccess(
          {
            statusCode: 404,
            message: "Task not found",
            data: task,
          },
          res
        )
      }
    } catch (error) {
      return universalFunctions.sendError(error, res)
    }
  },
  gettasks: async function (req, res) {
    try {
      if (tasks.length > 0) {
        return universalFunctions.sendSuccess(
          {
            statusCode: 200,
            message: "get tasks Successfull",
            data: tasks,
          },
          res
        )
      } else {
        return universalFunctions.sendSuccess(
          {
            statusCode: 200,
            message: "no tasks Successfull",
            data: tasks,
          },
          res
        )
      }


    } catch (error) {
      return universalFunctions.sendError(error, res)
    }
  },
  deleteTask : async function (req, res) {
    try {
      const taskId =  req.body.id;
      
      console.log(taskId,"here is taskId");

      const taskIndex = tasks.findIndex(task => task.id === taskId);

      if (taskIndex !== -1) {

        tasks.splice(taskIndex, 1);
        return universalFunctions.sendSuccess(
          {
            statusCode: 200,
            message: "Task not found",
            data: taskIndex,
          },
          res
        )

      } else {
        return universalFunctions.sendSuccess(
          {
            statusCode: 400,
            message: "Task not found",
            data: taskIndex,
          },
          res
        )
      }

    } catch (error) {
      return universalFunctions.sendError(error, res)
    }


  },
  updateTask: async function (req, res) {
    try {
      const taskId =  req.body.id;
      const task = findTaskById(taskId);

      if (!task) {
        return universalFunctions.sendSuccess(
          {
            statusCode: 200,
            message: "no task found",
            data: task,
          },
          res
        )
      }

      const { title, description, completed } = req.body;

      if (title) task.title = title;
      if (description) task.description = description;
      if (completed !== undefined) task.completed = completed;

      return universalFunctions.sendSuccess(
        {
          statusCode: 400,
          message: "Task  update ",
          data: task,
        },
        res
      )

    } catch (error) {
      return universalFunctions.sendError(error, res)
    }
  }

}

module.exports = curd;



const Task = require("../models/taskModel")
const ErrorHandler = require("../utilities/errorHandler")

exports.addTask = async (req, res, next) => {
    try {
        const user = req.user
        req.body.createdBy = user._id
        const task = await Task.create(req.body)
        if(task && task._id){
            res.json({
                success: true,
                data: task
            })
        }else{
          return next(new ErrorHandler("Failed to create task"))
        }
    } catch (error) {
        return next(error)
    }
}


exports.getTasks = async (req, res, next) => {
  try {
    const { status, priority, assignedTo, sortBy, sortOrder = 'asc', page = 1, limit = 10 } = req.query;

    let filter = {};
    const user = req.user
    if(req.user !== 'admin'){
      filter.createdBy = user._id
    }
    
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (assignedTo) filter.assignedTo = assignedTo;  
    
    let sort = {};
    if (sortBy) {
      sort[sortBy] = sortOrder === 'desc' ? -1 : 1; 
    }

    const skip = (page - 1) * limit;
    
    const tasks = await Task.find(filter)
      .populate('createdBy')
      .populate('assignedTo')
      .sort(sort)
      .skip(skip)
      .limit(Number(limit));

    const totalTasks = await Task.countDocuments(filter);

    res.json({
      success: true,
      data: tasks,
      total: totalTasks,
      page: Number(page),
      totalPages: Math.ceil(totalTasks / limit),
    });
  } catch (error) {
    return next(error);
  }
};


exports.updateTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, { new: true });
    if (!updatedTask) {
      return next(new ErrorHandler("Task not found", 404));
    }
    return res.json({
      success: true,
      task: updatedTask,
    });
  } catch (error) {
    return next(error);
  }
};


exports.deleteTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const deletedTask = await Task.findByIdAndDelete(taskId);
    if (!deletedTask) {
      return next(new ErrorHandler("Task not found", 404));
    }
    return res.json({
      success: true,
      message: 'Task deleted successfully',
    });
  } catch (error) {
    return next(error);
  }
};
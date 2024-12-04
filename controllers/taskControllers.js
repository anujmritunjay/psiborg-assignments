const Task = require("../models/taskModel")
const ErrorHandler = require("../utilities/errorHandler")
const User = require('../models/userModel')
const moment = require('moment'); 

exports.addTask = async (req, res, next) => {
  try {
    const user = req.user
    req.body.createdBy = user._id
    const task = await Task.create(req.body)
    if (task && task._id) {
      res.json({
        success: true,
        data: task
      })
    } else {
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
    if (req.user !== 'admin') {
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


exports.assignTaskToUser = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const { userId } = req.body;
    const currUser = req.user

    const task = await Task.findById(taskId);
    if (!task) {
      return next(new ErrorHandler('Task not found', 404));
    }

    const user = await User.findOne({ _id: userId, team: currUser.team }); // Assuming the User model is imported
    if (!user) {
      return next(new ErrorHandler('User not found', 404));
    }

    task.assignedTo = userId;
    await task.save();

    res.json({
      success: true,
      message: 'Task assigned successfully',
    });
  } catch (error) {
    return next(error);
  }
};

exports.getAssignedTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ assignedTo: { $ne: null }, createdBy: req.user._id });
    return res.status(200).json({
      success: true,
      tasks: tasks || [],
    });
  } catch (error) {
    return next(error);
  }
};


exports.getTaskAnalytics = async (req, res, next) => {
  try {
    const { userId } = req.query; 
    const currentDate = moment();

    const aggregateQuery = [
      {
        $project: {
          status: 1,
          due_date: 1,
          completed: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] },
          pending: { $cond: [{ $eq: ["$status", "not started"] }, 1, 0] },
          inProgress: { $cond: [{ $eq: ["$status", "in progress"] }, 1, 0] },
          overdue: {
            $cond: [
              {
                $and: [
                  { $lt: ["$due_date", currentDate.toDate()] },
                  { $ne: ["$status", "completed"] },
                ],
              },
              1,
              0,
            ],
          },
        },
      },
      {
        $group: {
          _id: null,
          completed: { $sum: "$completed" },
          pending: { $sum: "$pending" },
          inProgress: { $sum: "$inProgress" },
          overdue: { $sum: "$overdue" },
        },
      },
    ];

    if (userId) {
      aggregateQuery.unshift({
        $match: { assignedTo: userId },
      });
    }

    const analytics = await Task.aggregate(aggregateQuery);

    return res.status(200).json({
      success: true,
      analytics: analytics.length > 0 
        ? analytics[0] 
        : { completed: 0, pending: 0, inProgress: 0, overdue: 0 },
    });
  } catch (error) {
    return next(error);
  }
};



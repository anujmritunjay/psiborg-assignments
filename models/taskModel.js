const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the Task Schema
const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'], 
        required: true,
    },
    status: {
        type: String,
        enum: ['not started', 'in progress', 'completed'],
        default: 'not started',
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
}, {versionKey: false, timestamps: true});

// Create the Task Model
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;

const mongoose = require('mongoose');

var employeeSchema = new mongoose.Schema({
    empid: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String    
    },
    email: {
        type: String
    },
    age: {
        type: String
    },
    departmentId: {
        type: String
    }
});

var departmentSchema = new mongoose.Schema({
    deptId: {
        type: String
    },
    Name: {
        type: String
    }
});

mongoose.model('Employee', employeeSchema);
mongoose.model('Department', departmentSchema);

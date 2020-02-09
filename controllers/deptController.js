const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Department = mongoose.model('Department');

router.get('/', (req, res) => {
    res.render("employee/addOrEditDept", {
        viewTitle: "Insert Department"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var dept = new Department();
    console.log(req.body)
    dept.deptId = req.body.deptId;
    dept.Name = req.body.Name;
    dept.save((err, doc) => {
        if (!err)
            res.redirect('dept/list');
        else {
            console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    console.log(req.body)
    Department.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        console.log(doc)
        if (!err) { res.redirect('dept/list'); }
        else {
            console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    Department.find((err, docs) => {
        if (!err) {
            res.render("employee/listDept", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving employee list :' + err);
        }
    });
});




router.get('/:id', (req, res) => {
    Department.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("employee/addOrEditDept", {
                viewTitle: "Update Department",
                dept: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Department.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/dept/list');
        }
        else { console.log('Error in employee delete :' + err); }
    });
});

module.exports = router;
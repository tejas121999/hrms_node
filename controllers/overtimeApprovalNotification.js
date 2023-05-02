const { OvertimeApprovalNotification,OvertimeNotification } = require('../models')
const model = require('../models');

// Overtime approval notification API  

exports.getOvertimeApprovalNotification = async (req, res) => {
    try {
        var overtimeApprovalNotification = await OvertimeApprovalNotification.findAndCountAll({
            where: {
                owner_id: req.body.owner_id,
                isDeleted : req.body.isDeleted
            },
            include: [
                {
                    model: model.Department,
                    as: 'approval_notification',
                    subQuery: false,
                    attributes: [
                        'department_name',
                        "manager_id"
                    ]
                }
            ]
        })

        if (!overtimeApprovalNotification) {
            return res.status(404).json({
                message: "Something went wrong"
            })
        } else {
            return res.status(200).json({
                message: "Success",
                overtimeApprovalNotification
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Serever error",
            error
        })
    }
}

exports.addOvertimeApprovalNotification = async (req, res) => {
    try {
        const { data } = req.body
        var overtimeApprovalNotification = await OvertimeApprovalNotification.bulkCreate(data)
    
        if (!overtimeApprovalNotification) {
            return res.status(404).json({
                message: "overtime approval Notification failed to create"
            })
        } else {
            return res.status(200).json({
                message: "created",
                overtimeApprovalNotification
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Serever error",
            error
        })
    }
}

exports.updateOvertimeApprovalNotification = async (req, res) => {
    try {
        const { id,data } = req.body
        var overtimeApprovalNotification = await OvertimeApprovalNotification.update(
            data,
            {
                where: {
                    id: id
                }
            }
        )
        if (!overtimeApprovalNotification) {
            return res.status(404).send({
                message: "Overtime Approval Notification Fail to Update"
            })
        } else {
            return res.status(200).send({
                message: "Overtime Approval Notification updated",
                overtimeApprovalNotification
            })
        }
    } catch (error) {
        return res.status(500).send({
            message: "Server Error",
            error
        })
    }
}

exports.deleteOvertimeApprovalNotification = async (req, res) => {
    try {
        const data = await OvertimeApprovalNotification.findOne({ where: { id: req.body.id } })
        if (!data) {
            return res.status(404).json({
                message: "not found"
            })
        } else {
            OvertimeApprovalNotification.update({
                isDeleted: req.body.isDeleted
            }, {
                where: {
                    id: req.body.id
                }
            }).then((_) => {
                res.status(200).send({
                    message: "Overtime Approval Notification Delete",
                    // data
                })
            })
        }
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
}


// Overtime_notification API 
exports.getOvertimeNotification = async (req, res) => {
    try {
        var overtimeNotification = await OvertimeNotification.findAndCountAll({
            where: {
                owner_id: req.body.owner_id,
                isDeleted : req.body.isDeleted
            },
            include: [
                {
                    model: model.Department,
                    as: 'overtime_notification',
                    subQuery: false,
                    attributes: [
                        'department_name',
                        "manager_id"
                    ]
                }
            ]
        })

        if (!overtimeNotification) {
            return res.status(404).json({
                message: "Something went wrong"
            })
        } else {
            return res.status(200).json({
                message: "Success",
                overtimeNotification
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Serever error",
            error
        })
    }
}

exports.addOvertimeNotification = async (req, res) => {
    try {
        const { data } = req.body
        var overtimeNotification = await OvertimeNotification.bulkCreate(data)
    
        if (!overtimeNotification) {
            return res.status(404).json({
                message: "failed to create"
            })
        } else {
            return res.status(200).json({
                message: "created",
                overtimeNotification
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Serever error",
            error
        })
    }
}


exports.updateOvertimeNotification = async (req, res) => {
    try {
        const { id,data } = req.body
        var overtimeNotification = await OvertimeNotification.update(
            data,
            {
                where: {
                    id: id
                }
            }
        )
        if (!overtimeNotification) {
            return res.status(404).send({
                message: "Fail to Update"
            })
        } else {
            return res.status(200).send({
                message: "updated",
                overtimeNotification
            })
        }
    } catch (error) {
        return res.status(500).send({
            message: "Server Error",
            error
        })
    }
}

exports.deleteOvertimeNotification = async (req, res) => {
    try {
        const data = await OvertimeNotification.findOne({ where: { id: req.body.id } })
        if (!data) {
            return res.status(404).json({
                message: "not found"
            })
        } else {
            OvertimeNotification.update({
                isDeleted: req.body.isDeleted
            }, {
                where: {
                    id: req.body.id
                }
            }).then((_) => {
                res.status(200).send({
                    message: "Delete",
                    // data
                })
            })
        }
    } catch (error) {
        return res.status(500).json({
            message:"Server error",
            error
        })
    }
}

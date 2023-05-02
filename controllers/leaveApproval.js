const { LeaveApproval,LeaveEncashApplication,LeaveEncashApproval,LeaveApplicationNotification,LeaveApprovalNotification,LeavePendingNotification,LeaveEncashAppovalNotification   } = require('../models')
const model = require('../models');
const leaveApplicationNotification = require('../models/leaveApplicationNotification');
const leaveEncashApplication = require('../models/leaveEncashApplication');

// Approval :-
// leave_approval
exports.getLeaveApproval = async (req, res) => {
    try {
        var leaveApproval = await LeaveApproval.findAndCountAll({
            where: {
                owner_id: req.body.owner_id,
                isDeleted : req.body.isDeleted
            },
            include: [
                {
                    model: model.Department,
                    as: 'leave_approval',
                    subQuery: false,
                    attributes: [
                        'department_name',
                        "manager_id"
                    ]
                }
            ]
        })

        if (!leaveApproval) {
            return res.status(404).json({
                message: "Something went wrong"
            })
        } else {
            return res.status(200).json({
                message: "Success",
                leaveApproval
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Success",
            error
        })
    }
}

exports.addLeaveApproval = async (req, res) => {
    try {
        const { data } = req.body
        var leaveApproval = await LeaveApproval.bulkCreate(data)
    
        if (!leaveApproval) {
            return res.status(404).json({
                message: "failed to create"
            })
        } else {
            return res.status(200).json({
                message: "created",
                leaveApproval
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Success",
            error
        })
    }
}

exports.updateLeaveApproval = async (req, res) => {
    try {
        const { id,data } = req.body
        var leaveApproval = await LeaveApproval.update(
            data,
            {
                where: {
                    id: id
                }
            }
        )
        if (!leaveApproval) {
            return res.status(404).send({
                message: "Fail to Update"
            })
        } else {
            return res.status(200).send({
                message: "updated",
                leaveApproval
            })
        }
    } catch (error) {
        return res.status(500).send({
            message: "Server Error",
            error
        })
    }
}

exports.deleteLeaveApproval = async (req, res) => {
    try {
        const data = await LeaveApproval.findOne({ where: { id: req.body.id } })
        if (!data) {
            return res.status(404).json({
                message: "not found"
            })
        } else {
            LeaveApproval.update({
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
            error
        })
    }
}


// leave_encash_application API   

exports.addLeaveEncashApplication = async (req, res) => {
    try {
        const { data } = req.body
        var leaveEncashApplication = await LeaveEncashApplication.bulkCreate(data)
    
        if (!leaveEncashApplication) {
            return res.status(404).json({
                message: "failed to create"
            })
        } else {
            return res.status(200).json({
                message: "created",
                leaveEncashApplication
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Success",
            error
        })
    }
}

exports.getLeaveEncashApplication = async (req, res) => {
    try {
        var leaveEncashApplication = await LeaveEncashApplication.findAndCountAll({
            where: {
                owner_id: req.body.owner_id,
                isDeleted : req.body.isDeleted
            },
            include: [
                {
                    model: model.Department,
                    as: 'leave_encash_application',
                    subQuery: false,
                    attributes: [
                        'department_name',
                        "manager_id"
                    ]
                }
            ]
        })

        if (!leaveEncashApplication) {
            return res.status(404).json({
                message: "Something went wrong"
            })
        } else {
            return res.status(200).json({
                message: "Success",
                leaveEncashApplication
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Success",
            error
        })
    }
}

exports.updateLeaveEncashApplication = async (req, res) => {
    try {
        const { id,data } = req.body
        var leaveEncashApplication = await LeaveEncashApplication.update(
            data,
            {
                where: {
                    id: id
                }
            }
        )
        if (!leaveEncashApplication) {
            return res.status(404).send({
                message: "Fail to Update"
            })
        } else {
            return res.status(200).send({
                message: "updated",
                leaveEncashApplication
            })
        }
    } catch (error) {
        return res.status(500).send({
            message: "Server Error",
            error
        })
    }
}

exports.deleteLeaveEncashApplication = async (req, res) => {
    try {
        const data = await LeaveEncashApplication.findOne({ where: { id: req.body.id } })
        if (!data) {
            return res.status(404).json({
                message: "not found"
            })
        } else {
            LeaveEncashApplication.update({
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
            error
        })
    }
}


// leave_encash_approval API

exports.addLeaveEncashApproval = async (req, res) => {
    try {
        const { data } = req.body
        var leaveEncashApproval = await LeaveEncashApproval.bulkCreate(data)
        console.log("data",leaveEncashApproval);
        if (!leaveEncashApproval) {
            return res.status(404).json({
                message: "failed to create"
            })
        } else {
            return res.status(200).json({
                message: "created",
                leaveEncashApproval
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Success",
            error
        })
    }
}

exports.getLeaveEncashApproval = async (req, res) => {
    try {
        var leaveEncashApproval = await LeaveEncashApproval.findAndCountAll({
            where: {
                owner_id: req.body.owner_id,
                isDeleted : req.body.isDeleted
            },
            include: [
                {
                    model: model.Department,
                    as: 'leave_encash_approval',
                    subQuery: false,
                    attributes: [
                        'department_name',
                        "manager_id"
                    ]
                }
            ]
        })

        if (!leaveEncashApproval) {
            return res.status(404).json({
                message: "Something went wrong"
            })
        } else {
            return res.status(200).json({
                message: "Success",
                leaveEncashApproval
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Success",
            error
        })
    }
}

exports.updateLeaveEncashApproval = async (req, res) => {
    try {
        const { id,data } = req.body
        var leaveEncashApproval = await LeaveEncashApproval.update(
            data,
            {
                where: {
                    id: id
                }
            }
        )
        if (!leaveEncashApproval) {
            return res.status(404).send({
                message: "Fail to Update"
            })
        } else {
            return res.status(200).send({
                message: "updated",
                leaveEncashApproval
            })
        }
    } catch (error) {
        return res.status(500).send({
            message: "Server Error",
            error
        })
    }
}

exports.deleteLeaveEncashApproval = async (req, res) => {
    try {
        const data = await LeaveEncashApproval.findOne({ where: { id: req.body.id } })
        if (!data) {
            return res.status(404).json({
                message: "not found"
            })
        } else {
            LeaveEncashApproval.update({
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
            error
        })
    }
}


// Notification 

// Leave_application_notification API

exports.addLeaveApplicationNotification = async (req, res) => {
    try {
        const { data } = req.body
        var leaveApplicationNotification = await LeaveApplicationNotification.bulkCreate(data)
    
        if (!leaveApplicationNotification) {
            return res.status(404).json({
                message: "failed to create"
            })
        } else {
            return res.status(200).json({
                message: "created",
                leaveApplicationNotification
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Success",
            error
        })
    }
}

exports.getLeaveApplicationNotification = async (req, res) => {
    try {
        var leaveApplicationNotification = await LeaveApplicationNotification.findAndCountAll({
            where: {
                owner_id: req.body.owner_id,
                isDeleted : req.body.isDeleted
            },
            include: [
                {
                    model: model.Department,
                    as: 'leave_application_notification',
                    subQuery: false,
                    attributes: [
                        'department_name',
                        "manager_id"
                    ]
                }
            ]
        })
        console.log("data",leaveApplicationNotification);

        if (!leaveApplicationNotification) {
            return res.status(404).json({
                message: "Something went wrong"
            })
        } else {
            return res.status(200).json({
                message: "Success",
                leaveApplicationNotification
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Success",
            error
        })
    }
}

exports.updateLeaveApplicationNotification = async (req, res) => {
    try {
        const { id,data } = req.body
        var leaveApplicationNotification = await LeaveApplicationNotification.update(
            data,
            {
                where: {
                    id: id
                }
            }
        )
        if (!leaveApplicationNotification) {
            return res.status(404).send({
                message: "Fail to Update"
            })
        } else {
            return res.status(200).send({
                message: "updated",
                leaveApplicationNotification
            })
        }
    } catch (error) {
        return res.status(500).send({
            message: "Server Error",
            error
        })
    }
}

exports.deleteLeaveApplicationNotification = async (req, res) => {
    try {
        const data = await LeaveApplicationNotification.findOne({ where: { id: req.body.id } })
        if (!data) {
            return res.status(404).json({
                message: "not found"
            })
        } else {
            LeaveApplicationNotification.update({
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
            error
        })
    }
}


// leave approval notification Api 

exports.getLeaveApprovalNotification = async (req, res) => {
    try {
        var leaveApprovalNotification = await LeaveApprovalNotification.findAndCountAll({
            where: {
                owner_id: req.body.owner_id,
                isDeleted : req.body.isDeleted
            },
            include: [
                {
                    model: model.Department,
                    as: 'leave_approval_notification',
                    subQuery: false,
                    attributes: [
                        'department_name',
                        "manager_id"
                    ]
                }
            ]
        })

        console.log(leaveApprovalNotification);

        if (!leaveApprovalNotification) {
            return res.status(404).json({
                message: "Something went wrong"
            })
        } else {
            return res.status(200).json({
                message: "Success",
                leaveApprovalNotification
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Success",
            error
        })
    }
}

exports.addLeaveApprovalNotification = async (req, res) => {
    try {
        const { data } = req.body
        var leaveApprovalNotification = await LeaveApprovalNotification.bulkCreate(data)
    
        if (!leaveApprovalNotification) {
            return res.status(404).json({
                message: "failed to create"
            })
        } else {
            return res.status(200).json({
                message: "created",
                leaveApprovalNotification
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Success",
            error
        })
    }
}

exports.updateLeaveApprovalNotification = async (req, res) => {
    try {
        const { id,data } = req.body
        var leaveApprovalNotification = await LeaveApprovalNotification.update(
            data,
            {
                where: {
                    id: id
                }
            }
        )
        if (!leaveApprovalNotification) {
            return res.status(404).send({
                message: "Fail to Update"
            })
        } else {
            return res.status(200).send({
                message: "updated",
                leaveApprovalNotification
            })
        }
    } catch (error) {
        return res.status(500).send({
            message: "Server Error",
            error
        })
    }
}

exports.deleteLeaveApprovalNotification = async (req, res) => {
    try {
        const data = await LeaveApprovalNotification.findOne({ where: { id: req.body.id } })
        if (!data) {
            return res.status(404).json({
                message: "not found"
            })
        } else {
            LeaveApprovalNotification.update({
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
            error
        })
    }
}

// leave pending notification api 

exports.addLeavePendingNotification = async (req, res) => {
    try {
        const { data } = req.body
        var leavePendingNotification = await LeavePendingNotification.bulkCreate(data)
    
        if (!leavePendingNotification) {
            return res.status(404).json({
                message: "failed to create"
            })
        } else {
            return res.status(200).json({
                message: "created",
                leavePendingNotification
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Success",
            error
        })
    }
}

exports.getLeavePendingNotification = async (req, res) => {
    try {
        var leavePendingNotification = await LeavePendingNotification.findAndCountAll({
            where: {
                owner_id: req.body.owner_id,
                isDeleted : req.body.isDeleted
            },
            include: [
                {
                    model: model.Department,
                    as: 'leave_pending_notification',
                    subQuery: false,
                    attributes: [
                        'department_name',
                        "manager_id"
                    ]
                }
            ]
        })

        if (!leavePendingNotification) {
            return res.status(404).json({
                message: "Something went wrong"
            })
        } else {
            return res.status(200).json({
                message: "Success",
                leavePendingNotification
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Success",
            error
        })
    }
}

exports.updateLeavePendingNotification = async (req, res) => {
    try {
        const { id,data } = req.body
        var leavePendingNotification = await LeavePendingNotification.update(
            data,
            {
                where: {
                    id: id
                }
            }
        )
        if (!leavePendingNotification) {
            return res.status(404).send({
                message: "Fail to Update"
            })
        } else {
            return res.status(200).send({
                message: "updated",
                leavePendingNotification
            })
        }
    } catch (error) {
        return res.status(500).send({
            message: "Server Error",
            error
        })
    }
}

exports.deleteLeavePendingNotification = async (req, res) => {
    try {
        const data = await LeavePendingNotification.findOne({ where: { id: req.body.id } })
        if (!data) {
            return res.status(404).json({
                message: "not found"
            })
        } else {
            LeavePendingNotification.update({
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
            error
        })
    }
}

// leave Encash approval notification 

exports.addLeaveEncashAppovalNotification = async (req, res) => {
    try {
        const { data } = req.body
        var leaveEncashAppovalNotification = await LeaveEncashAppovalNotification.bulkCreate(data)
    
        if (!leaveEncashAppovalNotification) {
            return res.status(404).json({
                message: "failed to create"
            })
        } else {
            return res.status(200).json({
                message: "created",
                leaveEncashAppovalNotification
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Success",
            error
        })
    }
}

exports.getLeaveEncashAppovalNotification = async (req, res) => {
    try {
        var leaveEncashAppovalNotification = await LeaveEncashAppovalNotification.findAndCountAll({
            where: {
                owner_id: req.body.owner_id,
                isDeleted : req.body.isDeleted
            },
            include: [
                {
                    model: model.Department,
                    as: 'leave_encash_approval_notification',
                    subQuery: false,
                    attributes: [
                        'department_name',
                        "manager_id"
                    ]
                }
            ]
        })

        if (!leaveEncashAppovalNotification) {
            return res.status(404).json({
                message: "Something went wrong"
            })
        } else {
            return res.status(200).json({
                message: "Success",
                leaveEncashAppovalNotification
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Success",
            error
        })
    }
}

exports.updateLeaveEncashAppovalNotification = async (req, res) => {
    try {
        const { id,data } = req.body
        var leaveEncashAppovalNotification = await LeaveEncashAppovalNotification.update(
            data,
            {
                where: {
                    id: id
                }
            }
        )
        if (!leaveEncashAppovalNotification) {
            return res.status(404).send({
                message: "Fail to Update"
            })
        } else {
            return res.status(200).send({
                message: "updated",
                leaveEncashAppovalNotification
            })
        }
    } catch (error) {
        return res.status(500).send({
            message: "Server Error",
            error
        })
    }
}

exports.deleteLeaveEncashAppovalNotification = async (req, res) => {
    try {
        const data = await LeaveEncashAppovalNotification.findOne({ where: { id: req.body.id } })
        if (!data) {
            return res.status(404).json({
                message: "not found"
            })
        } else {
            LeaveEncashAppovalNotification.update({
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
            error
        })
    }
}
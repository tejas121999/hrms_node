const { ApprovalNotification, AbsentNotification, Missing_Attendance_Notification } = require('../models')
const model = require('../models');

exports.getApprovalNotification = async (req, res) => {
    try {
        var attendance = await ApprovalNotification.findAndCountAll({
            where: {
                owner_id: req.body.owner_id,
                isDeleted: req.body.isDeleted
            },
            limit: req.body.limit,
            offset: req.body.offset,
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

        if (!attendance) {
            return res.status(404).json({
                message: "Something went wrong"
            })
        } else {
            return res.status(200).json({
                message: "Success",
                attendance
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Success",
            error
        })
    }
}

exports.addApprovalNotification = async (req, res) => {
    try {
        const { settings } = req.body
        var addsetting = await ApprovalNotification.bulkCreate(settings)
        if (!addsetting) {
            return res.status(404).json({
                message: "failed to create"
            })
        } else {
            return res.status(200).json({
                message: "created",
                addsetting
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Success",
            error
        })
    }
}

exports.updateApprovalNotification = async (req, res) => {
    try {
        const { _id, setting } = req.body
        var updateNotification = await ApprovalNotification.update(
            setting,
            {
                where: {
                    id: _id
                }
            }
        )
        if (!updateNotification) {
            return res.status(404).send({
                message: "Fail to Update"
            })
        } else {
            return res.status(200).send({
                message: "updated",
                updateNotification
            })
        }
    } catch (error) {
        console.log("======", error)
        return res.status(500).send({
            message: "Server Error",
            error
        })
    }
}

exports.deleteApprovalNotification = async (req, res) => {
    try {
        const data = await ApprovalNotification.findOne({ where: { id: req.body.id } })
        if (!data) {
            return res.status(404).json({
                message: "not found"
            })
        } else {
            ApprovalNotification.update({
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

exports.getAbsentNotification = async (req, res) => {
    try {
        var attendance = await AbsentNotification.findAndCountAll({
            where: {
                owner_id: req.body.owner_id
            },
            limit: req.body.limit,
            offset: req.body.offset,
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

        if (!attendance) {
            return res.status(404).json({
                message: "Something went wrong"
            })
        } else {
            return res.status(200).json({
                message: "Success",
                attendance
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Success",
            error
        })
    }
}

exports.sendAbsentNotification = async (req, res) => {
    try {
        const { settings } = req.body
        var addsetting = await AbsentNotification.bulkCreate(settings)
        if (!addsetting) {
            return res.status(404).json({
                message: "failed to create"
            })
        } else {
            return res.status(200).json({
                message: "created",
                addsetting
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Success",
            error
        })
    }
}

exports.updateAbsentNotification = async (req, res) => {
    try {
        const { _id, setting } = req.body
        var updateNotification = await AbsentNotification.update(
            setting,
            {
                where: {
                    id: _id
                }
            }
        )
        if (!updateNotification) {
            return res.status(404).send({
                message: "Fail to Update"
            })
        } else {
            return res.status(200).send({
                message: "updated",
                updateNotification
            })
        }
    } catch (error) {
        return res.status(500).send({
            message: "Server Error",
            error
        })
    }
}

exports.deleteAbsentNotification = async (req, res) => {
    try {
        const data = await AbsentNotification.findOne({ where: { id: req.body.id } })
        if (!data) {
            return res.status(404).json({
                message: "not found"
            })
        } else {
            AbsentNotification.update({
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

exports.getMisingAttendence = async (req, res) => {
    try {
        var attendance = await Missing_Attendance_Notification.findAndCountAll({
            where: {
                owner_id: req.body.owner_id,
                isDeleted: req.body.isDeleted
            },
            limit: req.body.limit,
            offset: req.body.offset,
        })

        if (!attendance) {
            return res.status(404).json({
                message: "Something went wrong"
            })
        } else {
            return res.status(200).json({
                message: "Success",
                attendance
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Success",
            error
        })
    }
}

exports.addMisingAttendence = async (req, res) => {
    try {
        const { settings } = req.body
        var addsetting = await Missing_Attendance_Notification.create(settings)
        if (!addsetting) {
            return res.status(404).json({
                message: "failed to create"
            })
        } else {
            return res.status(200).json({
                message: "created",
                addsetting
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Server Error",
            error
        })
    }
}

exports.updateMisingAttendence = async (req, res) => {
    try {
        const { _id, settings } = req.body
        var updateNotification = await Missing_Attendance_Notification.update(
            settings,
            {
                where: {
                    id: _id
                }
            }
        )
        if (!updateNotification) {
            return res.status(404).send({
                message: "Fail to Update"
            })
        } else {
            return res.status(200).send({
                message: "updated",
                updateNotification
            })
        }
    } catch (error) {
        return res.status(500).send({
            message: "Server Error",
            error
        })
    }
}

exports.deleteMisingAttendence = async (req, res) => {
    try {
        const data = await Missing_Attendance_Notification.findOne({ where: { id: req.body.id } })
        if (!data) {
            return res.status(404).json({
                message: "not found"
            })
        } else {
            Missing_Attendance_Notification.update({
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

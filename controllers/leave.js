const { Leave } = require('../models')

exports.getLeave = async (req, res) => {
    try {
        var leave = await Leave.findAndCountAll({
            where: {
                isDeleted: req.body.where,
                leave_owner_id: req.body.leave_owner_id
            },
            limit: req.body.limit,
            offset: req.body.offset
        })
        if (!leave) {
            return res.status(404).json({
                message: "Something went wrong"
                
            })
        } else {
            return res.status(200).json({
                message: "Success",
                leave
            })
        }
    } catch (error) {
        console.error("errr====", error.message)
        res.status(500).send("Server Error")
    }
}

exports.addLeave = async (req, res) => {
    try {
        console.log(req.body)
        var date = new Date()
        const {
            leave_name,
            no_of_days,
            leave_desc,
            leave_owner_id
        } = req.body
        var leave = await Leave.create({
            leave_name,
            no_of_days,
            leave_desc,
            leave_owner_id,
            createdAt: date,
            updatedAt: date
        })
        console.log(leave)
        if (!leave) {
            return res.status(404).json({
                message: "failed to create"
            })
        } else {
            return res.status(200).json({
                message: "created",
                leave
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}

exports.updateLeave = async (req, res) => {
    try {
        var date = new Date()
        Leave.findByPk(req.body.id).then((data) => {
            Leave.update({
                leave_name: req.body.leave_name || data.leave_name,
                no_of_days: req.body.no_of_days || data.no_of_days,
                leave_desc: req.body.leave_desc || data.leave_desc,
                updatedAt: date
            }, {
                where: {
                    id: req.body.id
                }
            }
            ).then((_) => {
                res.status(200).send({
                    message: "update",
                    data
                })
            })
                .catch((err) => res.status(400).send(err))
        })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}

exports.getLeaveById = async (req, res) => {
    try {
        const leave = await Leave.findOne({ where: { id: req.body.id } })
        if (!leave) {
            return res.status(404).json({
                message: "leave not found"
            })
        } else {
            res.status(200).send({
                message: "leave Deleted",
                leave
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}

exports.deleteLeave = async (req, res) => {
    try {
        const leave = await Leave.findByPk(req.body.id)
        if (!leave) {
            return res.status(404).json({
                message: "leave not found"
            })
        } else {
            Leave.update({
                isDeleted: req.body.isDeleted
            }, {
                where: {
                    id: req.body.id
                }
            }).then((_) => {
                res.status(200).send({
                    message: "leave Deleted",
                    Leave
                })
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}
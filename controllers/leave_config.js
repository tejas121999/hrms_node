const { LeaveConfig } = require('../models')

exports.getLeaveConfig = async (req, res) => {
    try {
        const data = await LeaveConfig.findOne({ where: { id: req.body.id } })
        if (!data) {
            return res.status(404).json({
                message: "leave configuration not found"
            })
        } else {
            res.status(200).send({
                message: "Leave Config",
                data
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Server Error",
            error
        })
    }
}

exports.addLeaveConfig = async (req, res) => {
    try {
        const { config } = req.body
        var leaveConfig = await LeaveConfig.create(config)
        if (!leaveConfig) {
            return res.status(404).json({
                message: "failed to create"
            })
        } else {
            return res.status(200).json({
                message: "created",
                leaveConfig
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error
        })
    }
}

exports.editLeaveConfig = async (req, res) => {
    try {
        const { _id, config } = req.body
        var updateConfig = await LeaveConfig.update(
            config,
            {
                where: {
                    id: _id
                }
            }
        )
        return res.status(200).send({
            message: "updated Loan",
            updateConfig
        })
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error
        })
    }
}
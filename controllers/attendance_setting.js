const { AttendenceSetting } = require('../models')

exports.getattendenceSetting = async (req, res) => {
    try {
        const setting = await AttendenceSetting.findAndCountAll({
            where: {
                isDeleted: req.body.isDeleted,
                owner_id: req.body.owner_id
            },
            limit: req.body.limit,
            offset: req.body.offset,
        })

        if (!setting) {
            return res.status(404).json({
                message: "Something went wrong"
            })
        } else {
            return res.status(200).json({
                message: "Success",
                setting
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}

exports.addAttendenceSetting = async (req, res) => {
    try {
        const { setting } = req.body
        var addSetting = await AttendenceSetting.bulkCreate(setting)
        if (!addSetting) {
            return res.status(404).json({
                message: "failed to create"
            })
        } else {
            return res.status(200).json({
                message: "created",
                addSetting
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}

exports.editSetting = async (req, res) => {
    try {
        const { _id, setting } = req.body
        var updateSettings = await AttendenceSetting.update(
            setting,
            {
                where: {
                    id: _id
                }
            }
        )
        if (!updateSettings) {
            return res.status(404).json({
                message: "failed to create"
            })
        } else {
            return res.status(200).send({
                message: "updated Loan",
                updateSettings
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}

exports.deleteSetting = async (req, res) => {
    try {
        const data = await AttendenceSetting.findOne({ where: { id: req.body.id } })
        if (!data) {
            return res.status(404).json({
                message: "setting not found"
            })
        } else {
            AttendenceSetting.update({
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
            message: error
        })
    }
}

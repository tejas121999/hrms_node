const { UserAccess } = require('../models')
const model = require('../models');
const { Op } = require("sequelize");

exports.getUserAccess = async (req, res) => {
    try {
        var getAccess = await UserAccess.findAll()
        if (!getAccess) {
            return res.status(404).json({
                message: "Something went wrong"
            })
        } else {
            return res.status(200).json({
                message: "Success",
                getAccess
            })
        }
    } catch (error) {
        console.error("errr====", error.message)
        res.status(500).send(error.message)
    }
}

exports.getdefaultAccess = async (req, res) => {
    try {
        var defaultAccess = await UserAccess.findOne({ where: { id: req.body.id } })
        if (!defaultAccess) {
            return res.status(404).json({
                message: "access not found"
            })
        } else {
            res.status(200).send({
                message: "Delete",
                defaultAccess
            })
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

exports.addAccess = async (req, res) => {
    try {
        const { access } = req.body
        var data = await UserAccess.findOne({
            where:
                { emp_id: access.emp_id }
        })
        if (!data) {
            var addAccess = await UserAccess.create(
                access
            )
            if (!addAccess) {
                return res.status(404).json({
                    message: "failed to create"
                })
            } else {
                return res.status(200).json({
                    message: "created",
                    addAccess
                })
            }
        } else {
            var ediAccess = await UserAccess.update(
                access,
                {
                    where: {
                        emp_id: access.emp_id
                    }
                }
            )
            if (!ediAccess) {
                return res.status(404).json({
                    message: "failed to create"
                })
            } else {
                return res.status(200).json({
                    message: "Update",
                    ediAccess
                })
            }
        }

    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
}

exports.getUserAccessById = async (req, res) => {
    try {
        var getEmpAccess = await UserAccess.findOne({
            where: {
                emp_id: req.body.emp_id
            }
        })
        if (!getEmpAccess) {
            return res.status(404).json({
                message: "access not found"
            })
        } else {
            res.status(200).send({
                message: "getEmpAccess",
                getEmpAccess
            })
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

exports.updateUserAccessById = async (req, res) => {
    try {
        const { access } = req.body
        var ediAccess = await UserAccess.update(
            access,
            {
                where: {
                    emp_id: access.emp_id
                }
            }
        )

        return res.status(200).json({
            message: "Update",
            ediAccess
        })

    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
}

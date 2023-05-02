const { QueryTypes } = require('sequelize');
// const { SELECT } = require('sequelize/types/query-types');
const { LeaveConfiguration, User } = require('../models')
const model = require('../models');
const db = require('../models/index')

exports.get = async (req, res) => {
    try {
        var configuration = await LeaveConfiguration.findOne({
            where: {
                company_id: req.body.company_id,
                owner_id: req.body.owner_id
            }
        })
        if (!configuration) {
            return res.status(404).json({
                message: "Something went wrong"
            })
        } else {
            return res.status(200).json({
                message: "Success",
                configuration
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            message: "Server Error",
            error
        })
    }

}

exports.add = async (req, res) => {
    try {

        const {
            configuration
        } = req.body
        var create_configuration = await LeaveConfiguration.create(
            configuration
        )

        if (!create_configuration) {
            return res.status(404).json({
                message: "failed to create"
            })
        } else {
            return res.status(200).json({
                message: "created",
                create_configuration
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error",
            error
        })
    }
}

exports.edit = async (req, res) => {
    try {
        var date = new Date()
        const { configuration_id, configuration } = req.body;
        console.log("test");
        var udapteRes = await LeaveConfiguration.update(configuration,
            {
                where: {
                    id: configuration_id
                }
            }
        )
        console.log("test");
        return res.status(200).send({
            message: "updated configuration",
            udapteRes
        })

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}

exports.delete = async (req, res) => {
    try {
        const { configuration_id } = req.body;
        const data = await LeaveConfiguration.findOne({ where: { id: configuration_id } })
        if (!data) {
            return res.status(404).json({
                message: "Configuration not found"
            })
        } else {
            LeaveConfiguration.update({
                isDeleted: true
            }, {
                where: {
                    id: configuration_id
                }
            }).then((_) => {
                res.status(200).send({
                    message: "Done",
                    // data
                })
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}

exports.getById = async (req, res) => {
    try {
        const { configuration_id } = req.body;
        const configuration = await LeaveConfiguration.findOne({
            where: {
                id: configuration_id
            }
        })
        if (!configuration) {
            return res.status(404).json({
                message: "Configuration not found"
            })
        } else {
            res.status(200).send({
                message: "Done",
                configuration
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}





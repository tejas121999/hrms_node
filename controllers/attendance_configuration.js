const { QueryTypes } = require('sequelize');
// const { SELECT } = require('sequelize/types/query-types');
const { AttendanceConfiguration, User } = require('../models')
const model = require('../models');
const db = require('../models/index')

exports.getConfiguration = async (req, res) => {
    try {
        var configuration = await AttendanceConfiguration.findOne({
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

exports.addConfiguration = async (req, res) => {
    try {

        const {
            configuration
        } = req.body
        var create_configuration = await AttendanceConfiguration.create(
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

exports.editConfiguration = async (req, res) => {
    try {
        var date = new Date()
        const { configuration_id, configuration } = req.body;
        console.log("test");
        var udapteRes = await AttendanceConfiguration.update(configuration,
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

// Config cannot be deleted. Only edited

// exports.deleteConfiguration = async (req, res) => {
//     try {
//         const { configuration_id } = req.body;
//         const data = await Configuration.findOne({ where: { id: configuration_id } })
//         if (!data) {
//             return res.status(400).json({
//                 message: "Configuration not found"
//             })
//         } else {
//             Configuration.update({
//                 isDeleted: true
//             }, {
//                 where: {
//                     id: configuration_id
//                 }
//             }).then((_) => {
//                 res.status(200).send({
//                     message: "Done",
//                     // data
//                 })
//             })
//         }
//     } catch (error) {
//         console.error(error.message)
//         res.status(500).send("Server Error")
//     }
// }

exports.getConfigurationById = async (req, res) => {
    try {
        const { configuration_id } = req.body;
        console.log(req.body)
        const configuration = await AttendanceConfiguration.findOne({
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





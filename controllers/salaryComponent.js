const { SalaryComponent } = require('../models')
const { Op } = require("sequelize");


exports.getSalaryComponent = async (req, res) => {
    try {
        var salaryComponent = await SalaryComponent.findAndCountAll({
            where: {
                isDeleted: req.body.isDeleted,
                component_owner_id: req.body.component_owner_id,
                component_type: {
                    [Op.or]: req.body.component_type
                },
            },
            limit: req.body.limit,
            offset: req.body.offset
        })
        if (!salaryComponent) {
            return res.status(400).json({
                message: "Something went wrong"
            })
        } else {
            return res.status(200).json({
                message: "Success",
                salaryComponent
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}

exports.addSalaryComponent = async (req, res) => {
    try {
        var date = new Date()
        const { salaryComponent } = req.body

        var salaryComponentData = await SalaryComponent.create(salaryComponent)
        if (!salaryComponentData) {
            return res.status(400).json({
                message: "failed to create"
            })
        } else {
            return res.status(200).json({
                message: "created",
                salaryComponentData
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}

exports.updateSalaryComponent = async (req, res) => {
    try {
        const { id, data } = req.body
        console.log(req.body)
        var salaryComponent = await SalaryComponent.update(
            data,
            {
                where: {
                    id: id
                }
            }
        )
        if (!salaryComponent) {
            return res.status(400).json({
                message: "failed to create"
            })
        } else {
            return res.status(200).send({
                message: "updated ",
                salaryComponent
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: error
        })
    }
}

// exports.updateSalaryComponent = async (req, res) => {
//     try {
//         var date = new Date()
//         const data = await SalaryComponent.findByPk(req.body.id)
//         if (!data) {
//             return res.status(401).json({
//                 message: "Salary Component not found"
//             })
//         } else {
//             SalaryComponent.update({
//                 salary_component_name: req.body.salary_component_name || data.salary_component_name,
//                 salary_component_code: req.body.salary_component_code || data.salary_component_code,
//                 leager: req.body.leager || data.leager,
//                 description: req.body.description || data.description,
//                 updatedAt: date
//             }, {
//                 where: {
//                     id: req.body.id
//                 }
//             }
//             )
//                 .then((_) => {
//                     res.status(200).send({
//                         message: "update",
//                         data
//                     })
//                 })
//         }
//     } catch (error) {
//         console.error(error.message)
//         res.status(500).send("Server Error")
//     }
// }

exports.getSalaryComponentById = async (req, res) => {
    try {
        const salaryComponent = await SalaryComponent.findOne({ where: { id: req.body.id } })
        if (!salaryComponent) {
            return res.status(400).json({
                message: "Salary Component not found"
            })
        } else {
            res.status(200).send({
                message: "Salary Component Deleted",
                salaryComponent
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}

exports.getBasicSalaryComponent = async (req, res) => {
    try {
        const salaryComponent = await SalaryComponent.findOne(
            {
                where: {
                    component_type: "Earnings",
                    isDeleted: req.body.isDeleted,
                    component_owner_id: req.body.component_owner_id,
                    salary_component_name: "Basic"
                }
            }
        )
        if (!salaryComponent) {
            return res.status(400).json({
                message: "Salary Component not found"
            })
        } else {
            res.status(200).send({
                message: "Salary Component Deleted",
                salaryComponent
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}

exports.deleteSalaryComponent = async (req, res) => {
    try {
        const salaryComponent = await SalaryComponent.findOne({ where: { id: req.body.id } })
        if (!salaryComponent) {
            return res.status(400).json({
                message: "salary Component not found"
            })
        } else {
            SalaryComponent.update({
                isDeleted: req.body.isDeleted
            }, {
                where: {
                    id: req.body.id
                }
            }).then((_) => {
                res.status(200).send({
                    message: "salary Component Deleted",
                    salaryComponent
                })
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}
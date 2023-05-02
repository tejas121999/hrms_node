const { Salary } = require('../models')
const model = require('../models');

exports.getSalary = async (req, res) => {
    try {
        var salary = await Salary.findAndCountAll({
            where: { isDeleted: req.body.where },
            limit: req.body.limit,
            offset: req.body.offset,
            include: [
                {
                    model: model.Employee,
                    as: 'employee_name',
                    subQuery: false,
                    attributes: [
                        "first_name",
                        "middle_name",
                        "last_name"
                    ]
                },
                {
                    model: model.SalaryComponent,
                    as: 'salary_comp',
                    subQuery: false,
                    attributes: [
                        "salary_component_name",
                        "salary_component_value"
                    ]
                }
            ]
        })
        if (!salary) {
            return res.status(404).json({
                message: "Something went wrong"
            })
        } else {
            return res.status(200).json({
                message: "Success",
                salary
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error
        })
    }
}

exports.addSalary = async (req, res) => {
    try {
        var date = new Date()
        const { employeeName, salary_component, monthly, yearly, tax } = req.body
        var create_salary = await Salary.create({
            employeeName,
            salary_component,
            monthly,
            yearly,
            tax,
            createdAt: date,
            updatedAt: date
        })

        if (!create_salary) {
            return res.status(404).json({
                message: "failed to create"
            })
        } else {
            return res.status(200).json({
                message: "created",
                create_salary
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error
        })
    }
}

exports.updateSalary = async (req, res) => {
    try {
        var date = new Date()
        const salary = await Salary.findOne({ where: { id: req.body.id } })
        if (!salary) {
            return res.status(404).json({
                message: "Salary Not Found"
            })
        } else {
            Salary.update({
                employeeName: req.body.employeeName || salary.employeeName,
                salary_component: req.body.salary_component || salary.salary_component,
                monthly: req.body.monthly || salary.monthly,
                yearly: req.body.yearly || salary.yearly,
                tax: req.body.tax || salary.tax,
                updatedAt: date
            }, {
                where: {
                    id: req.body.id
                }
            }).then((_) => {
                res.status(200).send({
                    message: "Updated",
                    // data
                })
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}

exports.deleteSalary = async (req, res) => {
    try {
        const salary = await Salary.findOne({ where: { id: req.body.id } })
        if (!salary) {
            return res.status(404).json({
                message: "Salary Not Found"
            })
        } else {
            Salary.update({
                isDeleted: req.body.isDeleted
            }, {
                where: {
                    id: req.body.id
                }
            }).then((_) => {
                res.status(200).send({
                    message: "Updated",
                    // data
                })
            })
        }
    } catch (error) {
        res.status(500).send("Server Error")
    }
}
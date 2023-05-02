const { SalaryGrade } = require('../models')

exports.getSalaryGrade = async (req, res) => {
    try {
        var salaryGrade = await SalaryGrade.findAndCountAll({
            where: { isDeleted: req.body.where },
            limit: req.body.limit,
            offset: req.body.offset
        })
        if (!salaryGrade) {
            return res.status(404).json({
                message: "Something went wrong"
            })
        } else {
            return res.status(200).json({
                message: "Success",
                salaryGrade
            })
        }
    } catch (error) {
        console.error("errr====", error.message)
        res.status(500).send("Server Error")
    }
}

exports.addSalaryGrade = async (req, res) => {
    try {
        var date = new Date()
        const { salary_grade_name, grade_salary_struct, grade_salary_comp } = req.body
        var salaryGrade = await SalaryGrade.create({
            salary_grade_name,
            grade_salary_struct,
            grade_salary_comp,
            createdAt: date,
            updatedAt: date
        })
        if (!salaryGrade) {
            return res.status(404).json({
                message: "failed to create"
            })
        } else {
            return res.status(200).json({
                message: "created",
                salaryGrade
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}

exports.updateSalaryGrade = async (req, res) => {
    try {
        var date = new Date()
        SalaryGrade.findByPk(req.body.id).then((data) => {
            SalaryGrade.update({
                salary_grade_name: req.body.salary_grade_name || data.salary_grade_name,
                grade_salary_struct: req.body.salary_grade_name || data.salary_grade_name,
                grade_salary_comp: req.body.salary_grade_name || data.salary_grade_name,
                updatedAt: date
            }, {
                where: {
                    id: req.body.id
                }
            }).then((_) => {
                res.status(200).send({
                    message: "update",
                    data
                })
            })
                .catch((err) => res.status(404).send(err))
        })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}

exports.deleteSalaryComponent = async (req, res) => {
    try {
        const salaryGrade = await SalaryGrade.findByPk(req.body.id)
        if (!salaryGrade) {
            return res.status(404).json({
                message: "salary component not found"
            })
        } else {
            SalaryGrade.update({
                isDeleted: req.body.isDeleted
            }, {
                where: {
                    id: req.body.id
                }
            }).then((_) => {
                res.status(200).send({
                    message: "salary component Deleted",
                    salaryGrade
                })
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}

exports.getSalaryGradeById = async (req, res) => {
    try {
        const salaryGrade = await SalaryGrade.findByPk(req.body.id)
        if (!salaryGrade) {
            return res.status(404).json({
                message: "salary component not found"
            })
        } else {
            res.status(200).send({
                message: "salary component",
                salaryGrade
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}
const { SalaryStructure } = require('../models')

exports.getSalaryStructure = async (req, res) => {
    try {
        var salaryStructure = await SalaryStructure.findAndCountAll({
            where: { isDeleted: req.body.where },
            limit: req.body.limit,
            offset: req.body.offset
        })
        if (!salaryStructure) {
            return res.status(404).json({
                message: "Something went wrong"
            })
        } else {
            return res.status(200).json({
                message: "Success",
                salaryStructure
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}

exports.addSalaryStructure = async (req, res) => {
    try {
        var date = new Date()
        const { salary_structure_name, salary_stru_grade_id, salary_stru_comp_id, isDeleted } = req.body
        var salaryStructure = await SalaryStructure.create({
            salary_structure_name,
            salary_stru_grade_id,
            salary_stru_comp_id,
            isDeleted,
            createdAt: date,
            updatedAt: date
        })
        if (!salaryStructure) {
            return res.status(404).json({
                message: "failed to create"
            })
        } else {
            return res.status(200).json({
                message: "created",
                salaryStructure
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}

exports.updateSalaryStructure = async (req, res) => {
    try {
        var date = new Date()
        SalaryStructure.findByPk(req.body.id).then((data) => {
            SalaryStructure.update({
                salary_structure_name: req.body.salary_structure_name || data.salary_structure_name,
                salary_stru_grade_id: req.body.salary_stru_grade_id || data.salary_stru_grade_id,
                salary_stru_comp_id: req.body.salary_stru_comp_id || data.salary_stru_comp_id,
                isDeleted: false,
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

exports.deleteSalaryStructure = async (req, res) => {
    try {
        const salaryStructure = await SalaryStructure.findByPk(req.body.id)
        if (!salaryStructure) {
            return res.status(404).json({
                message: "salary structure not found"
            })
        } else {
            SalaryStructure.update({
                isDeleted: req.body.isDeleted
            }, {
                where: {
                    id: req.body.id
                }
            }).then((_) => {
                res.status(200).send({
                    message: "salary structure Deleted",
                    salaryStructure
                })
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}

exports.getSalaryStructureById = async (req, res) => {
    try {
        const salaryStructure = await SalaryStructure.findByPk(req.body.id)
        if (!salaryStructure) {
            return res.status(404).json({
                message: "salary structure not found"
            })
        } else {
            res.status(200).send({
                message: "salary structure",
                salaryStructure
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}
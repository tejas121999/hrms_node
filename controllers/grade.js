const { Grade } = require('../models')

exports.getGrade = async (req, res) => {
    try {
        var grade = await Grade.findAndCountAll({
            where: { isDeleted: req.body.where },
            limit: req.body.limit,
            offset: req.body.offset
        })
        if (!grade) {
            return res.status(404).json({
                message: "Something went wrong"
            })
        } else {
            return res.status(200).json({
                message: "Success",
                grade
            })
        }
    } catch (error) {
        console.error("errr====", error.message)
        res.status(500).send("Server Error")
    }
}

exports.addGrade = async (req, res) => {
    try {
        var date = new Date()
        const { grade_name, } = req.body
        var grade = await Grade.create({
            grade_name,
            createdAt: date,
            updatedAt: date
        })
        if (!grade) {
            return res.status(404).json({
                message: "failed to create"
            })
        } else {
            return res.status(200).json({
                message: "created",
                grade
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}

exports.updateGrade = async (req, res) => {
    try {
        var date = new Date()
        const data = await Grade.findByPk(req.body.id)
        if (!data) {
            return res.status(404).json({
                message: "Grade is not found"
            })
        } else {
            Grade.update({
                grade_name: req.body.grade_name || data.grade_name,
                updatedAt: date
            }, {
                where: {
                    id: req.body.id
                }
            }
            ).then((_) => {
                res.status(200).send({
                    message: "update"
                })
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}

exports.getGradeById = async (req, res) => {
    try {
        const grade = await Grade.findOne({ where: { id: req.body.id } })
        if (!grade) {
            return res.status(404).json({
                message: "grade not found"
            })
        } else {
            res.status(200).send({
                message: "grade Deleted",
                grade
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}

exports.deleteGrade = async (req, res) => {
    try {
        const grade = await Grade.findByPk(req.body.id)
        if (!grade) {
            return res.status(404).json({
                message: "grade not found"
            })
        } else {
            Grade.update({
                isDeleted: req.body.isDeleted
            }, {
                where: {
                    id: req.body.id
                }
            }).then((_) => {
                res.status(200).send({
                    message: "Delete",
                    grade
                })
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}
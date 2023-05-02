const { Designation } = require('../models')
const model = require('../models');

exports.getDesignation = async (req, res) => {
    try {
        var designation = await Designation.findAndCountAll({
            where: {
                isDeleted: req.body.isDeleted,
                designation_owner_id: req.body.designation_owner_id
            },
            limit: req.body.limit,
            offset: req.body.offset,
            include: [
                {
                    model: model.Owner,
                    as: "designation_owner_data",
                    subQuery: false,
                    attributes: [
                        'owner_name'
                    ]
                }
            ]
        })
        if (!designation) {
            return res.status(404).json({
                message: "Something went wrong"
            })
        } else {
            return res.status(200).json({
                message: "Success",
                designation
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}

exports.addDesignation = async (req, res) => {
    try {
        var date = new Date()
        console.log(req.body)
        const {
            designation_owner_id,
            designation_department_id,
            job_title,
            reports_to,
            job_category,
            description,
            required_skill
        } = req.body
        var designation = await Designation.create({
            designation_owner_id,
            designation_department_id,
            job_title,
            reports_to,
            job_category,
            description,
            required_skill,
            createdAt: date,
            updatedAt: date
        })
        if (!designation) {
            return res.status(404).json({
                message: "failed to create"
            })
        } else {
            return res.status(200).json({
                message: "created"
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}

exports.editDesignation = async (req, res) => {
    try {
        var date = new Date()
        const data = await Designation.findByPk(req.body.id)
        if (!data) {
            return res.status(404).json({
                message: "Designation not found"
            })
        } else {
            Designation.update({
                designation_department_id: req.body.designation_department_id || data.designation_department_id,
                job_title: req.body.job_title || data.job_title,
                reports_to: req.body.reports_to || data.reports_to,
                job_category: req.body.job_category || data.job_category,
                description: req.body.description || data.description,
                required_skill: req.body.required_skill || data.required_skill,
                updatedAt: date
            },
                {
                    where: {
                        id: req.body.id
                    }
                }
            ).then((_) => {
                res.status(200).send({
                    message: "edited successfully",
                    data
                })
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}

exports.deleteDesignation = async (req, res) => {
    try {
        const designation = await Designation.findByPk(req.body.id)
        if (!designation) {
            return res.status(404).json({
                message: "Designation not found"
            })
        } else {
            Designation.update({
                isDeleted: req.body.isDeleted
            }, {
                where: {
                    id: req.body.id
                }
            }).then((_) => {
                res.status(200).send({
                    message: "Designation Deleted"
                })
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}

exports.getDesignationById = async (req, res) => {
    try {
        const designation = await Designation.findOne({ where: { id: req.body.id } });
        if (!designation) {
            return res.status(404).json({
                message: "designation not found"
            })
        } else {
            res.status(200).send({
                message: "designation",
                designation
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}


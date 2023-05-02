const { TDS } = require('../models')

exports.getTds = async (req, res) => {
    try {
        var tds = await TDS.findAndCountAll({
            where: { isDeleted: req.body.where },
            limit: req.body.limit,
            offset: req.body.offset
        })
        if (!tds) {
            return res.status(404).json({
                message: "Something went wrong"
            })
        } else {
            return res.status(200).json({
                message: "Success",
                tds
            })
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

exports.addTds = async (req, res) => {
    try {
        var date = new Date()
        const {
            assessment_year,
            payment_type,
            parcentage,
            section_type,
            description
        } = req.body
        var tds = await TDS.create({
            assessment_year,
            payment_type,
            parcentage,
            section_type,
            description,
            createdAt: date,
            updatedAt: date
        })
        if (!tds) {
            return res.status(404).json({
                message: "Something went wrong"
            })
        } else {
            return res.status(200).json({
                message: "Success",
                tds
            })
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

exports.updateTds = async (req, res) => {
    try {
        const tds = await TDS.findOne({ where: { id: req.body.id } })
        if (!tds) {
            return res.status(404).json({
                message: "TDS not found"
            })
        } else {
            TDS.update({
                assessment_year: req.body.assessment_year || data.assessment_year,
                payment_type: req.body.payment_type || data.payment_type,
                parcentage: req.body.parcentage || data.parcentage,
                section_type: req.body.section_type || data.section_type,
                description: req.body.description || data.description,
                updatedAt: date
            },
                {
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
        res.status(500).send(error.message)
    }
}


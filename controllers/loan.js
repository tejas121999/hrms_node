const { Loan } = require('../models')
const model = require('../models');

exports.getLoan = async (req, res) => {
    try {
        var loan = await Loan.findAndCountAll({
            where: {
                isDeleted: req.body.where,
                loan_owner_id: req.body.loan_owner_id
            },
            limit: req.body.limit,
            offset: req.body.offset,
            include: [
                {
                    model: model.Owner,
                    as: "loan_owner_data",
                    subQuery: false,
                    attributes: [
                        'owner_name'
                    ]
                }
            ]
        })
        if (!loan) {
            return res.status(404).json({
                message: "Something went wrong"
            })
        } else {
            return res.status(200).json({
                message: "Success",
                loan
            })
        }
    } catch (error) {
        console.error("errr====", error.message)
        res.status(500).send(error.message)
    }
}

exports.addLoan = async (req, res) => {
    const { loan } = req.body
    var addLoan = await Loan.create(loan)
    if (!addLoan) {
        return res.status(404).json({
            message: "failed to create"
        })
    } else {
        return res.status(200).json({
            message: "created",
            addLoan
        })
    }
}

exports.editLoan = async (req, res) => {
    try {
        const { loan_id, loan } = req.body
        var updateLoan = await Loan.update(loan,
            {
                where: {
                    id: loan_id
                }
            }
        )
        return res.status(200).send({
            message: "updated Loan",
            updateLoan
        })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}

exports.deleteLoan = async (req, res) => {
    try {
        const loan = await Loan.findOne({ where: { id: req.body.loan_id } })
        if (!loan) {
            return res.status(404).json({
                message: "loan not found"
            })
        } else {
            Loan.update({
                isDeleted: req.body.isDeleted
            }, {
                where: {
                    id: req.body.loan_id
                }
            }).then((_) => {
                res.status(200).send({
                    message: "Delete",
                    // data
                })
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}
const { employeeLoan, Loan } = require('../models')
const model = require('../models');


exports.getEmployeeLoan = async (req, res) => {
    try {
        var empLoan = await employeeLoan.findAndCountAll({
            where: {
                isDeleted: req.body.isDeleted,
            },
            limit: req.body.limit,
            offset: req.body.offset,
            include: [
                {
                    model: model.Owner,
                    as: "loanemp_owner_data",
                    subQuery: false,
                    attributes: [
                        'owner_name'
                    ]
                },
                {
                    model: model.Loan,
                    as: "loan_data_name",
                    subQuery: false,
                    attributes: [
                        'loan_name',
                        'rate_of_interest',
                        'max_loan_ammount'
                    ]
                },
                {
                    model: model.Employee,
                    as: "loan_emp_datae",
                    subQuery: false,
                    attributes: [
                        'first_name',
                        'last_name'
                    ]
                }
            ]
        })
        if (!empLoan) {
            return res.status(404).json({
                message: "Something went wrong"
            })
        } else {
            return res.status(200).json({
                message: "Success",
                empLoan
            })
        }
    } catch (error) {
        console.error("errr====", error.message)
        res.status(500).send("Server Error")
    }
}

exports.addEmpLoan = async (req, res) => {
    try {
        const {
            loan_name,
            emploan_owner_id,
            loan_employee_name,
            rate_of_interest,
            loan_amount,
            disbursment_date,
            employee_address,
            exempt,
            loan_start_date,
            instalment_amount
        } = req.body
        console.log("req.body", req.body)
        var addLoan = await employeeLoan.create({
            loan_name,
            emploan_owner_id,
            loan_employee_name,
            rate_of_interest,
            loan_amount,
            disbursment_date,
            employee_address,
            exempt,
            loan_start_date,
            instalment_amount
        })
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
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}

exports.editEmpLoan = async (req, res) => {
    try {
        const { loan_id, emp_loan } = req.body
        var updateLoan = await employeeLoan.update(
            emp_loan,
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

exports.deleteEmpLoan = async (req, res) => {
    try {
        const loan = await employeeLoan.findOne({ where: { id: req.body.loan_id } })
        if (!loan) {
            return res.status(404).json({
                message: "loan not found"
            })
        } else {
            employeeLoan.update({
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

exports.getLoanByID = async (req, res) => {
    try {
        const loan = await Loan.findOne({ where: { id: req.body.loan_id } })
        if (!loan) {
            return res.status(404).json({
                message: "loan not found"
            })
        } else {
            return res.status(200).send({
                message: "Loan",
                loan
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}
const { Branch } = require('../models')
const model = require('../models');

exports.getBranch = async (req, res) => {
    try {
        var branch = await Branch.findAndCountAll({
            where: {
                isDeleted: req.body.where,
                branch_owner_id: req.body.branch_owner_id
            },
            limit: req.body.limit,
            offset: req.body.offset,
            include: [
                {
                    model: model.Owner,
                    as: "branch_owner_data",
                    subQuery: false,
                    attributes: [
                        'owner_name'
                    ]
                }
            ]
        })
        if (!branch) {
            return res.status(404).json({
                message: "Something went wrong"
            })
        } else {
            return res.status(200).json({
                message: "Success",
                branch
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}

exports.addBranch = async (req, res) => {
    try {
        var date = new Date()
        const {
            branch_owner_id,
            branch_name,
            branch_code,
            branch_type,
            branch_address,
            weekly_off,
            company_name,
            phone_no,
            contact_person,
            branch_email,
            year_of_establish,
            fax,
            branch_mobile,
            pan_no,
            header,
            cst,
            excise_registration,
            footer,
            associate_user,
            associate_warehouse
        } = req.body
        var createBranch = await Branch.create({
            branch_owner_id,
            branch_name,
            branch_code,
            branch_type,
            branch_address,
            weekly_off,
            company_name,
            phone_no,
            contact_person,
            branch_email,
            year_of_establish,
            fax,
            branch_mobile,
            pan_no,
            header,
            cst,
            excise_registration,
            footer,
            associate_user,
            associate_warehouse,
            createdAt: date,
            updatedAt: date
        })
        if (!createBranch) {
            return res.status(404).json({
                message: "failed to create"
            })
        } else {
            return res.status(200).json({
                message: "created",
                createBranch
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}

exports.updateBranch = async (req, res) => {
    try {
        var date = new Date()
        Branch.findByPk(req.body.id).then((data) => {
            Branch.update({
                branch_name: req.body.branch_name || data.branch_name,
                branch_code: req.body.branch_code || data.branch_code,
                branch_type: req.body.branch_type || data.branch_type,
                branch_address: req.body.branch_address || data.branch_address,
                weekly_off: req.body.weekly_off || data.weekly_off,
                company_name: req.body.company_name || data.company_name,
                phone_no: req.body.phone_no || data.phone_no,
                contact_person: req.body.contact_person || data.contact_person,
                branch_email: req.body.branch_email || data.branch_email,
                year_of_establish: req.body.year_of_establish || data.year_of_establish,
                fax: req.body.fax || data.fax,
                branch_mobile: req.body.branch_mobile || data.branch_mobile,
                pan_no: req.body.pan_no || data.pan_no,
                header: req.body.header || data.header,
                cst: req.body.cst || data.cst,
                excise_registration: req.body.excise_registration || data.excise_registration,
                footer: req.body.footer || data.footer,
                associate_user: req.body.associate_user || data.associate_user,
                associate_warehouse: req.body.associate_warehouse || data.associate_warehouse,
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
                .catch((err) => res.status(404).send(err))
        })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}

exports.deleteBranch = async (req, res) => {
    try {
        const branch = await Branch.findByPk(req.body.id)
        if (!branch) {
            return res.status(404).json({
                message: "branch not found"
            })
        } else {
            Branch.update({
                isDeleted: req.body.isDeleted
            }, {
                where: {
                    id: req.body.id
                }
            }).then((_) => {
                res.status(200).send({
                    message: "branch Deleted",
                    branch
                })
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}

exports.branchGetById = async (req, res) => {
    try {
        const branch = await Branch.findOne({ where: { id: req.body.id } })
        if (!branch) {
            return res.status(404).json({
                message: "branch not found"
            })
        } else {
            res.status(200).send({
                message: "branch Deleted",
                branch
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}
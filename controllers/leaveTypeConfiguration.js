const {
    QueryTypes
} = require('sequelize');
// const { SELECT } = require('sequelize/types/query-types');
const {
    LeaveTypeConfiguration,
    User
} = require('../models')
const model = require('../models');
const db = require('../models/index')

exports.get = async (req, res) => {
    const {
        owner_id,
        company_id
    } = req.body;
    if (!owner_id || !company_id) {
        return res.status(404).json({
            message: "send owner id and company id",
        })
    }
    try {
        var leaveType = await LeaveTypeConfiguration.findOne({
            where: {
                owner_id: owner_id,
                company_id: company_id
            }
        })
        if (!leaveType) {
            return res.status(200).json({
                message: "Not Found",
                leaveType: {}
            })
        } else {
            return res.status(200).json({
                message: "Success",
                leaveType
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            message: "Server Error",
            error
        })
    }

}
exports.add = async (req, res) => {
    const {
        data,
        owner_id,
        company_id
    } = req.body;
    if (!owner_id || !company_id) {
        return res.status(404).json({
            message: "send owner id and company id",
        })
    }
    try {
        var insertPayload = {
            data: data,
            owner_id: owner_id,
            company_id: company_id
        }
        var leaveType = await LeaveTypeConfiguration.create(insertPayload)

        return res.status(200).json({
            message: "Success",
            leaveType
        })

    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            message: "Server Error",
            error
        })
    }

}
exports.edit = async (req, res) => {
    const {
        data,
        owner_id,
        company_id
    } = req.body;
    if (!owner_id || !company_id) {
        return res.status(404).json({
            message: "send owner id and company id",
        })
    }
    try {
        //Currently updating using owner and comoany id could be changed to direct id if conflict arises
        var leaveType = await LeaveTypeConfiguration.update({ data: data }, { where: { company_id: company_id, owner_id: owner_id } })

        return res.status(200).json({
            message: "Success",
            leaveType
        })

    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            message: "Server Error",
            error
        })
    }

}

exports.getById = async (req, res) => {
    try {
        var leaveTyp = await LeaveTypeConfiguration.findOne({
            where: {
                id: req.body.id
            }
        })

        if (!leaveTyp) {
            return res.status(404).json({
                message: "leav not found"
            })
        } else {
            return res.status(200).json({
                message: "leav type",
                leaveTyp
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error
        })
    }
}
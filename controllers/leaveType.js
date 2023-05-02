const {
    QueryTypes
} = require('sequelize');
// const { SELECT } = require('sequelize/types/query-types');
const {
    LeaveType,
    User
} = require('../models')
const model = require('../models');
const db = require('../models/index')

exports.get = async (req, res) => {
    const {
        owner_id,
        company_id,
        isDeleted
    } = req.body;
    if (!owner_id || !company_id) {
        return res.status(400).json({
            message: "send owner id and company id",
        })
    }
    try {
        var leaveType = await LeaveType.findAndCountAll({
            where: {
                owner_id: owner_id,
                company_id: company_id,
                isDeleted: isDeleted
            },
            limit: req.body.limit,
            offset: req.body.offset
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
        leave_amount_criteria,
        owner_id,
        company_id,
        leave_name,
        no_of_days
    } = req.body;
    if (!owner_id || !company_id) {
        return res.status(404).json({
            message: "send owner id and company id",
        })
    }
    const leaveName = await LeaveType.findOne({
        where:{
            leave_name:leave_name,
            owner_id:owner_id
        }
    })
    if(leaveName){
        return res.status(404).json({
            message: "duplicate leave",
        })
    }
    try {
        var insertPayload = {
            data: data,
            leave_amount_criteria: leave_amount_criteria,
            owner_id: owner_id,
            company_id: company_id,
            leave_name:leave_name,
            no_of_days:no_of_days

        }
        var leaveType = await LeaveType.create(insertPayload)

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
        leave_amount_criteria,
        _id,
        leave_name,
        no_of_days
    } = req.body;
    // if (!owner_id || !company_id) {
    //     return res.status(400).json({
    //         message: "send owner id and company id",
    //     })
    // }
    try {
        //Currently updating using owner and comoany id could be changed to direct id if conflict arises
        var leaveType = await LeaveType.update(
            {
                data: data,
                leave_amount_criteria:leave_amount_criteria,
                leave_name:leave_name,
                no_of_days:no_of_days
            },
            {
                where: {
                    id: _id
                }
            }
        )

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
        var leave_type = await LeaveType.findOne({ where: { id: req.body.id } })
        if (!leave_type) {
            return res.status(404).json({
                message: "leav not found"
            })
        } else {
            return res.status(200).json({
                message: "leav type",
                leave_type
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error
        })
    }
}

exports.deleteByID = async (req, res) => {
    try {
        const data = await LeaveType.findOne({ where: { id: req.body.id } })
        if (!data) {
            return res.status(404).json({
                message: "not found"
            })
        } else {
            LeaveType.update({
                isDeleted: req.body.isDeleted
            }, {
                where: {
                    id: req.body.id
                }
            }).then((_) => {
                res.status(200).send({
                    message: "Delete",
                    // data
                })
            })
        }
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
}
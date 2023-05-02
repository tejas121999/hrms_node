const {
    QueryTypes
} = require('sequelize');
// const { SELECT } = require('sequelize/types/query-types');
const {
    AccessMaster
} = require('../models')
const model = require('../models');
const db = require('../models/index')


exports.add = async (req, res) => {
    const {
        data,
        role_id,
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
            role_id: role_id,
            owner_id: owner_id,
            company_id: company_id
        }
        var accessMaster = await AccessMaster.create(insertPayload)

        return res.status(200).json({
            message: "Success",
            accessMaster
        })

    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            message: "Server Error",
            error
        })
    }

}
const { RoleManagerNew ,AccessMaster } = require('../models')
const model = require('../models');

exports.getRoleNew = async (req, res) => {
    try {
        var role = await RoleManagerNew.findAndCountAll({
            where: {
                isDeleted: req.body.isDeleted,
                // role_owner_id: req.body.role_owner_id
            },
            limit: req.body.limit,
            offset: req.body.offset
        })
        if (!role) {
            return res.status(404).json({
                message: "Something went wrong"
            })
        } else {
            return res.status(200).json({
                message: "Success",
                role
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send(error.message)
    }
}

exports.addRole = async (req, res) => {
    try {
        const {
            role_name,
            clone_role,
            role_type,
            role_owner_id,
            isDeleted,
            accessMaster,
            
        } = req.body

        var role = await RoleManagerNew.create({
            role_name,
            clone_role,
            role_type,
            role_owner_id,
            isDeleted
        })
        if (!role) {
            return res.status(404).json({
                message: "failed to create"
            })
        } else {
            
            accessMaster.role_id = role.id 
            
            var addAccess = await AccessMaster.create(
                accessMaster
        )
            console.log("addAccess",addAccess)
            if (addAccess) {
                return res.status(200).json({
                    message: "created",
                    role,
                    accessMaster
                })
            }
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send(error.message)
    }
}

exports.cloneRole = async (req, res) => {
    try {
        var clone = await AccessMaster.findOne({ where: { role_id: req.body.role_id } })
        if (!clone) {
            return res.status(404).json({
                message: "This Role Dosen't Have Any Access"
            })
        } else {
            return res.status(200).json({
                message: "created",
                clone
            })
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}
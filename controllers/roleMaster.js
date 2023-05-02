const { RoleManager, UserAccess } = require('../models')
const model = require('../models');


exports.getRole = async (req, res) => {
    try {
        var role = await RoleManager.findAndCountAll({
            where: {
                isDeleted: req.body.isDeleted,
                role_owner_id: req.body.role_owner_id
            },
            limit: req.body.limit,
            offset: req.body.offset,
            // include: [
            //     {
            //         model: model.Owner,
            //         as: "role_owner_data",
            //         subQuery: false,
            //         attributes: [
            //             'owner_name'
            //         ]
            //     }
            // ]
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
            roll_name,
            colne_roll,
            type_roll,
            role_owner_id,
            isDeleted,
            access
        } = req.body

        var role = await RoleManager.create({
            roll_name,
            colne_roll,
            type_roll,
            role_owner_id,
            isDeleted
        })
        if (!role) {
            return res.status(404).json({
                message: "failed to create"
            })
        } else {

            access.role_id = role.id
            console.log("access", access)
            // const { role_id, access } = req.body
            delete access['id']
            delete access['createdAt']
            delete access['updatedAt']
            var addAccess = await UserAccess.create(
                access
            )
            console.log(addAccess)
            if (addAccess) {
                return res.status(200).json({
                    message: "created",
                    role,
                    access
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
        var clone = await UserAccess.findOne({ where: { role_id: req.body.role_id } })
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

exports.editRole = async (req, res) => {
    try {
        const { role_id, addRole } = req.body
        var role = await RoleManager.update(
            addRole,
            {
                where: {
                    id: role_id
                }
            }
        )
        return res.status(200).send({
            message: "updated Role",
            role
        })
    } catch (error) {
        res.status(500).send(error.message)
    }
}

exports.editAccess = async (req, res) => {
    try {
        const { role_id, access } = req.body
        var editAccess = await UserAccess.update(
            access,
            {
                where: {
                    role_id: role_id
                }
            }
        )
        return res.status(200).send({
            message: "updated Role",
            editAccess
        })
    } catch (error) {
        res.status(500).send(error.message)
    }
}

exports.deleteRole = async (req, res) => {
    try {
        var role = await RoleManager.findOne({ where: { id: req.body.role_id } })
        if (!role) {
            return res.status(404).json({
                message: "role not found"
            })
        } else {
            RoleManager.update({
                isDeleted: req.body.isDeleted
            }, {
                where: {
                    id: req.body.role_id
                }
            }).then((_) => {
                res.status(200).send({
                    message: "Delete",
                    // data
                })
            })
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

exports.getAccessByroleId = async (req, res) => {
    try {
        var data = await UserAccess.findOne({
            where: {
                role_id: req.body.role_id
            },
            include: [
                {
                    model: model.RoleManager,
                    as: 'role_data',
                    subQuery: false,
                    attributes: [
                        "roll_name",
                        "colne_roll",
                        'type_roll'
                    ]
                }
            ]
        })
        if (!data) {
            return res.status(404).json({
                message: "This Role Dosen't Have Any Access"
            })
        } else {
            return res.status(200).json({
                message: "access",
                data
            })
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}


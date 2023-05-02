const { RigManifest } = require('../models')

exports.getRigManifest = async (req, res) => {
    try {
        var rigManifest = await RigManifest.findAndCountAll({
            where: {
                isDeleted: req.body.isDeleted,
                rig_owner_id: req.body.rig_owner_id
            },
            limit: req.body.limit,
            offset: req.body.offset
        })
        if (!rigManifest) {
            return res.status(404).json({
                message: "Something went wrong"
            })
        } else {
            return res.status(200).json({
                message: "Success",
                rigManifest
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}

exports.addRigManifest = async (req, res) => {
    try {
        var date = new Date()
        const {
            rig_owner_id,
            name,
            description,
            rigmanifest_date,
            upload,
            code } = req.body
        var rigManifest = await RigManifest.create({
            rig_owner_id,
            name,
            description,
            rigmanifest_date,
            upload,
            code,
            createdAt: date,
            updatedAt: date
        })
        if (!rigManifest) {
            return res.status(404).json({
                message: "failed to create"
            })
        } else {
            return res.status(200).json({
                message: "created",
                rigManifest
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}

exports.updateRigManifest = async (req, res) => {
    try {
        var date = new Date()
        RigManifest.findByPk(req.body.id).then((data) => {
            RigManifest.update({
                name: req.body.name || data.name,
                description: req.body.description || data.description,
                rigmanifest_date: req.body.rigmanifest_date || data.rigmanifest_date,
                upload: req.body.upload || data.upload,
                code: req.body.code || data.code,
                updatedAt: date
            }, {
                where: {
                    id: req.body.id
                }
            }
            ).then((_) => {
                res.status(200).send({
                    message: "update",
                    data
                })
            })
                .catch((err) => res.status(404).send(err))
        })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}

exports.getRigManifestById = async (req, res) => {
    try {
        const rigManifest = await RigManifest.findOne({ where: { id: req.body.id } })
        if (!rigManifest) {
            return res.status(404).json({
                message: "rigManifest not found"
            })
        } else {
            res.status(200).send({
                message: "rigManifest Deleted",
                rigManifest
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}

exports.deleteRigManifest = async (req, res) => {
    try {
        console.log(req.body)
        const rigManifest = await RigManifest.findOne({ where: { id: req.body.id } })
        if (!rigManifest) {
            return res.status(404).json({
                message: "rigManifest not found"
            })
        } else {
            RigManifest.update({
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
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}

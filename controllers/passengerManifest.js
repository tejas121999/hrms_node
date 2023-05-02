const { PassengerManifest } = require("../models")

exports.getPassengerManifest = async (req, res) => {
    try {
        var passengerManifest = await PassengerManifest.findAndCountAll({
            where: {
                owner_id: req.body.owner_id,
                isDeleted: req.body.isDeleted,
            },
            limit: req.body.limit,
            offset: req.body.offset
        })
        if (!passengerManifest) {
            return res.status(404).json({
                message: "Something went wrong"
            })
        } else {
            return res.status(200).json({
                message: "Success",
                passengerManifest
            })
        }
    } catch (error) {
        console.error("errr====", error.message)
        res.status(500).send("Server Error")

    }
}

exports.addPassengerManifest = async (req, res) => {
    try {
        var date = new Date()
        const {
            owner_id,
            type,
            purchasing,
            sub_vendor_code,
            vendor_code,
            plant,
            passengerManifest_date,
            company_name,
            company_address,
            RFM_number,
            mode_of_journey,
            vendor_name,
            scheduled_secto,
            date_of_sortie,
            scheduled_dep_time,
            task, sortie_type,
            plant_of_manifest,
            remark,
            scheduled_sector
        } = req.body
        var passengerManifest = await PassengerManifest.create({
            owner_id,
            type,
            purchasing,
            sub_vendor_code,
            vendor_code,
            plant,
            passengerManifest_date,
            company_name,
            company_address,
            RFM_number,
            mode_of_journey,
            vendor_name,
            scheduled_secto,
            date_of_sortie,
            scheduled_dep_time,
            task, sortie_type,
            plant_of_manifest,
            remark,
            scheduled_sector,
            createdAt: date,
            updatedAt: date
        })
        if (!passengerManifest) {
            return res.status(404).json({
                message: "failed to create"
            })
        } else {
            return res.status(200).json({
                message: "created",
                passengerManifest
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}

exports.updatePassengerManifest = async (req, res) => {
    try {
        var date = new Date()
        const data = await PassengerManifest.findByPk(req.body.id)
        if (!data) {
            return res.status(404).json({
                message: "passenger manifest not found"
            })
        } else {
            PassengerManifest.update({
                type: req.body.type || data.type,
                purchasing: req.body.purchasing || data.purchasing,
                sub_vendor_code: req.body.sub_vendor_code || data.sub_vendor_code,
                vendor_code: req.body.vendor_code || data.vendor_code,
                plant: req.body.plant || data.plant,
                passengerManifest_date: req.body.passengerManifest_date || data.passengerManifest_date,
                company_name: req.body.company_name || data.company_name,
                company_address: req.body.company_address || data.company_address,
                RFM_number: req.body.RFM_number || data.RFM_number,
                mode_of_journey: req.body.mode_of_journey || data.mode_of_journey,
                vendor_name: req.body.vendor_name || data.vendor_name,
                scheduled_secto: req.body.scheduled_secto || data.scheduled_secto,
                date_of_sortie: req.body.date_of_sortie || data.date_of_sortie,
                scheduled_dep_time: req.body.scheduled_dep_time || data.scheduled_dep_time,
                task: req.body.task || data.task,
                sortie_type: req.body.sortie_type || data.sortie_type,
                plant_of_manifest: req.body.plant_of_manifest || data.plant_of_manifest,
                remark: req.body.remark || data.remark,
                scheduled_sector:req.body.scheduled_sector || data.scheduled_sector,
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
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}

exports.deletePassengerManifest = async (req, res) => {
    try {
        const passengerManifest = await PassengerManifest.findOne({ where: { id: req.body.id } })
        if (!passengerManifest) {
            return res.status(404).json({
                message: "passenger manifest not found"
            })
        } else {
            PassengerManifest.update({
                isDeleted: req.body.isDeleted
            }, {
                where: {
                    id: req.body.id
                }
            }).then((_) => {
                res.status(200).send({
                    message: "Passenger Manifest Deleted"
                })
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send(error.message)
    }
}

exports.getPassengerManifestById = async (req, res) => {
    try {
        const passengerManifest = await PassengerManifest.findOne({ where: { id: req.body.id } })
        if (!passengerManifest) {
            return res.status(404).json({
                message: "passenger Manifest not found"
            })
        } else {
            res.status(200).send({
                message: "passenger Manifest",
                passengerManifest
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}
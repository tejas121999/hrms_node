const db = require('../models')
const { Shift, shift_half_day_full_day, ShiftMetaData } = require('../models')
const { QueryTypes } = require('sequelize');

exports.getShift = async (req, res) => {
    try {
        var shift = await Shift.findAndCountAll({
            where: {
                isDeleted: req.body.isDeleted,
                shift_owner_id: req.body.shift_owner_id
            },
            limit: req.body.limit,
            offset: req.body.offset,
            // include: [shift_half_day_full_day]
            include: [ShiftMetaData]
        })
        if (!shift) {
            return res.status(404).json({
                message: "Something went wrong"
            })
        } else {
            return res.status(200).json({
                message: "Success",
                shift
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}

exports.addShift = async (req, res) => {
    try {
        var date = new Date()
        const {
            shiftData,
            shiftGeneral,
            shift_days
        } = req.body
        var shift = await Shift.create(
            shiftData
        )
        shift_days.forEach(element => {
            element.shift_id = shift.id
        });
        if (shiftGeneral != null) {
            var payload = {
                "shift_id": shift.id,
                "code": shiftGeneral.code,
                "description": shiftGeneral.description,
                "flexible_time": shiftGeneral.flexible_time,
                "break_shift": shiftGeneral.break_shift,
                "cutof_time": shiftGeneral.cutof_time,
                "break_time": shiftGeneral.break_time
            }
            var shoftGeneral = await ShiftMetaData.create(payload)
            // return res.status(200).json({
            //     message: "created",
            //     shoftGeneral
            // })
        }

        var shiftDay = await shift_half_day_full_day.bulkCreate(shift_days)
        if (!shift) {
            return res.status(404).json({
                message: "failed to create"
            })
        } else {
            return res.status(200).json({
                message: "created",
                shift,
                shiftDay,
                shoftGeneral
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}

exports.updateShift = async (req, res) => {
    try {
        const { shiftData, shiftGeneral, shift_days, delete_shiftDays } = req.body
        const data = await Shift.findOne({ where: { id: shiftData.id } })
        if (!data) {
            return res.status(404).json({
                message: "Shift not found"
            })
        } else {
            var shiftDataUpdate = await Shift.update(shiftData, {
                where: {
                    id: shiftData.id
                }
            }
            ).then(async (_) => {
                if (shiftGeneral != null) {
                    var payload = {
                        "code": shiftGeneral.code,
                        "description": shiftGeneral.description,
                        "flexible_time": shiftGeneral.flexible_time,
                        "break_shift": shiftGeneral.break_shift,
                        "cutof_time": shiftGeneral.cutof_time,
                        "break_time": shiftGeneral.break_time
                    }
                    var general_shift_update = await ShiftMetaData.update(payload, {
                        where: {
                            shift_id: shiftData.id,
                        }
                    })
                }
                for await (const element of shift_days) {
                    let payload = {
                        "shift_id": shiftData.id,
                        "day": element.day,
                        "week_days": element.week_days,
                        "off_days": element.off_days
                    }
                    var shiftDays = await shift_half_day_full_day.upsert(payload)
                }

                if (delete_shiftDays) {
                    let shiftDaysID = delete_shiftDays.map((ele) => ele.id);
                    shift_half_day_full_day.destroy({
                        where: {
                            id: shiftDaysID
                        }
                    })
                }

                res.status(200).send({
                    message: "Updated Successfully",
                    shiftDataUpdate, shiftDays, general_shift_update
                })
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}
exports.deleteShift = async (req, res) => {
    try {
        const { shiftMetaDataDelete } = req.body
        const shift = await Shift.findOne({ where: { id: req.body.id } })
        // const shiftMetaData = await ShiftMetaData.findOne({ where: { id: req.body.id } })
        if (!shift) {
            return res.status(404).json({
                message: "Shift not found"
            })
        } else {
            Shift.update({
                isDeleted: req.body.isDeleted
            }, {
                where: {
                    id: req.body.id
                }
            }).then(async (_) => {
                if (shiftMetaDataDelete) {
                    var payload = {
                        "isDeleted": shiftMetaDataDelete.isDeleted
                    }
                    var ShiftMetaData_Delete = await ShiftMetaData.update(payload, {
                        where: {
                            shift_id: req.body.id,
                        }
                    })
                }
                res.status(200).send({
                    message: "Delete Successfully",
                    ShiftMetaData_Delete
                })
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}

// exports.deleteShift = async (req, res) => {
//     try {
//         const { delete_shiftMetaData } = req.body
//         var shift = await Shift.findByPk(req.body.id)
//         if (!shift) {
//             return res.status(401).json({
//                 message: "Shift not found"
//             })
//         } else {
//             Shift.update({
//                 isDeleted: req.body.isDeleted
//             }, {
//                 where: {
//                     id: req.body.id
//                 }
//             }).then((_) => {

//                 if (delete_shiftMetaData) {
//                     let shiftDaysID = delete_shiftMetaData.map((ele) => ele.id);
//                     ShiftMetaData.destroy({
//                         where: {
//                             id: shiftDaysID
//                         }
//                     })
//                 }

//                 res.status(200).send({
//                     message: "Shift Deleted",
//                     shift
//                 })
//             })
//         }
//     } catch (error) {
//         console.error(error.message)
//         res.status(500).send("Server Error")
//     }
// }

exports.getShiftById = async (req, res) => {
    try {
        const shift = await Shift.findOne({ where: { id: req.body.id } })
        if (!shift) {
            return res.status(404).json({
                message: "shift not found"
            })
        } else {
            res.status(200).send({
                message: "shift Deleted",
                shift
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}

exports.fullDayData = async (req, res) => {
    try {
        // const ShiftDays = await db.sequelize.query('SELECT sd.id as sd_id,s.* from shift_day sd left join `shift` s on s.id = sd.shift_id where shift_id and  =' + shift_id, { type: QueryTypes.SELECT })
        // const ShiftDays = await db.sequelize.query('select sd.id as _id, sd.shift_id as sd_id, sd.day, sd.week_days, sd.off_days, s.* from shift_day sd left join shift sd on sd.id = sd.shift_id where shift_id =' + shift_id, { type: QueryTypes.SELECT })
        var days = await shift_half_day_full_day.findAll({
            where: {
                shift_id: req.body.shift_id,
                day: "FD"
            }
        })

        // var 
        if (!days) {
            return res.status(404).json({
                message: "package not found"
            })
        } else {
            res.status(200).send({
                message: "days",
                days
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: error
        })
    }
}

exports.halfDayData = async (req, res) => {
    try {
        // const ShiftDays = await db.sequelize.query('SELECT sd.id as sd_id,s.* from shift_day sd left join `shift` s on s.id = sd.shift_id where shift_id and  =' + shift_id, { type: QueryTypes.SELECT })
        // const ShiftDays = await db.sequelize.query('select sd.id as _id, sd.shift_id as sd_id, sd.day, sd.week_days, sd.off_days, s.* from shift_day sd left join shift sd on sd.id = sd.shift_id where shift_id =' + shift_id, { type: QueryTypes.SELECT })
        var days = await shift_half_day_full_day.findAll({
            where: {
                shift_id: req.body.shift_id,
                day: "HD"
            }
        })

        // var 
        if (!days) {
            return res.status(404).json({
                message: "package not found"
            })
        } else {
            res.status(200).send({
                message: "days",
                days
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}

exports.addShiftMetaData = async (req, res) => {
    try {
        const { shiftPayload, shiftMetaDataPayload } = req.body
        const shift = await Shift.create(shiftPayload);
        console.log("shift", shift);
        console.log("shift id", shift.id);

        shiftMetaDataPayload.forEach(element => {
            console.log("elements", element);
            element.shift_id = shift.id
        })
        console.log(shiftMetaDataPayload);
        const shiftMetaDataResult = await ShiftMetaData.bulkCreate(shiftMetaDataPayload)
        console.log("shiftMetaDataResult", shiftMetaDataResult);
        if (!shift) {
            return res.status(404).json({
                message: "failed to create"
            })
        } else {
            return res.status(200).json({
                message: "created",
                shift,
                shiftMetaDataResult
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}


exports.updateShiftAndShiftMetaData = async (req, res) => {
    try {
        const { shiftData, shiftMeta, delete_shiftMetaData } = req.body
        const data = await Shift.findOne({ where: { id: shiftData.id } })
        if (!data) {
            return res.status(404).json({
                message: "Shift not found"
            })
        } else {
            var shiftDataUpdate = await Shift.update(shiftData, {
                where: {
                    id: shiftData.id
                }
            }
            ).then(async (_) => {
                for await (const element of shiftMeta) {
                    let payload = {
                        "id": element.id,
                        "shift_id": shiftData.id,
                        "description": element.description,
                        "flexible_time": element.flexible_time,
                        "break_shift": element.break_shift,
                        "cutof_time": element.cutof_time,
                        "break_time": element.break_time
                    }
                    var shiftMetaData = await ShiftMetaData.upsert(payload)
                }
                if (delete_shiftMetaData) {
                    let shiftDaysID = delete_shiftMetaData.map((ele) => ele.id);
                    ShiftMetaData.destroy({
                        where: {
                            id: shiftDaysID
                        }
                    })
                }

                res.status(200).send({
                    message: "Updated Successfully",
                    shiftDataUpdate, shiftMetaData
                })
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}


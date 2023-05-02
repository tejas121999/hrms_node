const { Attendence, Employee, EmpAttendance } = require('../models')
const model = require('../models');
const { Op } = require("sequelize");
const moment = require('moment');


exports.Sandwich_weekly_off_for_absent_employee = async (req, res) => {
    try {
        const { employee_id } = req.body
        var data = await Attendence.findOne({ where: { employee_id: employee_id } })
        console.log(data.attendence_date)
        const d = new Date(data.attendence_date);
        d.setDate(d.getDate() - 3)
        // let day = d.getDay()
        var attendence = await Attendence.findOne({
            where: {
                employee_id: employee_id,
                attendence_date: d
            }
        })

        if (!attendence) {
            res.status(200).json({
                message: "Sandwich Weekly Off"
            })
        } else {
            res.status(200).json({
                message: "Employee Present"
            })
        }


    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error
        })
    }
}

exports.Deduct_full_day_leave_if_employee_is_coming_after_half_day_time = async (req, res) => {
    try {
        const { employee_id } = req.body
        var data = await Attendence.findOne({
            where:
            {
                employee_id: employee_id,
                attendence_date: new Date()
            }
        })
        const employee = await Employee.findOne({
            where: {
                id: employee_id
            },
            include: [
                {
                    model: model.Shift,
                    as: 'shift_data',
                    subQuery: false,
                    attributes: [
                        'shift_name',
                        'start_time',
                        'end_time',
                        'half_day_time',
                        "late_mark_time"
                    ]
                }
            ]
        })
        if (data == null && data?.inTime == employee?.shift_data.half_day_time) {
            res.status(200).send({
                message: "Deduct",
                data
            })
        } else {
            res.status(200).send({
                message: "Not Deduct"
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

exports.Deduct_half_day_leave_if_employee_is_coming_after_grace_period = async (req, res) => {
    try {
        const { employee_id } = req.body
        var data = await Attendence.findOne({
            where:
            {
                employee_id: employee_id,
                attendence_date: new Date()
            }
        })
        const employee = await Employee.findOne({
            where: {
                id: employee_id
            },
            include: [
                {
                    model: model.Shift,
                    as: 'shift_data',
                    subQuery: false,
                    attributes: [
                        'shift_name',
                        'start_time',
                        'end_time',
                        'half_day_time',
                        "late_mark_time"
                    ]
                }
            ]
        })

        if (data == null && data?.inTime == employee?.shift_data?.late_mark_time) {
            res.status(200).send({
                message: "Deduct",
                data
            })
        } else {
            res.status(200).send({
                message: "Not Deduct"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Server Error"
        })
    }
}
// attendence
exports.Show_late_mark_in_my_attendance = async (req, res) => {
    try {
        const { employee_id, from_date, to_date } = req.body
        var data = await Attendence.findAll({
            where: {
                employee_id: employee_id,
                attendence_date: {
                    [Op.between]: [from_date, to_date]
                }
            }
        })

        const employee = await Employee.findOne({
            where: {
                id: employee_id
            },
            include: [
                {
                    model: model.Shift,
                    as: 'shift_data',
                    subQuery: false,
                    attributes: [
                        'shift_name',
                        'start_time',
                        'end_time',
                        'half_day_time',
                        "late_mark_time"
                    ]
                }
            ]
        })

        var lateMarkData = []
        data.forEach((data) => {
            var in_time = new Date(data.inTime).getTime()
            var lateMarkTime = new Date(employee.shift_data.late_mark_time).getTime()
            if (in_time == lateMarkTime) {
                var temp = {
                    "attendence_date": data.attendence_date
                }
                lateMarkData.push(temp)
            }
        })

        if (lateMarkData.length == 0) {
            res.status(404).send({
                message: "Not Found"
            })
        } else {
            res.status(200).send({
                message: "Data",
                lateMarkData
            })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

// mark attendence

exports.showLateMarkData = async (req, res) => {
    try {
        const { employee_id, from_date, to_date, owner_id } = req.body
        var data = await Attendence.findAll({
            where: {
                owner_id: owner_id,
                employee_id: employee_id,
                attendence_date: {
                    [Op.between]: [from_date, to_date]
                }
            }
        })

        const employee = await Employee.findOne({
            where: {
                id: employee_id
            },
            include: [
                {
                    model: model.Shift,
                    as: 'shift_data',
                    subQuery: false,
                    attributes: [
                        'shift_name',
                        'start_time',
                        'end_time',
                        'half_day_time',
                        "late_mark_time"
                    ]
                }
            ]
        })
        var lateMarkData = []
        data.forEach((data) => {
            if (data.inTime != null && employee.shift_data != null) {
                var start_time = new Date(data.inTime)
                var lateMarkTime = new Date(employee.shift_data.late_mark_time)
                if (start_time > lateMarkTime) {
                    var temp = {
                        "late_mark": new Date(data.attendence_date)
                    }
                    lateMarkData.push(temp)
                }
            }
        })

        console.log("test", lateMarkData)
        if (lateMarkData.length == 0) {
            res.status(404).send({
                message: "Not Found"
            })
        } else {
            res.status(200).send({
                message: "Data",
                lateMarkData
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

exports.getPresentDays = async (req, res) => {
    try {
        const { employee_id, from_date, to_date, status, owner_id } = req.body
        var data = await Attendence.findAll({
            where: {
                owner_id: owner_id,
                employee_id: employee_id,
                attendence_date: {
                    [Op.between]: [from_date, to_date]
                },
                status: {
                    [Op.or]: status
                }
            }
        })

        if (!data) {
            res.status(404).send({
                message: "Not Found"
            })
        } else {
            res.status(200).send({
                message: "Data",
                data
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

exports.getShiftOfEmployee = async (req, res) => {
    try {
        const { employee_id } = req.body
        const employee = await Employee.findOne({
            where: {
                id: employee_id
            },
            include: [
                {
                    model: model.Shift,
                    as: 'shift_data',
                    subQuery: false,
                    attributes: [
                        'shift_name',
                        'start_time',
                        'end_time',
                        'half_day_time',
                        "late_mark_time"
                    ]
                }
            ]
        })
        if (!employee) {
            res.status(404).send({
                message: "Not Found"
            })
        } else {
            res.status(200).send({
                message: "Data",
                employee
            })
        }

    } catch (error) {
        return res.status(500).json({
            message: "Server Error"
        })
    }
}






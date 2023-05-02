const moment = require('moment/moment');
const corn = require("node-cron")
const { format } = require('mysql2');
const db = require('../models');
const { Attendence, EmpAttendance, Employee, Employee_Leave } = require('../models')
const model = require('../models');
const { QueryTypes, where } = require('sequelize');
const { Op } = require("sequelize");

exports.getAttendence = async (req, res) => {
    try {
        var attendence = await Attendence.findAndCountAll({
            where: {
                owner_id: req.body.owner_id,
                attendence_date: req.body.attendence_date,
                status: {
                    [Op.or]: req.body.status
                },
            },
            limit: req.body.limit,
            offset: req.body.offset,
            include: [
                {
                    model: model.Employee,
                    as: 'emp_attendence_data',
                    subQuery: false,
                    attributes: [
                        'work_email',
                        "first_name",
                        "last_name"
                    ]
                },
            ]
        })

        if (!attendence) {
            return res.status(404).json({
                message: "Something went wrong"
            })
        } else {
            return res.status(200).json({
                message: "Success",
                attendence
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Server Error",
            error
        })
    }
}

exports.punchin = async (req, res) => {
    try {
        var date = new Date()
        var dd = String(date.getDate()).padStart(2, '0')
        var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = date.getFullYear();
        date = yyyy + '-' + mm + '-' + dd;
        const employee = await Employee.findOne({
            where: {
                id: req.body.employee_id
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

        const data = await Attendence.findOne({
            where: {
                employee_id: req.body.employee_id,
                owner_id: req.body.owner_id,
                attendence_date: date
            }
        })
        if (!data) {
            // add attendence
            const inTime = new Date()
            const outTime = null
            const shift_time = new Date(employee?.shift_data.start_time).getTime()
            var hours = Math.abs(inTime - outTime) / 36e5;
            const { owner_id, employee_id, roundOf } = req.body
            if (inTime.getTime() > shift_time) {
                var attendence = await Attendence.create({
                    owner_id,
                    employee_id,
                    inTime,
                    outTime,
                    hours,
                    roundOf,
                    status: "late coming",
                    attendence_date: date,
                    createdAt: date,
                    updatedAt: date
                })
            } else {
                var attendence = await Attendence.create({
                    owner_id,
                    employee_id,
                    inTime,
                    outTime,
                    hours,
                    roundOf,
                    status: "present",
                    attendence_date: date,
                    createdAt: date,
                    updatedAt: date
                })
            }

            if (!attendence) {
                return res.status(404).json({
                    message: "failed to create"
                })
            } else {
                return res.status(200).json({
                    message: "User Panchin Successfully",
                    attendence
                })
            }
        } else {
            // update attendence
            const outTime = new Date()
            const intime = data.inTime
            var totlaTime = Math.abs(data.inTime - outTime) / 36e5;
            const shift_end_time = new Date(employee?.shift_data?.end_time).getTime()
            if (outTime.getTime() > shift_end_time) {
                Attendence.update({
                    isPunchin: true,
                    inTime: data.inTime,
                    outTime: outTime,
                    hours: totlaTime,
                    roundOf: "1",
                    attendence_date: date,
                    status: "early going",
                }, {
                    where: {
                        employee_id: req.body.employee_id
                    }
                }).then((_) => {
                    res.status(200).send({
                        message: "Early Going",
                        intime, outTime, totlaTime
                    })
                })
            } else {
                Attendence.update({
                    isPunchin: true,
                    inTime: data.inTime,
                    outTime: outTime,
                    hours: totlaTime,
                    roundOf: "1",
                    attendence_date: date
                }, {
                    where: {
                        employee_id: req.body.employee_id
                    }
                }).then((_) => {
                    res.status(200).send({
                        message: "Punchout Successfully",
                        intime, outTime, totlaTime
                    })
                })
            }
        }
    } catch (error) {
        if (error?.parent?.code) {
            return res.status(404).json({
                message: "Bad request"
            })
        }
        res.status(500).json({
            message: "Server Error",
            error
        })
    }
}
exports.checkPunch = async (req, res) => {
    try {
        var date = new Date()
        var dd = String(date.getDate()).padStart(2, '0')
        var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = date.getFullYear();
        date = yyyy + '-' + mm + '-' + dd;
        const data = await Attendence.findOne({
            where: {
                employee_id: req.body.employee_id,
                owner_id: req.body.owner_id,
                attendence_date: date
            }
        })
        return res.status(200).json({
            message: "Punchin Data",
            data
        })

    } catch (error) {
        if (error.parent.code) {
            return res.status(404).json({
                message: "Bad request"
            })
        }
        res.status(500).json({
            message: "Server Error",
            error
        })
    }
}
// ask to akshet
exports.addAttendence = async (req, res) => {
    try {
        // var date = moment(Date()).format("YYYY-MM-DD")
        // var todayDate = new Date(date)
        // console.log("todayDate", todayDate);
        var { date, attendence } = req.body
        console.log(req.body)
        var getAttendence = await Attendence.findAll({
            where: {
                attendence_date: date
            }
        })

        console.log("getAttendence", getAttendence)
        const isSameUser = (a, b) => a.employee_id === b.employee_id
        const onlyInLeft = (left, right, compareFunction) =>
            left.filter(
                (leftValue) =>
                    !right.some((rightValue) => compareFunction(leftValue, rightValue))
            );


        const onlyInA = onlyInLeft(attendence, getAttendence, isSameUser);
        console.log('onlyInA', onlyInA);
        // const onlyInB = onlyInLeft(getAttendence, attendence, isSameUser);
        const result = [...onlyInA]
        console.log("result", result);

        // return res.status(200).json({
        //     message: "created",
        //     result
        // })

        if (result.length == 0) {
            return res.status(404).json({
                message: "Attendance Already Marked"
            })
        } else {
            console.log(result)
            var addAttendence = await Attendence.bulkCreate(result)
            if (!addAttendence) {
                return res.status(404).json({
                    message: "failed to create"
                })
            } else {
                return res.status(200).json({
                    message: "created",
                    addAttendence
                })
            }
        }

    } catch (error) {
        res.status(500).send(error.message)
    }
}

exports.getAllAttendence = async (req, res) => {
    try {
        var attendence = await EmpAttendance.findAndCountAll({
            where: {
                attendence_date: { [Op.gte]: req.body.attendence_date },
                attendence_owner_id: req.body.attendence_owner_id
            },
            limit: req.body.limit,
            offset: req.body.offset,
            include: [
                {
                    model: model.Employee,
                    as: 'emp_attendence_data',
                    subQuery: false,
                    attributes: [
                        'work_email',
                        "first_name",
                        "last_name"
                    ]
                },
            ]
        })
        if (!attendence) {
            return res.status(404).json({
                message: "Something went wrong"
            })
        } else {
            return res.status(200).json({
                message: "Success",
                attendence
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Server Error",
            error
        })
    }
}

exports.editAttendence = async (req, res) => {
    try {
        const { id, attendence } = req.body
        var updateattendence = await Attendence.update(
            attendence,
            {
                where: {
                    id: id
                }
            }
        )
        return res.status(200).send({
            message: "updated",
            updateattendence
        })
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            updateattendence
        })
    }
}

exports.getPresentDays = async (req, res) => {
    try {
        const { month } = req.body;
        const totalPayableDays = await db.sequelize.query("select min(employee_id),DAY(LAST_DAY('2023-02-01')) as totalDays, count(*)as presentDays,(select count(*) from holiday_employees he left join holiday h on he.holiday_id = h.id where he.employee_id = a.employee_id and MONTH(h.holiday_date)= 1 ) as holidays,(select COUNT(*) from  employee_leave WHERE emp_id = a.employee_id and isApproved = 2 and MONTH(from_date)= 1) as totalLeaves from attendance a  group by employee_id;", { type: QueryTypes.SELECT })
        // const presentDays = await db.sequelize.query("select employees.id,count(employee_name)as present,count(emp_leave_id)as apprvLeave,count(employee_id) as holiday FROM employees left join attendance on employees.id = attendance.employee_name left join employee_leave on employee_leave.emp_leave_id = employees.id left join holiday_employees on holiday_employees.employee_id = employees.id where isApproved = 2 group by employee_name,emp_leave_id,employee_id;",{ type: QueryTypes.SELECT })

        // const presentDays = await db.sequelize.query(`select count(*) as present_days,employee_name from attendance where month(attendence_date)= ${month} group by employee_name`,{ type: QueryTypes.SELECT })
        const empHoliday = await db.sequelize.query(`select count(*) as holiday,employee_id from holiday_employees he left join holiday h on h.id=he.holiday_id where month(h.holiday_date)= ${month} group by employee_id`, { type: QueryTypes.SELECT })
        const empLeave = await db.sequelize.query(`select count(*) as approved_leave,emp_id from employee_leave where month(from_date)=${month} and isApproved = 2 group by emp_id`, { type: QueryTypes.SELECT })
        if (!totalPayableDays) {
            return res.status(404).json({
                message: " not found"
            })
        } else {
            res.status(200).send({
                message: "data",
                totalPayableDays
                // presentDays
                // empHoliday,
                // empLeave
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}



exports.getMonthlyAttendance = async (req, res) => {
    try {
        const {
            employee_id,
            isApproved,
            month,
            year
        } = req.body
        var attendance = await db.sequelize.query(`select * from attendance a where employee_id =${employee_id} and month(a.attendence_date)= ${month} and YEAR(a.attendence_date)=${year}`, {
            type: QueryTypes.SELECT
        })
        var leaves = await db.sequelize.query(`select el.from_date ,el.to_date ,el.total_leave_days,l.leave_name,el.isApproved  from employee_leave el left join \`leave_type\` l on l.id=el.leave_type  where (isApproved = 2 or isApproved = 0) and emp_id =${employee_id} and   ((month(el.from_date) = ${month} and year(el.from_date)=${year} )or (month(el.to_date) = ${month} and year(el.to_date)=${year}))`, {
            type: QueryTypes.SELECT
        })
        var holidays = await db.sequelize.query(`select h.* from holiday_employees he left join holiday h on h.id=he.holiday_id  where employee_id =${employee_id}`, {
            type: QueryTypes.SELECT
        })

        var data = [];
        var schedule = getDaysArrayByMonth(year + "-" + month);
        schedule.forEach(function (item) {
            // console.log(item.format("DD/MM/YYYY"));
            // console.log(item.format("DD/MM/YYYY"),item.isoWeekday())
            data.push(getData(item, attendance, leaves, holidays))
        });
        return res.json({
            // sendRequest: attendance,
            leaves: leaves,
            // holidays:holidays,
            attendence: data.reverse()
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Server Error",
            error
        })
    }
}
function getData(date, attendance, leaves, holidays) {
    var response = {};
    response.date = date.format("DD/MM/YYYY")
    var leaveArray = leaves
    var attendence = attendance.find(o => o.attendence_date === date.format("YYYY-MM-DD"));
    var leave = leaveArray.find(function (value) {
        var fromDate = moment(value.from_date)
        fromDate.set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
        var toDate = moment(value.to_date)
        fromDate.set({ hour: 23, minute: 59, second: 59, millisecond: 0 })
        console.log(fromDate, "  ", date, " ", toDate, " ", date.isBetween(fromDate, toDate))
        return (date.isBetween(fromDate, toDate) || (date.format("DD/MM/YYYY") == fromDate.format("DD/MM/YYYY")) || (date.format("DD/MM/YYYY") == toDate.format("DD/MM/YYYY")));
    })
    var holiday = holidays.find(function (value) {
        var fromDate = moment(value.holiday_date)
        var toDate = moment(value.holiday_date)
        toDate = toDate.add(parseInt(value.holiday_day) - 1, "days")
        // console.log(parseInt(value.holiday_day))
        //  console.log(fromDate,"  ",date," ",toDate)
        return (date.isBetween(fromDate, toDate) || (date.format("DD/MM/YYYY") == fromDate.format("DD/MM/YYYY")) || (date.format("DD/MM/YYYY") == toDate.format("DD/MM/YYYY")));
    })
    // console.log(date.format("YYYY/MM/DD"))
    response.attendence = attendence;
    response.leaves = leave;
    if (!holiday) {
        if (date.isoWeekday() == 7) {
            holiday = {
                weekend: true
            }
        }
    }
    response.holiday = holiday
    if (leave) {
        response.status = "leave"
        if (attendence) {
            response.status = "present"
        }
        else if (holiday)
            response.status = "holiday"


    }
    else if (attendence) {
        response.status = "present"
    }
    else {
        response.status = "absent"
        if (holiday)
            response.status = "holiday"
    }
    if (date > new moment()) {
        response.status = "NAN"
        if (leave) {
            if (leave.isApproved == 0)
                response.status = "pending_leave_approval"
        }
    }

    return response;
}
function getDaysArrayByMonth(month) {
    var daysInMonth = moment(month, "YYYY-MM").daysInMonth();
    var arrDays = [];
    while (daysInMonth) {
        var current = moment(month, "YYYY-MM").date(daysInMonth);
        arrDays.push(current);
        daysInMonth--;
    }
    return arrDays;
}


exports.getDateAttendanceAndLeave = async (req, res) => {
    try {
        const { date, isApproved, owner_id } = req.body

        var attendances = await db.sequelize.query(`select * from attendance a where date(attendence_date)= ${date} and owner_id= ${owner_id}`, { type: QueryTypes.SELECT })
        var result = [];
        for await (let attendance of attendances) {
            var obj = attendance;
            var available = await db.sequelize.query(`select el.emp_id,el.from_date ,el.to_date ,el.total_leave_days,l.leave_name from employee_leave el left join \`leave_type\` l on l.id=el.leave_type where ${date} between el.from_date and el.to_date and emp_id = ${attendance.employee_id} and owner_id=${owner_id} and isApproved = ${isApproved} `, { type: QueryTypes.SELECT })
            obj.available = available;
            result.push(obj);
        }

        if (!attendances) {
            return res.status(404).json({
                message: " not found"
            })
        } else {
            res.status(200).send({
                message: "Success",
                result
            })
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

exports.getEmpAttendenceByDate = async (req, res) => {
    try {
        const { emp_id, date } = req.body;
        const data = await db.sequelize.query(`SELECT * FROM user.attendance
        where 
        date(attendence_date)= ${date} and employee_id = ${emp_id} `, { type: QueryTypes.SELECT })

        if (!data) {
            return res.status(404).json({
                message: " not found"
            })
        } else {
            res.status(200).send({
                message: "success",
                data
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

exports.getAllEmpAttendenceByDate = async (req, res) => {
    try {
        const { date, owner_id } = req.body;
        const data = await db.sequelize.query(`SELECT * FROM user.attendance
        where 
        date(attendence_date)= ${date} and owner_id=${owner_id}`, { type: QueryTypes.SELECT })

        if (!data) {
            return res.status(404).json({
                message: " not found"
            })
        } else {
            res.status(200).send({
                message: "success",
                data
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}



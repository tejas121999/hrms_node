const { QueryTypes, EmptyResultError } = require('sequelize');
// const { SELECT } = require('sequelize/types/query-types');
const { Employee, AssignPackage, LeavePackage, AssignShift, Package, EmergencyInformation, LeaveTypeOfEmp,User } = require('../models')
const model = require('../models');
const db = require('../models/index')
const { Op } = require("sequelize");




exports.getEmployee = async (req, res) => {
    try {
        var employee = await Employee.findAndCountAll({
            where: {
                isDeleted: req.body.isDeleted,
                user_owner_id: req.body.user_owner_id,
                isExitDetail: req.body.isExitDetail
            },
            limit: req.body.limit,
            offset: req.body.offset,
            searchEmp: req.body.searchEmp,
            include: [
                {
                    model: model.Owner,
                    as: 'user_owner_data',
                    subQuery: false,
                    attributes: [
                        'owner_name'
                    ]
                },
                {
                    model: model.Branch,
                    as: 'branch',
                    subQuery: false,
                    attributes: [
                        'branch_name',
                        'branch_code',
                        'branch_type',
                        'branch_address'
                    ]
                }
                ,
                {
                    model: model.Department,
                    as: 'department_data',
                    subQuery: false,
                    attributes: [
                        'department_name',
                        "manager_id"
                    ]
                },
                {
                    model: model.Designation,
                    as: 'designation_data',
                    subQuery: false,
                    attributes: [
                        "job_title"
                    ]
                },
                {
                    model: model.Company,
                    as: 'company_data',
                    subQuery: false,
                    attributes: [
                        'company_name',
                        'parent_company'
                    ]
                },
                {
                    model: model.Package,
                    as: 'package_data',
                    subQuery: false,
                    attributes: [
                        'package_name',
                        'annual_ctc',
                        'package_type'
                    ]
                },
                {
                    model: model.Shift,
                    as: 'shift_data',
                    subQuery: false,
                    attributes: [
                        'shift_name',
                        'start_time',
                        'end_time'
                    ]
                },
                {
                    model: model.RoleManager,
                    as: 'emp_role_data',
                    subQuery: false,
                    attributes: [
                        'roll_name',
                        'colne_roll',
                        'type_roll',
                        'access_id'
                    ]
                }
            ]
        })

        if (!employee) {
            return res.status(404).json({
                message: "Something went wrong"
            })
        } else {
            return res.status(200).json({
                message: "Success",
                employee
            })
        }
    } catch (error) {
        console.error("package", error.message)
        res.status(500).json({
            message: "Server Error",
            error
        })
    }
}

exports.getEmployeebyDepartment = async (req, res) => {
    console.log(req.body.department_id)
    var employee = await Employee.findAll({
        where: {
            isDeleted: req.body.isDeleted,
            user_owner_id: req.body.user_owner_id,
            department_id: req.body.department_id
        }
    })

    if (!employee) {
        return res.status(404).json({
            message: "Something went wrong"
        })
    } else {
        return res.status(200).json({
            message: "Success",
            employee
        })
    }
}

exports.addUser = async (req, res) => {
    try {
        const {
            employee
        } = req.body

        const user = await Employee.findOne({
            where:
            {
                work_email: employee.work_email,
                // owner_id: owner_id
            }
        })
        if (user) {
            return res.status(400).json({ message: "User already exists" })
        }

        const dataNew = await db.sequelize.query(`select count(id) as counts from employees e where user_owner_id = ${employee.user_owner_id} `, { type: QueryTypes.SELECT })
        console.log("data",dataNew[0].counts);
        
        // if(dataNew.length === 0 ) {
        //     // let empNum = "emp-";
        //     const newNum = 'emp-' + 1
        //     console.log("newNum",newNum);
        //     dataNew.push({"emp_id":`${newNum}`})

        // }else {
        //     let increment = data.length+1
        //     let result = 'emp-'+increment
        //     console.log("result",result);
        //     dataNew.push({"emp_id":`${result}`})
        // }

            employee.emp_id = dataNew[0].counts+1;
            var create_employee = await Employee.create(employee)
            console.log("create_employee",create_employee);
            if (!create_employee) {
                return res.status(404).json({
                    message: "failed to create"
                })
            } else {
                return res.status(200).json({
                    message: "created",
                    create_employee
                })
            }
        
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error
        })
    }
}

exports.editEmployee = async (req, res) => {
    try {
        const { emp_id, employee } = req.body
        var updateEmployee = await Employee.update(
            employee,
            {
                where: {
                    id: emp_id
                }
            }
        )
        return res.status(200).send({
            message: "update employee",
            updateEmployee
        })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}

exports.deleteEmployee = async (req, res) => {
    try {
        console.log(req.body)
        const data = await Employee.findOne({ where: { id: req.body.id } })
        
        if (!data) {
            return res.status(404).json({
                message: "employee not found"
            })
        } else {
            Employee.update({
                isDeleted: req.body.isDeleted
            }, {
                where: {
                    id: req.body.id
                }
            }).then((_) => {
                User.destroy({
                    where: {
                        user_emp_ID: req.body.id
                    }
                })
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

exports.getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findOne({
            where: {
                id: req.body.id
            },
            include: [
                {
                    model: model.Owner,
                    as: 'user_owner_data',
                    subQuery: false,
                    attributes: [
                        'owner_name'
                    ]
                },
                {
                    model: model.Branch,
                    as: 'branch',
                    subQuery: false,
                    attributes: [
                        'branch_name',
                        'branch_code',
                        'branch_type',
                        'branch_address'
                    ]
                }
                ,
                {
                    model: model.Department,
                    as: 'department_data',
                    subQuery: false,
                    attributes: [
                        'department_name',
                        "manager_id"
                    ]
                },
                {
                    model: model.Designation,
                    as: 'designation_data',
                    subQuery: false,
                    attributes: [
                        "job_title"
                    ]
                },
                {
                    model: model.Company,
                    as: 'company_data',
                    subQuery: false,
                    attributes: [
                        'company_name',
                        'parent_company'
                    ]
                },
                {
                    model: model.Package,
                    as: 'package_data',
                    subQuery: false,
                    attributes: [
                        'package_name',
                        'annual_ctc',
                        'overtime_daily_rate',
                        'overtime_hourly_rate'
                    ]
                },
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
                },
                {
                    model: model.RoleManager,
                    as: 'emp_role_data',
                    subQuery: false,
                    attributes: [
                        'roll_name',
                        'colne_roll',
                        'type_roll',
                        'access_id'
                    ]
                }
            ]
        })
        if (!employee) {
            return res.status(404).json({
                message: "employee not found"
            })
        } else {
            res.status(200).send({
                message: "employee",
                employee
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}

// assign 

exports.getEmployeePackages = async (req, res) => {
    try {
        const { emp_id } = req.body
        const package = await db.sequelize.query("select poe.emp_id,p.* from packageOfEmp poe left join `package` p on poe.package_id = p.id where poe.emp_id = " + emp_id + "", { type: QueryTypes.SELECT })
        const employee = await db.sequelize.query("select poe.emp_id,p.* from packageOfEmp poe left join `employees` p on poe.emp_id = p.id where poe.emp_id = " + emp_id + "", { type: QueryTypes.SELECT })

        const emp_package = []
        package.forEach(data => {
            employee.forEach(data_1 => {
                var temp = {
                    "package_name": data.package_name,
                    "annual_ctc": data.annual_ctc,
                    "first_name": data_1.first_name,
                    "last_name": data_1.last_name,
                    "email": data_1.work_email
                }
                emp_package.push(temp)
            })
        })
        if (!package) {
            return res.status(404).json({
                message: "package not found"
            })
        } else {
            res.status(200).send({
                message: "package",
                package
                // emp_package
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

exports.getLeaveofEmployee = async (req, res) => {
    try {
        const { leave_emp_id,isDeleted } = req.body
        const leave = await db.sequelize.query(`select loe.id as leaveOfEmp_id ,loe.leave_emp_id,l.* from leaveofemp loe left join \`leave_type\` l on loe.leave_id = l.id where loe.leave_emp_id = ${leave_emp_id} and l.isDeleted = ${isDeleted}` , { type: QueryTypes.SELECT })
        const employee = await db.sequelize.query("select loe.leave_emp_id,l.* from leaveofemp loe left join `employees` l on loe.leave_emp_id = l.id where loe.leave_emp_id = " + leave_emp_id + "", { type: QueryTypes.SELECT })

        // console.log(leave)
        const employee_leave = []
        leave.forEach(data => {
            console.log(data)
            employee.forEach(data_1 => {
                var temp = {
                    "leave_name": data.leave_name,
                    "no_of_days": data.no_of_days,
                    "first_name": data_1.first_name,
                    "last_name": data_1.last_name,
                    "email": data_1.work_email
                }
                employee_leave.push(temp)
            })
        })


        if (!leave) {
            return res.status(404).json({
                message: "leave not found"
            })
        } else {
            res.status(200).send({
                message: "leave",
                leave
                // employee_leave
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

exports.getShiftOfEmployee = async (req, res) => {
    try {
        const { shift_emp_id } = req.body
        console.log(shift_emp_id)
        const shift = await db.sequelize.query("select soe.shift_emp_id,s.* from shiftofEmp soe left join `shift` s on soe.shift_id = s.id where soe.shift_emp_id = " + shift_emp_id + "", { type: QueryTypes.SELECT })
        const employee = await db.sequelize.query("select soe.shift_emp_id,s.* from shiftofEmp soe left join `employees` s on soe.shift_emp_id = s.id where soe.shift_emp_id = " + shift_emp_id + "", { type: QueryTypes.SELECT })

        const employee_shift = []
        shift.forEach(data => {
            employee.forEach(data_1 => {
                var temp = {
                    "shift_name": data.shift_name,
                    "start_time": data.start_time,
                    "end_time": data.end_time,
                    "first_name": data_1.first_name,
                    "last_name": data_1.last_name,
                    "email": data_1.work_email
                }
                employee_shift.push(temp)
            })
        })

        if (!shift) {
            return res.status(404).json({
                message: "shift not found"
            })
        } else {
            res.status(200).send({
                message: "shift",
                // employee_shift
                shift
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

exports.assignPackage = async (req, res) => {
    try {
        const package = await Employee.findOne({ where: { id: req.body.id } })
        if (!package) {
            return res.status(404).json({
                message: "Package Not Found"
            })
        } else {
            Employee.update({
                emp_package: req.body.emp_package
            }, {
                where: {
                    id: req.body.id
                }
            }).then((_) => {
                res.status(200).send({
                    message: "Packae Update"
                })
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }

    // try {
    //     const package = await Employee.update({
    //         emp_package: req.body.emp_package
    //     }, {
    //         where: {
    //             id: req.body.id
    //         }
    //     }).then((_) => {
    //         res.status(200).send({
    //             message: "Packae Update"
    //         })
    //     })
    //     if (!package) {
    //         return res.status(400).json({
    //             message: "Package Not Found"
    //         })
    //     }
    // } catch (error) {
    //     console.error(error.message)
    //     res.status(500).send("Server Error")
    // }
}

exports.assignShift = async (req, res) => {
    try {
        const package = await Employee.findOne({ where: { id: req.body.id } })
        if (!package) {
            return res.status(404).json({
                message: "Shift Not Found"
            })
        } else {
            Employee.update({
                emp_shift: req.body.emp_shift
            }, {
                where: {
                    id: req.body.id
                }
            }).then((_) => {
                res.status(200).send({
                    message: "Shift Update"
                })
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}

exports.assignLeave = async (req, res) => {
    // try {
    //     const { assignLeave } = req.body
    //     var leavePackage = await LeavePackage.bulkCreate(assignLeave,
    //         {
    //             fields: ["leave_emp_id", "leave_id"],
    //             updateOnDuplicate: ["leave_id", "leave_emp_id"]
    //         }
    //     )

    //     if (!leavePackage) {
    //         return res.status(400).json({
    //             message: "failed to create"
    //         })
    //     } else {
    //         return res.status(200).json({
    //             message: "leave",
    //             leavePackage
    //         })
    //     }
    // } catch (error) {
    //     console.log(error)
    //     return res.status(500).json({
    //         message: "server Error",
    //         error
    //     })
    // }

    const { assignLeave, deleteLeave } = req.body
    console.log(req.body)
    try {
        if (assignLeave) {
            var leavePackage = await LeavePackage.bulkCreate(assignLeave,
                {
                    fields: ["leave_emp_id", "leave_id"],
                    updateOnDuplicate: ["leave_id", "leave_emp_id"]
                }
            )
            if (deleteLeave) {
                let leave_id = deleteLeave.map((ele) =>
                    ele.id
                )
                console.log(leave_id)
                LeavePackage.destroy(
                    {
                        where: { id: leave_id }
                    }
                )
            }
            return res.status(200).json({
                message: "leave",
                leavePackage
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "server Error",
            error
        })
    }
}

exports.assignLeaveType = async (req, res) => {

    const { assignLeave, deleteLeave } = req.body
    console.log(req.body)
    try {
        if (assignLeave) {
            var leaveTypeOfEmp = await LeaveTypeOfEmp.bulkCreate(assignLeave,
                {
                    fields: ["leave_emp_id", "leave_id"],
                    updateOnDuplicate: ["leave_id", "leave_emp_id"]
                }
            )
            if (deleteLeave) {
                let leave_id = deleteLeave.map((ele) =>
                    ele.id
                )
                console.log(leave_id)
                LeaveTypeOfEmp.destroy(
                    {
                        where: { id: leave_id }
                    }
                )
            }
            return res.status(200).json({
                message: "leave",
                leaveTypeOfEmp
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "server Error",
            error
        })
    }
}

exports.deletePackage = async (req, res) => {
    try {
        const deletePackage = await AssignPackage.destroy({ where: { id: req.body.id } })
        if (!deletePackage) {
            return res.status(404).json({
                message: "Package not found"
            })
        } else {
            res.status(200).send({
                message: "Delete",
                // data
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

exports.deleteShift = async (req, res) => {
    try {
        const deleteShift = await AssignShift.destroy({ where: { id: req.body.id } })
        if (!deleteShift) {
            return res.status(404).json({
                message: "Shift Not Found"
            })
        } else {
            res.status(200).send({
                message: "Delete",
                // data
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

exports.deleteLeve = async (req, res) => {
    try {
        const deleteLeave = await LeavePackage.destroy({ where: { id: req.body.id } })
        if (!deleteLeave) {
            return res.status(404).json({
                message: "Leave Not Found"
            })
        } else {
            res.status(200).send({
                message: "Delete",
                // data
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

exports.getEmpID = async (req, res) => {
    try {
        const { user_owner_id } = req.body;
        const data = await db.sequelize.query(`select count(id) as counts from employees e where user_owner_id = ${user_owner_id} `, { type: QueryTypes.SELECT })
        console.log("data",data[0].counts);
        
        if(data.length === 0 ) {
            // let empNum = "emp-";
            const newNum = 'emp-' + 1
            console.log("newNum",newNum);
            data.push({"emp_id":`${newNum}`})

        }else {
            let increment = data.length+1
            let result = 'emp-'+increment
            console.log("result",result);
            data.push({"emp_id":`${result}`})
        }
        const result = data.slice(-1)
        if (!data) {
            return res.status(404).json({
                message: "Something went wrong"
            })
        } else {

            return res.status(200).json({
                message: "Success",
                data
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}
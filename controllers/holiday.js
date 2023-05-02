const { Holiday, HolidayGeneral, HolidayDepartments, HolidayEmployees } = require('../models')

exports.getHoliday = async (req, res) => {
    try {
        var holiday = await Holiday.findAndCountAll({
            where: {
                isDeleted: req.body.isDeleted,
                holiday_owner_id: req.body.holiday_owner_id
            },
            limit: req.body.limit,
            offset: req.body.offset
        })
        if (!holiday) {
            return res.status(404).json({
                message: "Something went wrong"
            })
        } else {
            return res.status(200).json({
                message: "Success",
                holiday
            })
        }
    } catch (error) {
        console.error("errr====", error.message)
        res.status(500).send("Server Error")
    }
}

exports.addHoliday = async (req, res) => {
    try {
        const { holidayPayload, generalPayload, departmentPayload, employeePayload } = req.body
        console.log("req.body", req.body)
        var holiday = await Holiday.create(holidayPayload);
        if (generalPayload) {
            generalPayload.holiday_id = holiday.id;
            console.log("generalPayload", generalPayload)
            var generalHoliday = await HolidayGeneral.create(generalPayload);
            var dept_payload = []
            departmentPayload.forEach(ele => {
                var temp = {
                    "department_id": ele,
                    "holiday_id": holiday.id
                }
                dept_payload.push(temp)
            })
            console.log("dept_payload", dept_payload)
            var department = await HolidayDepartments.bulkCreate(dept_payload);
            var emp_payload = []
            employeePayload.forEach(element => {
                var temp = {
                    "employee_id": element,
                    "holiday_id": holiday.id
                }
                const index = emp_payload.findIndex((obj) => obj.employee_id === element)
                if (index !== -1) {
                    emp_payload.splice(index, 1)
                }
                emp_payload.push(temp)
            });
            console.log("emp_payload", emp_payload)

            var employee = await HolidayEmployees.bulkCreate(emp_payload);
        }
        if (!holiday || !generalHoliday || !department || !employee) {
            return res.status(400).json({
                message: "failed to create"
            })
        } else {
            return res.status(200).json({
                message: "created",
                data: { holiday, generalHoliday, department, employee }
            })
        }
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}

exports.updateHoliday = async (req, res) => {
    try {
        const {
            holidayPayload,
            generalPayload,
            departmentPayload,
            deletedDepartment,
            employeePayload,
            deletedEmployee } = req.body;
        const data = await Holiday.findOne({ where: { id: holidayPayload.id } });
        if (!data) {
            return res.status(404).json({
                message: "holiday not found"
            })
        } else {
            var updateHoliday = Holiday.update(holidayPayload, {
                where: {
                    id: holidayPayload.id
                }
            }
            ).then(async (_) => {
                if (generalPayload) {
                    var holidayGeneral = await HolidayGeneral.update(generalPayload, { where: { id: generalPayload.holiday_id } });
                    for await (const element of departmentPayload) {
                        let payload = {
                            "holiday_id": holidayPayload.id,
                            "department_id": element.department_id
                        }
                        var department = await HolidayDepartments.upsert(payload);
                    };

                    for await (const element of employeePayload) {
                        let payload = {
                            "holiday_id": holidayPayload.id,
                            "employee_id": element.employee_id
                        }
                        var employee = await HolidayEmployees.upsert(payload);
                    }

                    if (deletedDepartment) {
                        let deletedDepartmentIds = deletedDepartment.map((ele) => ele.id);
                        HolidayDepartments.destroy({
                            where: {
                                id: deletedDepartmentIds
                            }
                        })
                    }
                    if (deletedEmployee) {
                        let deletedEmployeeIds = deletedEmployee.map((ele) => ele.id);
                        HolidayEmployees.destroy({
                            where: {
                                id: deletedEmployeeIds
                            }
                        })
                    }
                    res.status(200).send({
                        message: "Updated Successfully",
                        updateHoliday, holidayGeneral, department, employee
                    })
                } else {
                    res.status(200).send({
                        message: "Updated Successfully",
                        updateHoliday
                    })
                }
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}

exports.getHolidayById = async (req, res) => {
    try {
        const holiday = await Holiday.findOne({
            where: { id: req.body.id },
            include:
                [HolidayGeneral, HolidayDepartments, HolidayEmployees]
        });
        if (!holiday) {
            return res.status(404).json({
                message: "holiday not found"
            })
        } else {
            res.status(200).send({
                message: "Success",
                data: { holiday }
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}

exports.deleteHoliday = async (req, res) => {
    try {
        const holiday = await Holiday.findOne({ where: { id: req.body.id } })
        if (!holiday) {
            return res.status(404).json({
                message: "holidy not found"
            })
        } else {
            Holiday.update({
                isDeleted: req.body.isDeleted
            }, {
                where: {
                    id: req.body.id
                }
            }).then((_) => {
                res.status(200).send({
                    message: "holiday Deleted"
                })
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}


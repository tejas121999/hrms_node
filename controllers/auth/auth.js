const { Employee, User, UserAccess } = require('../../models')
const model = require('../../models');
const bcrypt = require("bcrypt")
const { createTokens, validateToken } = require("../../middleware/JWT")
const { Op } = require("sequelize");


exports.createUser = async (req, res) => {
    try {
        const {
            user_emp_ID,
            first_name,
            last_name,
            mobile_no,
            owner_id,
            work_email,
            user_type,
            password,
            isFirst,
            isCompany,
            isBranch,
            isDepartment,
            isDesignation,
            user_role,
            department_id,
            leave_type_id,
            attendence_config_id,
            leave_config_id,
            company_id,
            // manager_id
        } = req.body
        const user = await User.findOne({
            where:
            {
                work_email: work_email,
                // owner_id: owner_id
            }
        })
        if (user) {
            return res.status(400).json({ msg: "User already exists" })
        }
        bcrypt.hash(password, 10).then((hash) => {
            User.create({
                user_emp_ID,
                first_name,
                last_name,
                mobile_no,
                owner_id,
                isFirst,
                isCompany,
                isBranch,
                isDepartment,
                isDesignation,
                user_type,
                user_role,
                department_id,
                leave_type_id,
                attendence_config_id,
                leave_config_id,
                work_email: work_email,
                password: hash,
                company_id,
                // manager_id
            })
                .then((userData) => {
                    const accessToken = createTokens(userData)
                    console.log("access_token", accessToken)

                    // req.header("x-auth-token", accessToken, {
                    //     maxAge: 60 * 60 * 24 * 30 * 1000,
                    //     httpOnly: true
                    // })

                    return res.status(200).json({
                        message: "User register successful",
                        Token: accessToken,
                        userData
                    })
                })
                .catch((err) => {
                    if (err) {
                        res.status(400).json({ error: err })
                    }
                })
        })
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
}

exports.login = async (req, res) => {
    try {
        const { work_email, password } = req.body
        const users = await User.findOne({
            where: {
                work_email: work_email,
                // isDeleted: isDeleted
            },
            include: [
                {
                    model: model.RoleManager,
                    as: 'user_roll_data',
                    subQuery: false,
                    attributes: [
                        'roll_name',
                        'colne_roll',
                        'type_roll',
                        'access_id'
                    ]
                },
                {
                    model: model.AttendanceConfiguration,
                    as: 'attendence_config_data',
                    subQuery: false,
                    attributes: [
                        'check_in_out',
                        'present_absent',
                        'shift',
                        'regularization',
                        'subordinates',
                        'others'
                    ]
                }
            ]

        })
        let access_2
        let access
        let employee
        console.log("users.user_emp_ID", users)
        if (!users || users === null) {
            return res.status(400).json({ msg: "User does not exists" })
        }
        if (users.user_emp_ID === null) {
            console.log("user role2", users.user_role)
            access_2 = await UserAccess.findOne({
                where: {
                    role_id: users.user_role
                }
            })
        } else {
            access = await UserAccess.findOne({
                where: {
                    emp_id: users.user_emp_ID
                }
            })
            employee = await Employee.findOne({
                where: {
                    id: users.user_emp_ID
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
                        subQuery: false
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

        }

        const dbPassword = users.password
        bcrypt.compare(password, dbPassword).then((match) => {
            if (!match) {
                res.status(400).json({
                    error: "Wrong Crediential!"
                })
            } else {
                const accessToken = createTokens(users)
                // req.header("x-auth-token", accessToken, {
                //     maxAge: 60 * 60 * 24 * 30 * 1000,
                //     httpOnly: true
                // })

                if (accessToken) {
                    return res.status(200).json({
                        message: "User login successful",
                        Token: accessToken,
                        user: users,
                        access: access,
                        access_2: access_2,
                        employee_data: employee
                    })
                }
            }
        })

    } catch (error) {
        console.log("==========", error)
        res.status(500).send(error.message)
    }
}

exports.updateFirstSetup = async (req, res) => {
    try {
        const data = await User.findOne({
            where: {
                id: req.body.id
            },
        })
        if (!data) {
            return res.status(200).json({
                message: "emp not found"
            })
        } else {
            User.update({
                isFirst: req.body.isFirst,
                isCompany: req.body.isCompany,
                isBranch: req.body.isBranch,
                isDepartment: req.body.isDepartment,
                leave_config_id: req.body.leave_config_id,
                attendence_config_id: req.body.attendence_config_id,
                company_id:req.body.company_id
            }, {
                where: {
                    id: req.body.id
                }
            }).then((_) => {
                res.status(200).send({
                    message: "update"
                })
            })
        }
    } catch (error) {
        console.error("error", error)
        res.status(500).send("Server Error")
    }
}

exports.updateSetup = async (req, res) => {
    try {
        const data = await User.findOne({
            where: {
                user_emp_ID: req.body.user_emp_ID
            },
        })
        if (!data) {
            return res.status(400).json({
                message: "emp not found"
            })
        } else {
            User.update({
                isFirst: req.body.isFirst,
                isCompany: req.body.isCompany,
                isBranch: req.body.isBranch,
                isDepartment: req.body.isDepartment,
                isDesignation: req.body.isDesignation,
                leave_config_id: req.body.leave_config_id,
                attendence_config_id: req.body.attendence_config_id,
                leave_type_id: req.body.leave_type_id,
                leave_config_type_id: req.body.leave_config_type_id,
                user_role: req.body.user_role,
                late_coming_Early_Going_id: req.body.late_coming_Early_Going_id,
                department_id: req.body.department_id,
                user_role: req.body.user_role,
                work_email: req.body.work_email,
                company_id:req.body.company_id,
                // manager_id:req.body.manager_id
            }, {
                where: {
                    user_emp_ID: req.body.user_emp_ID
                }
            }).then((_) => {
                res.status(200).send({
                    message: "update"
                })
            })
        }
    } catch (error) {
        console.error("error", error)
        res.status(500).send("Server Error")
    }
}

exports.updateRole = async (req, res) => {
    const data = await User.findOne({
        where: {
            user_emp_ID: req.body.user_emp_ID
        }
    })
    if (!data) {
        return res.status(400).json({
            message: "Role Note Found"
        })
    } else {
        User.update({
            user_role: req.body.user_role,
        }, {
            where: {
                user_emp_ID: req.body.user_emp_ID
            }
        }).then((_) => {
            res.status(200).send({
                message: "update"
            })
        })
    }
}

exports.getSetup = async (req, res) => {
    const setup = await User.findOne(
        {
            where: {
                id: req.body.id
            },
            include: [
                {
                    model: model.RoleManager,
                    as: 'user_roll_data',
                    subQuery: false,
                    attributes: [
                        'roll_name',
                        'colne_roll',
                        'type_roll',
                        'access_id'
                    ]
                }
            ]
        }
    )
    if (!setup) {
        return res.status(400).json({
            message: "Something went wrong"
        })
    } else {
        return res.status(200).json({
            message: "Success",
            setup
        })
    }
}

exports.logout = async (req, res) => {
    try {
        const user = req.body
        const deleteToken = await User.bulkCreate([{ rememberToken: null }], {
            updateOnDuplicate: ["work_email"]
        }).then(() => {
            return User.update(
                { rememberToken: null },
                { where: { work_email: User.work_email } }
            )
        })
        console.log("deleteToken", deleteToken)
        if (!deleteToken[0]) {
            res.status(400).json({
                message: "Failed to Logout"
            })
        } else {
            res.status(200).json({
                message: "Logout Successfully"
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send(error.message)
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const data = await User.findOne({ where: { id: req.body.id } })
        console.log(data)
        if (!data) {
            return res.status(401).json({
                message: "user not found"
            })
        } else {
            User.destroy({
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
        res.status(500).send(error.message)
    }
}

exports.logOutNew = async (req, res) => {
    // req.session.destroy()
    // res.status(200).send({user, token: jwt.token});
    res.clearCookie('jwt');
    // res.cookie('jwt','logedout',{
    //     expires:new Date(Date.now()+10*1000),
    //     secure:true,
    //     httpOnly:true
    // })
    res.status(200).json({
        status: 'succcess',
    });
}
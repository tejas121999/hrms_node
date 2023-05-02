const db = require('../models/index')
const { Employee_Leave } = require('../models')
const { Employee_leave_other_request } = require('../models')
const model = require('../models');
const { QueryTypes } = require('sequelize');
const { Op } = require("sequelize");

exports.getAllReq = async (req, res) => {
    try {
        var getRequest = await Employee_Leave.findAndCountAll({
            where: {
                isDeleted: req.body.isDeleted,
                owner_id: req.body.owner_id,
                emp_id: req.body.emp_id,
                isApproved: req.body.isApproved 
                // leave_type: req.body.leave_type
            },
            limit: req.body.limit,
            offset: req.body.offset,
            include: [
                {
                    model: model.LeaveType,
                    as: 'leave_type_data',
                    subQuery: false,
                    attributes: [
                        'leave_name',
                        'no_of_days'
                    ]
                },
                {
                    model: model.Employee,
                    as: 'emp_leave_data',
                    subQuery: false,
                    attributes: [
                        'first_name',
                        'last_name',
                        'emp_type'
                    ]
                }
            ]
        })


        if (!getRequest) {
            return res.status(404).json({
                message: "Something went wrong"
            })
        } else {
            return res.status(200).json({
                message: "Success",
                // getRequest,
                getRequest
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
exports.getLeaveRequest = async (req, res) => {
    try {
        var { isDeleted, owner_id, manager_id, isApproved } = req.body
        var getOtherReq = await Employee_leave_other_request.findAndCountAll({
            where: {
                request_user_id: manager_id
            },
            // include: [
            //     {
            //         model: model.Employee_Leave,
            //         as: 'other_leave_data',
            //         subQuery: false,
            //         attributes: [
            //             'leave_name',
            //             'no_of_days',
            //             'leave_desc'
            //         ]
            //     },
            //     {
            //         model: model.Employee,
            //         as: 'emp_leave_data',
            //         subQuery: false,
            //         attributes: [
            //             'first_name',
            //             'last_name',
            //             'emp_type'
            //         ]
            //     }
            // ]
        })
        var getRequest = await Employee_Leave.findAndCountAll({
            where: {
                isDeleted: isDeleted,
                owner_id: owner_id,
                manager_id: manager_id,
                isApproved: { [Op.or]: isApproved }
                // leave_type: req.body.leave_type
            },
            limit: req.body.limit,
            offset: req.body.offset,
            include: [
                {
                    model: model.LeaveType,
                    as: 'leave_type_data',
                    subQuery: false,
                    attributes: [
                        'leave_name',
                        'no_of_days'
                    ]
                },
                {
                    model: model.Employee,
                    as: 'emp_leave_data',
                    subQuery: false,
                    attributes: [
                        'first_name',
                        'last_name',
                        'emp_type'
                    ]
                }
            ]
        })

        // const { leave_type } = req.body
        // // var getRequest = await db.sequelize.query('SELECT * FROM user.employee_leave;', { type: QueryTypes.SELECT })
        // var getLeaveData = await db.sequelize.query("select el.leave_type, e.* from employee_leave el left join `leave` e on el.leave_type = e.id where el.leave_type = " + leave_type + "", { type: QueryTypes.SELECT })

        if (!getRequest) {
            return res.status(404).json({
                message: "Something went wrong"
            })
        } else {
            return res.status(200).json({
                message: "Success",
                // getRequest,
                getOtherReq,
                getRequest
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

exports.getEmpRequest = async (req, res) => {
    try {

        var getRequest = await Employee_Leave.findAndCountAll({
            where: {
                isDeleted: req.body.isDeleted,
                owner_id: req.body.owner_id,
                emp_id: req.body.emp_id,
                isApproved: req.body.isApproved
                // leave_type: req.body.leave_type

            },
            limit: req.body.limit,
            offset: req.body.offset,
            include: [
                {
                    model: model.LeaveType,
                    as: 'leave_type_data',
                    subQuery: false,
                    attributes: [
                        'leave_name',
                        'no_of_days',
                    ]
                },
                {
                    model: model.Employee,
                    as: 'emp_leave_data',
                    subQuery: false,
                    attributes: [
                        'first_name',
                        'last_name',
                        'emp_type'
                    ]
                }
            ]
        })


        // const { leave_type } = req.body
        // // var getRequest = await db.sequelize.query('SELECT * FROM user.employee_leave;', { type: QueryTypes.SELECT })
        // var getLeaveData = await db.sequelize.query("select el.leave_type, e.* from employee_leave el left join `leave` e on el.leave_type = e.id where el.leave_type = " + leave_type + "", { type: QueryTypes.SELECT })

        if (!getRequest) {
            return res.status(404).json({
                message: "Something went wrong"
            })
        } else {
            return res.status(200).json({
                message: "Success",
                // getRequest,
                getRequest
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error
        })
    }
}
exports.getAvailableLeaves = async (req, res) => {
    try {
        const { emp_id, leave_id } = req.body

        const package = await db.sequelize.query(`select sum(total_leave_days) as count,isApproved  from employee_leave el where emp_id = ${emp_id} and leave_type = ${leave_id} group by isApproved`, { type: QueryTypes.SELECT })
        if (!package) {
            return res.status(404).json({
                message: "package not found"
            })
        } else {
            res.status(200).send({
                message: "package",
                package
            })
        }
    } catch (error) {
        res.status(500).send(error)
    }
}
exports.getAllAvailableLeaves = async (req, res) => {
    try {
        const { emp_id ,isDeleted} = req.body

        const leaves = await db.sequelize.query(`select l.leave_name ,l.no_of_days,le.leave_emp_id as emp_id,le.leave_id as leave_id  from leaveofemp le left join leave_type l on l.id =le.leave_id  where le.leave_emp_id =${emp_id} and l.isDeleted=${isDeleted} `, { type: QueryTypes.SELECT })
        var result = [];
        for await (let leave of leaves) {
            var obj = leave;
            const available = await db.sequelize.query(`select sum(total_leave_days) as count,isApproved  from employee_leave el where emp_id = ${leave.emp_id} and leave_type = ${leave.leave_id} group by isApproved`, { type: QueryTypes.SELECT })
            obj.available = available;
            result.push(obj);

        }

        if (!leaves) {
            return res.status(404).json({
                message: "not found"
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
exports.sendLeaveRequest = async (req, res) => {
    try {
        const { leaveRequest, otherRequest } = req.body;
        console.log("leaveRequest", leaveRequest)
        var sendRquest = await Employee_Leave.create(leaveRequest);
        let other_requests = [];
        otherRequest.forEach(element => {
            other_requests.push({
                "employee_leave_id": sendRquest.dataValues.id,
                "request_user_id": element
            })
        });
        var sendRequestToOtherEmployees = await Employee_leave_other_request.bulkCreate(other_requests)
        // var sendRquest = await db.sequelize.query("INSERT INTO `user`.`employee_leave` (`id`, `leave_type`, `emp_manager_name`, `emp_leave_owner_id`, `available_leave`, `from_date`, `to_date`, `total_leave_days`, `reason`, `other_manager_name`, `isDeleted`, `isApproved`) VALUES (" + leaveRequest + "); ", { type: QueryTypes.INSERT })
        if (!sendRquest) {
            return res.status(404).json({
                message: "failed to create"
            })
        } else {
            return res.status(200).json({
                message: "created",
                sendRquest,
                sendRequestToOtherEmployees
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

exports.updateRequest = async (req, res) => {
    try {
        const { leaveRequest, otherRequest, deletedOtherRequests } = req.body;

        var sendRequest = await Employee_Leave.update(leaveRequest, { where: { id: leaveRequest.id } });
        let other_requests = [];
        otherRequest.forEach(element => {

            other_requests.push({
                "employee_leave_id": leaveRequest.id,
                "request_user_id": element
            })
        });

        if (deletedOtherRequests) {
            Employee_leave_other_request.destroy({
                where: {
                    request_user_id: deletedOtherRequests,
                    employee_leave_id: leaveRequest.id
                }
            })
        }
        for await (const element of otherRequest) {
            let payload = {
                "employee_leave_id": leaveRequest.id,
                "request_user_id": element
            }
            var sendRequestToOtherEmployees = await Employee_leave_other_request.upsert(payload)
        }

        if (!sendRequest) {
            return res.status(404).json({
                message: "failed to create"
            })
        } else {
            return res.status(200).json({
                message: "created",
                sendRequest,
                sendRequestToOtherEmployees
            })
        }
    } catch (error) {
        console.log(error, "ERROERJADS")
        res.status(500).json({
            message: "Server Error",
            error
        })
    }
}

exports.approveRequest = async (req, res) => {
    try {
        const { req_id, request } = req.body
        var approveRequest = await Employee_Leave.update(
            request,
            {
                where: {
                    id: req_id
                }
            }
        )
        if (request.isApproved == 2) {
            return res.status(200).json({
                message: "Decline",
                approveRequest
            })
        } else if (request.isApproved == 1) {
            return res.status(200).json({
                message: "Approve",
                approveRequest
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error
        })
    }
}

exports.deleteRequest = async (req, res) => {
    try {
        console.log("hello")
        const deleteRequest = await Employee_Leave.findOne({ where: { id: req.body.id } })
        console.log(deleteRequest)
        if (!deleteRequest) {
            return res.status(404).json({
                message: "request not found"
            })
        } else {
            Employee_Leave.update({
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
        res.status(500).json({
            message: "Server Error",
            error
        })
    }
}

exports.getRequests = async (req, res) => {
    try {
        const { user_id, isApproved, limit, offset } = req.body
        var sendRquest = await db.sequelize.query("select * from employee_leave_other_request elor left join employee_leave el on elor.employee_leave_id =el.id where elor.request_user_id = " + user_id + " and el.isApproved = " + isApproved + " LIMIT " + limit + " OFFSET " + offset, { type: QueryTypes.SELECT })
        var count = await db.sequelize.query("select count(*) as count from employee_leave_other_request elor left join employee_leave el on elor.employee_leave_id =el.id where elor.request_user_id = " + user_id + " and el.isApproved = " + isApproved, { type: QueryTypes.SELECT })
        return res.json({ sendRequest: sendRquest, count: count[0]?.count ?? 0 });
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error
        })
    }
}


exports.getRequestsById = async (req, res) => {
    try {
        const { id } = req.body
        var sendRequest = await Employee_Leave.findOne({ where: { id: id } });

        var otherRequests = await Employee_leave_other_request.findAll({ where: { employee_leave_id: sendRequest?.id } });

        return res.json({ sendRequest: sendRequest, otherRequests: otherRequests });
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error
        })
    }
}

exports.getAllRequests = async (req, res) => {
    try {
        const { user_id, limit, offset } = req.body
        var sendRquest = await db.sequelize.query("select * from employee_leave_other_request elor left join employee_leave el on elor.employee_leave_id =el.id where elor.request_user_id = " + user_id + " LIMIT " + limit + " OFFSET " + offset, { type: QueryTypes.SELECT })
        var count = await db.sequelize.query("select count(*) as count from employee_leave_other_request elor left join employee_leave el on elor.employee_leave_id =el.id where elor.request_user_id = " + user_id, { type: QueryTypes.SELECT })
        return res.json({ sendRequest: sendRquest, count: count[0]?.count ?? 0 });
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error
        })
    }
}

// exports.leaveRequestByDate = async (req,res)=>{
//     try{
//         const {emp_id, from_date, to_date} = req.body
//         const data = await Employee_Leave.findAndCountAll({
//             where:{
//                 emp_id : emp_id,
//                 [Op.or]:[{
//                     from_date:{
//                         [Op.between] : [from_date , to_date ]
//                     }
//                 }, {
//                     to_date:{
//                         [Op.between] : [ from_date , to_date ]
//                     }
//                 }
//             ]
//             }
//         })
//         if(!data) {
//             res.status(400).send({
//                 message:"Not Found"
//             })
//         } else {
//             res.status(200).json({
//                 message:"leave already taken",
//                 data
//             })
//         }

//     } catch (error){
//         res.status(500).json({
//             message:"Server Error"
//         })
//     }
// }

exports.leaveRequestByDate = async (req, res) => {
    try {
        const { date,emp_id ,owner_id,isApproved} = req.body;
        const data = await db.sequelize.query(`select el.emp_id,el.from_date ,el.to_date 
        ,el.total_leave_days from employee_leave el
        where ${date} between el.from_date and el.to_date and emp_id = ${emp_id} 
        and owner_id=${owner_id} and isApproved = ${isApproved} `, { type: QueryTypes.SELECT })
      
        if (!data) {
            return res.status(404).json({
                message: " not found"
            })
        } else {
            res.status(200).send({
                message: "leave already taken on this this days",
                data
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

exports.getLeaveByYear = async (req, res) => {
    try {
        const {  year,isApproved,emp_id,owner_id} = req.body;
        const data = await db.sequelize.query(` select el.from_date ,el.to_date ,el.total_leave_days,l.leave_name  
        from employee_leave el left join \`leave_type\` l on l.id=el.leave_type
          where isApproved =${isApproved} and emp_id =${emp_id} and  
         year(el.from_date)=${year}  and year(el.to_date)=${year} and owner_id=${owner_id} `, { type: QueryTypes.SELECT })
      
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

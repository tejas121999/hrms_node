const {  RegularizeAttendance,Attendence } = require('../models')
const model = require('../models');

exports.getRegularizeAttendance = async (req, res) => {
    try {
        var getRequest = await RegularizeAttendance.findAndCountAll({
            where: {
                isDeleted: req.body.isDeleted,
                owner_id: req.body.owner_id,
                manager_id: req.body.manager_id
            },
            limit: req.body.limit,
            offset: req.body.offset,
            include: [
                {
                    model: model.Employee,
                    as: 'emp_data',
                    subQuery: false,
                    attributes: [
                        'first_name',
                        'last_name',
                        'emp_type'
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
                }

            ]
        })

        if (!getRequest) {
            return res.status(401).json({
                message: "Something went wrong"
            })
        } else {
            return res.status(200).json({
                message: "Success",
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



exports.getRegularizeAttendanceByEmpId = async (req, res) => {
    try {
        var regularizeAttendance = await RegularizeAttendance.findAndCountAll({
            where: {
                isDeleted: req.body.isDeleted,
                owner_id: req.body.owner_id,
                emp_id: req.body.emp_id
            },
            limit: req.body.limit,
            offset: req.body.offset,
            include: [
                {
                    model: model.Employee,
                    as: 'emp_data',
                    subQuery: false,
                    attributes: [
                        'first_name',
                        'last_name',
                        'emp_type'
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

            ]
        })

        if (!regularizeAttendance) {
            return res.status(401).json({
                message: "Something went wrong"
            })
        } else {
            return res.status(200).json({
                message: "Success",
                regularizeAttendance
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error
        })
    }
}

exports.addRegularizeAttendance = async (req, res) => {
    try {
        const { regularizeAttendance } = req.body;
        console.log("regularizeAttendance", regularizeAttendance)
        var sendRquest = await RegularizeAttendance.create(regularizeAttendance);
        if (!sendRquest) {
            return res.status(404).json({
                message: "failed to create"
            })
        } else {
            return res.status(200).json({
                message: "Regularize Attendance created",
                sendRquest,
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

exports.approveRegularizeAttendance = async (req, res) => {
    try {
        const { req_id, request ,data}  = req.body
        const regularizeAttendance = await RegularizeAttendance.findOne({ 
            where: { id: req_id } })
            console.log("regularizeAttendance",regularizeAttendance.date);
        if (!regularizeAttendance) {
            return res.status(404).json({
                message: "Not Found"
            })
        }else{

            var approveRequest = await RegularizeAttendance.update(
                request,
                {
                    where: {
                        id: req_id
                    }
                }
                )
            
                
        if(request.isApproved ==1){
            const attendence = await Attendence.findOne({
                where:{
                    employee_id :regularizeAttendance.emp_id,
                    attendence_date: regularizeAttendance.date
                }
            })
            console.log("attendence",attendence);
            if(!attendence){
                const addAttendence = await Attendence.create(data)
                if(!addAttendence){
                    return res.status(404).json({
                        message: "failed to create"
                    })
                }else {
                    return res.status(200).json({
                        message: "created",
                        addAttendence,
                    })
                }
            }else{
                const updateAttendence = await Attendence.update(data,
                    {
                        where :{
                            id:attendence.id
                        }
                    }
                )
                if (!updateAttendence) {
                    return res.status(404).json({
                        message: "failed to create"
                    })
                } else {
                    return res.status(200).send({
                        message: "updated ",
                        updateAttendence
                    })
                }
            }
        } else if(request.isApproved == 2) {
            
                return res.status(200).json({
                    message: "Decline",
                    approveRequest
                })
            }

        res.status(200).json({
                    message: "Approve",
                    approveRequest
                })
            }
        // .then(async(_)=>{

        //     if(request.isApproved == 1){
                
        //         for await(const att of data){
        //             let payload = {
        //                 "date":att.date,
        //                 "employee_id":request.employee_id,
        //                 "status":att.status,
        //                 "attendence_date":request.attendence_date,
        //                 "inTime":att.inTime,
        //                 "outTime":att.outTime
        //             }
        //             var EmpAttendance = await Attendence.upsert(payload)
        //             console.log("EmpAttendance",EmpAttendance);
        //         }
        //     }
            // if (request.isApproved == 2) {
            
            //     return res.status(200).json({
            //         message: "Decline",
            //         approveRequest
            //     })
            // } else if (request.isApproved == 1) {
    
            //     for await(const att of attendence){
            //         let payload = {
            //             "employee_id":att.employee_id,
            //             "status":att.status,
            //             "attendence_date":att.attendence_date,
            //             "inTime":att.inTime,
            //             "outTime":att.outTime
            //         }
            //         var EmpAttendance = await Attendence.upsert(payload)
            //     }
            // //    Attendence.create(attendence)
            //     // console.log("createAttendence",createAttendence);
                
            // }
        //      res.status(200).json({
        //         message: "Approve",
        //         approveRequest,
        //         EmpAttendance
        //         // createAttendence
        //     })
        // })
    
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error
        })
    }
}

exports.updateRegularizeAttendance = async (req, res) => {
    try {
        const { id,data } = req.body
        var updateRegularize  = await RegularizeAttendance.update(
            data,
            {
                where: {
                    id: id
                }
            }
        )
        if (!updateRegularize) {
            return res.status(404).json({
                message: "failed to create"
            })
        } else {
            return res.status(200).send({
                message: "updated Loan",
                updateRegularize
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Server Error",
             error
        })
    }
}

exports.deleteRegularizeAttendance = async (req,res) =>{
    try {
        const data = await RegularizeAttendance.findOne({where:{id:req.body.id}})
        if(!data){
            return res.status(404).json({
                message:"not found"
            })
        }else {
            RegularizeAttendance.update({
                isDeleted: req.body.isDeleted
            },{
                where:{
                    id:req.body.id
                }
            }).then((_)=>{
                res.status(200).send({
                    message:"Delete"
                })
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Server Error",
            error
        })
    }
}
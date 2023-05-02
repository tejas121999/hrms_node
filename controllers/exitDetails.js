const {ExitDetails,Employee,User} = require('../models')
const model = require('../models');
const { QueryTypes } = require('sequelize');
const { Op } = require("sequelize");
const employee = require('../models/employee');


exports.getExitDetails = async (req, res) => {
    try {
        var exitDetails = await ExitDetails.findAndCountAll({
            where: {
                isDeleted: req.body.isDeleted,
                owner_id: req.body.owner_id
            },
            limit: req.body.limit,
            offset: req.body.offset,
            include:[
                {
                    model: model.Employee,
                    as:'employee_name_data',
                    subQuery: false,
                    attributes:[
                        'first_name',
                        'last_name'
                    ]
                },
                {
                    model: model.Employee,
                    as:'manager_name_data',
                    subQuery: false,
                    attributes:[
                        'first_name',
                        'last_name'
                    ]
                },

            ]
        })
        if (!exitDetails) {
            return res.status(404).json({
                message: "Something went wrong"
            })
        } else {
            return res.status(200).json({
                message: "Success",
                exitDetails
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            message: "Server Error",
            error
        })
    }

}

exports.addExitDetails = async (req,res)=>{
    try{
        const {exitDetails} = req.body;
        var data = await ExitDetails.create(exitDetails);
        if(!data){
            return res.status(404).json({
                message: "failed to create"
            })
        } else {
            return res.status(200).json({
                message: "Exit Details created",
                data,
            })
        }

    } catch (error) {
        res.status(500).json({
            message:"Server Error",
            error
        })
    }
}

exports.editExitDetails = async (req, res) => {
    try {
        const { id, exitDetails } = req.body;
        var updateExitDetails = await ExitDetails.update(exitDetails,
            {
                where: {
                    id: id
                }
            }
        )
        return res.status(200).send({
            message: "updated",
            updateExitDetails
        })

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}

exports.deleteExitdetails = async (req, res) => {
    try {
        const { id } = req.body;
        const data = await ExitDetails.findOne({ where: { id: id} })
        if (!data) {
            return res.status(404).json({
                message: "Exit Details not found"
            })
        } else {
            ExitDetails.update({
                isDeleted: true
            }, {
                where: {
                    id: id
                }
            }).then((_) => {
                Employee.update({
                    isExitDetail: true
                },{
                    where: {
                        id: data.employee_name
                    }
                })
                User.destroy({
                    where: {
                        user_emp_ID: data.employee_name
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

exports.getExitDetailInterviewer = async (req, res) => {
    try {
        const { user_owner_id,designation_id } = req.body

        // const data = await db.sequelize.query(`select * from employees e where user_owner_id = ${user_owner_id} and designation_id =${designation_id} `, { type: QueryTypes.SELECT })
        const data = await Employee.findOne({ where: {
            user_owner_id :user_owner_id,
            designation_id:designation_id

        } })
        console.log("data",data);

        if (!data) {
            return res.status(404).json({
                message: "not found"
            })
        } else {
            res.status(200).send({
                message: "Success",
                data
            })
        }
    } catch (error) {
        res.status(500).send(error)
    }
}
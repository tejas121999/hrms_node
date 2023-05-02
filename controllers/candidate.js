const { QueryTypes } = require('sequelize');
// const { SELECT } = require('sequelize/types/query-types');
const { Candidate, User ,Employee} = require('../models')
const model = require('../models');
const db = require('../models/index')
const bcrypt = require("bcrypt")

exports.getCandidate = async (req, res) => {
    try {
        var candidate = await Candidate.findAndCountAll({
            where: {
                isDeleted: req.body.isDeleted,
                candidate_owner_id: req.body.candidate_owner_id,
                isCandidates:req.body.isCandidates
            },
            limit: req.body.limit,
            offset: req.body.offset,
        })
        if (!candidate) {
            return res.status(404).json({
                message: "Something went wrong"
            })
        } else {
            return res.status(200).json({
                message: "Success",
                candidate
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

exports.addCandidate = async (req, res) => {
    try {

        const {
            candidate
        } = req.body
        const candiate = await Candidate.findOne({
            where:
            {
                work_email_id: candidate.work_email_id,
                // owner_id: owner_id
            }
        })
        if (candiate) {
            return res.status(400).json({ message: "candiate already exists" })
        }
        console.log("asd123", candidate)
        var create_candiate = await Candidate.create(
            candidate
        )
        // var password = "asd123";
        // var hash = await bcrypt.hash(password, 10)
        // var user = await User.create({
        //     first_name: candidate.first_name,
        //     last_name: candidate.last_name,
        //     mobile_no: candidate.mobile_no,
        //     user_candidate_id: create_candiate.id,
        //     work_email: candidate.work_email_id,
        //     owner_id: candidate.owner_id,
        //     user_type: 'candidate',
        //     password: hash
        // })
        if (!create_candiate) {
            return res.status(404).json({
                message: "failed to create"
            })
        } else {
            return res.status(200).json({
                message: "created",
                create_candiate,
                // user
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error",
            error
        })
    }
}

exports.addCandidateAsEmployee = async (req, res) => {
    try {

        const {id} = req.body
        const data = await Candidate.findOne({where:{ id: id}})
        console.log("data",data);

        let createEmployee = await Employee.create({
            first_name:data.first_name,
            last_name:data.last_name,
            middle_name:data.middle_name,
            emp_type:'staff',
            work_email: data.work_email,

            email:data.email,
            mobile_no:data.mobile_no,
            date_of_birth:data.date_of_birth,
            gender:data.gender,

            religion:data.religion,
            marital_status:data.marital_status,
            blood_group:data.blood_group,
            language:data.language,

            pan_no:data.pan_no,
            aadhar_no:data.aadhar_no,
            user_owner_id:data.candidate_owner_id,

            comm_address:data.comm_address,
            comm_country:data.comm_country,
            comm_city:data.comm_city,
            comm_destrict:data.comm_destrict,
            comm_zip:data.comm_zip,
            comm_state:data.comm_state,

            nominee_email:data.nominee_email,
            nominee_mobile_no:data.nominee_mobile_no,
            relation_with_employee:data.relation_with_employee,
            nominee_name:data.nominee_name,
            bank_name:data.bank_name,
            account_no:data.account_no,
            bank_address:data.bank_address,
            bank_branch:data.bank_branch,


        })
           const updateCandidate =  await Candidate.update({
                "isCandidates": true
            },
            {
                where:{
                    id:id
                }
            })
        
        // let userData = await User.findOne({where:{user_candidate_id:id}})
        // console.log("data",userData);
       const updateUserEmpId = await User.update({
            "user_emp_ID" : createEmployee.id,
            "user_type":'employee'
        },
            {
                where:{
                    user_candidate_id:id
                }
            }
        )
        
        return res.status(200).send({
            message: "candiate",
            createEmployee,
            updateCandidate,
            updateUserEmpId
        })

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}

exports.editCandidate = async (req, res) => {
    try {
        var date = new Date()
        const { candidate_id, candidate } = req.body;
        console.log("test");
        var udapteRes = await Candidate.update(candidate,
            {
                where: {
                    id: candidate_id
                }
            }
        )
        console.log("test");
        return res.status(200).send({
            message: "updated candiate",
            udapteRes
        })

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}

exports.deleteCandidate = async (req, res) => {
    try {
        const { candiate_id } = req.body;
        const data = await Candidate.findOne({ where: { id: candiate_id} })
        if (!data) {
            return res.status(404).json({
                message: "candiate not found"
            })
        } else {
            Candidate.update({
                isDeleted: true
            }, {
                where: {
                    id: candiate_id
                }
            }).then((_) => {
                // User.destroy({
                //     where: {
                //         user_candidate_id: candiate_id
                //     }
                // })
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

exports.getCandidateById = async (req, res) => {
    try {
        const { candiate_id } = req.body;
        const candiate = await Candidate.findOne({
            where: {
                id: candiate_id
            }
        })
        if (!candiate) {
            return res.status(404).json({
                message: "candiate not found"
            })
        } else {
            res.status(200).send({
                message: "Done",
                candiate
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}





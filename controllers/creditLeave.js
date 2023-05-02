const {CreditLeave} = require('../models')
const model = require('../models');


exports.getAllCreditLeave = async (req, res) => {
    try {
        var getRequest = await CreditLeave.findAndCountAll({
            where: {
                isDeleted: req.body.isDeleted,
                // owner_id: req.body.owner_id,
                isApproved: req.body.isApproved 
            },
            limit: req.body.limit,
            offset: req.body.offset,
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

exports.addCreditLeave = async (req,res)=>{
    try{
        const {creditLeave} = req.body;
        var sendCrediLeavetRequest = await CreditLeave.create(creditLeave);
        if(!sendCrediLeavetRequest){
            return res.status(404).json({
                message: "failed to create"
            })
        } else {
            return res.status(200).json({
                message: "created",
                sendCrediLeavetRequest,
            })
        }

    } catch (error) {
        res.status(500).json({
            message:"Server Error",
            error
        })
    }
}


exports.approveCreditLeave = async (req,res) =>{
    try{
        const {id, request} = req.body
        const approveRequest = await CreditLeave.update(
            request,
            {
                where:{
                    id: id
                }
            }
        )
        if (request.isApproved == 2) {
            return res.status(200).json({
                message:"Decline",
                approveRequest
            })
        }else if(request.isApproved == 1) {
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

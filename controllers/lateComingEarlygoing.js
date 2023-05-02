const { LateComingEarlyGoing } = require('../models')
const model = require('../models');

exports.getLateComingEarlyGoing = async (req, res) => {
    try {
        var lateComingEarlyGoing = await LateComingEarlyGoing.findOne({ 
            where:{ id :req.body.id}
          })
        if (!lateComingEarlyGoing) {
            return res.status(404).json({
                message: "Something went wrong"
            })
        } else {

            return res.status(200).json({
                message: "Success",
                lateComingEarlyGoing
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}

exports.addLateComingEarlyGoing = async (req,res)=>{
    try {
    
        const { data  } = req.body


        var lateComingEarlyGoing = await LateComingEarlyGoing.create(data)

        if (!lateComingEarlyGoing) {
            return res.status(404).json({
                message: "failed to create"
            })
        } else {
            return res.status(200).json({
                message: " data created",
                lateComingEarlyGoing
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}

exports.updateLateComingEarlyGoing = async (req, res) => {
    try {
        const { id, data } = req.body;
        var lateComingEarlyGoing = await LateComingEarlyGoing.update(data, { where: { "id": id } })

        if (!lateComingEarlyGoing) {
            return res.status(404).json({
                message: " not found"
            })
        } else {
            res.status(200).send({
                message: "data updated",
                lateComingEarlyGoing
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}
const { Booking } = require('../models')

exports.getBooking = async (req, res) => {
    try {
        var booking = await Booking.findAndCountAll({
            where: {
                isDeleted: req.body.isDeleted,
                booking_owner_id: req.body.booking_owner_id
            },
            limit: req.body.limit,
            offset: req.body.offset
        })
        if (!booking) {
            return res.status(404).json({
                message: "Something went wrong"
            })
        } else {
            return res.status(200).json({
                message: "Success",
                booking
            })
        }
    } catch (error) {
        console.error("errr====", error.message)
        res.status(500).send("Server Error")
    }
}

exports.addBooking = async (req, res) => {
    try {
        var date = new Date()
        const { booking_owner_id, name, description, booking_date, upload, code } = req.body
        var booking = await Booking.create({
            booking_owner_id,
            name,
            description,
            booking_date,
            upload,
            code,
            createdAt: date,
            updatedAt: date
        })
        if (!booking) {
            return res.status(404).json({
                message: "failed to create"
            })
        } else {
            return res.status(200).json({
                message: "created",
                booking
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}

exports.updatBooking = async (req, res) => {
    try {
        const { id, booking } = req.body
        console.log(id)
        var updateBooking = await Booking.update(
            booking,
            {
                where: {
                    id: id
                }
            }
        )
        return res.status(200).send({
            message: "updated Booking",
            updateBooking
        })
        // Booking.findByPk(req.body.id).then((data) => {
        //     Booking.update({
        //         name: req.body.name || data.name,
        //         description: req.body.description || data.description,
        //         booking_date: req.body.booking_date || data.booking_date,
        //         upload: req.body.update || data.update,
        //         code: req.body.code || data.code,
        //         updatedAt: date
        //     }, {
        //         where: {
        //             id: req.body.id
        //         }
        //     }
        //     ).then((_) => {
        //         res.status(200).send({
        //             message: "update",
        //             data
        //         })
        //     })
        //         .catch((err) => res.status(400).send(err))
        // })

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}

exports.deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findOne({ where: { id: req.body.id } })
        if (!booking) {
            return res.status(404).json({
                message: "booking not found"
            })
        } else {
            Booking.update({
                isDeleted: req.body.isDeleted
            }, {
                where: {
                    id: req.body.id
                }
            }).then((_) => {
                res.status(200).send({
                    message: "booking Deleted"
                })
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}

exports.getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findOne({ where: { id: req.body.id } })
        if (!booking) {
            return res.status(404).json({
                message: "booking not found"
            })
        } else {
            res.status(200).send({
                message: "booking Deleted",
                booking
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}
const { Alert } = require('../models')

exports.postAlert = async (req, res) => {
    try {
        var date = new Date()
        const { alert_name, SMS, email, dashboard, user_email } = req.body
        var alert = await Alert.create({
            alert_name,
            SMS,
            email,
            dashboard,
            user_email,
            createdAt: date,
            updatedAt: date
        })
        if (!alert) {
            return res.status(401).json({
                message: "failed to create"
            })
        } else {
            return res.status(200).json({
                message: "created",
                alert
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}
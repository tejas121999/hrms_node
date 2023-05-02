const { AlwaysPresentEmp } = require('../models')
const model = require('../models');

exports.getAlwaysPresent = async (req, res) => {
    try {
        const data = await AlwaysPresentEmp.findAndCountAll({
            where: {
                owner_id: req.body.owner_id,
                isDeleted: req.body.isDeleted
            },
            limit: req.body.limit,
            offset: req.body.offset,
            include: [
                {
                    model: model.Employee,
                    as: "emp_data",
                    subQuery: false,
                    attributes: [
                        'first_name',
                        'last_name'
                    ]
                }
            ]
        })

        if (!data) {
            return res.status(404).json({
                message: "Something went wrong"
            })
        } else {
            return res.status(200).json({
                message: "Success",
                data
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Success",
            error
        })
    }
}

exports.addAlwaysPresentEmp = async (req, res) => {
    try {
        const { data } = req.body
        var addData = await AlwaysPresentEmp.create(data)
        if (!addData) {
            return res.status(404).json({
                message: "failed to create"
            })
        } else {
            return res.status(200).json({
                message: "created",
                addData
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error
        })
    }
}

exports.editAlwaysPresentEmp = async (req, res) => {
    try {
        const { _id, data } = req.body
        var editData = await AlwaysPresentEmp.update(
            data,
            {
                where: {
                    id: _id
                }
            }
        )

        if (!editData) {
            return res.status(404).send({
                message: "Something went wrong"
            })
        } else {
            return res.status(200).json({
                message: "Success",
                editData
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error
        })
    }
}

exports.deleteAlwaysPresent = async (req, res) => {
    try {
        var data = await AlwaysPresentEmp.findOne({ where: { id: req.body.id } })
        if (!data) {
            return res.status(404).json({
                message: "elployee not found"
            })
        } else {
            AlwaysPresentEmp.update({
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
        return res.status(500).json({
            message: "Server"
        })
    }
}

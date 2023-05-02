const {Template,TemplateField} = require('../models')
const model = require('../models');

exports.getTemplate = async (req, res) => {
    try {
        var template = await Template.findAndCountAll({
            where: {
                isDeleted: req.body.isDeleted,
                owner_id: req.body.owner_id
            },
            limit: req.body.limit,
            offset: req.body.offset,
        })
        if (!template) {
            return res.status(404).json({
                message: "Something went wrong"
            })
        } else {
            return res.status(200).json({
                message: "Success",
                template
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

exports.addTemplate = async (req,res)=>{
    try{
        const {template} = req.body;
        var data = await Template.create(template);
        if(!data){
            return res.status(404).json({
                message: "failed to create"
            })
        } else {
            return res.status(200).json({
                message: "Template created",
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

exports.editTemplate = async (req, res) => {
    try {
        const { id, template } = req.body;
        var updateTemplate = await Template.update(template,
            {
                where: {
                    id: id
                }
            }
        )
        return res.status(200).send({
            message: "updated",
            updateTemplate
        })

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}

exports.deleteTemplate = async (req, res) => {
    try {
        const { id } = req.body;
        const data = await Template.findOne({ where: { id: id} })
        if (!data) {
            return res.status(404).json({
                message: "Template not found"
            })
        } else {
            Template.update({
                isDeleted: true
            }, {
                where: {
                    id: id
                }
            }).then((_) => {
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


exports.getTemplateField = async (req, res) => {
    try {
        var templateData = await TemplateField.findAndCountAll({
            limit: req.body.limit,
            offset: req.body.offset,
        })
        if (!templateData) {
            return res.status(404).json({
                message: "Something went wrong"
            })
        } else {
            return res.status(200).json({
                message: "Success",
                templateData
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
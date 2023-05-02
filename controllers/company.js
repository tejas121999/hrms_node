const { Company } = require('../models')
const model = require('../models');

exports.getCompany = async (req, res) => {
    try {
        var company = await Company.findAndCountAll({
            where: {
                isDeleted: req.body.where,
                company_owner_id: req.body.company_owner_id
            },
            limit: req.body.limit,
            offset: req.body.offset,
            include: [
                {
                    model: model.Owner,
                    as: "owner_data",
                    subQuery: false,
                    attributes: [
                        'owner_name'
                    ]
                }
            ]
        })
        if (!company) {
            return res.status(404).json({
                message: "Something went wrong"
            })
        } else {
            return res.status(200).json({
                message: "Success",
                company
            })
        }
    } catch (error) {
        console.error("errr====", error.message)
        res.status(500).send("Server Error")
    }
}

exports.addCompany = async (req, res) => {
    try {
        var date = new Date()
        const {
            company_owner_id,
            company_name,
            company_code,
            parent_company,
            subsidiaries,
            year_of_establishment,
            type_of_orginization,
            company_phone,
            company_email,
            company_fax,
            company_website,
            company_contact_person,
            company_mobile,
            company_vat,
            company_pan,
            company_gst,
            company_excise_registration,
            company_header,
            company_footer,
            company_note,
            company_address,
            company_secondary_address,
            company_city,
            company_district,
            company_state,
            company_zipcode,
            company_country,
            CIN_no,
            IEC,
            TAN
        } = req.body
        const companyName = await Company.findOne({
            where:{
                company_name:company_name,
                company_email:company_email
            }
        })
        if(companyName){
            return res.status(400).json({
                message: "duplicate data",
            })
        }
        var company = await Company.create({
            company_owner_id,
            company_name,
            company_code,
            parent_company,
            subsidiaries,
            year_of_establishment,
            type_of_orginization,
            company_phone,
            company_email,
            company_fax,
            company_website,
            company_contact_person,
            company_mobile,
            company_vat,
            company_pan,
            company_gst,
            company_excise_registration,
            company_header,
            company_footer,
            company_note,
            company_address,
            company_secondary_address,
            company_city,
            company_district,
            company_state,
            company_zipcode,
            company_country,
            CIN_no,
            IEC,
            TAN,
            createdAt: date,
            updatedAt: date
        })
        if (!company) {
            return res.status(404).json({
                message: "failed to create"
            })
        } else {
            return res.status(200).json({
                message: "created",
                company
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}

exports.editCompany = async (req, res) => {
    try {
        var date = new Date()
        const data = await Company.findOne({ where: { id: req.body.id } });
        if (!data) {
            return res.status(404).json({
                message: "company not found"
            })
        } else {
            Company.update({
                company_name: req.body.company_name || data.company_name,
                company_code: req.body.company_code || data.company_code,
                parent_company: req.body.parent_company || data.parent_company,
                subsidiaries: req.body.subsidiaries || data.subsidiaries,
                year_of_establishment: req.body.year_of_establishment || data.year_of_establishment,
                type_of_orginization: req.body.type_of_orginization || data.type_of_orginization,
                company_phone: req.body.company_phone || data.company_phone,
                company_email: req.body.company_email || data.company_email,
                company_fax: req.body.company_fax || data.company_fax,
                company_website: req.body.company_website || data.company_website,
                company_contact_person: req.body.company_contact_person || data.company_contact_person,
                company_mobile: req.body.company_mobile || data.company_mobile,
                company_vat: req.body.company_vat || data.company_vat,
                company_pan: req.body.company_pan || data.company_pan,
                company_gst: req.body.company_gst || data.company_gst,
                company_excise_registration: req.body.company_excise_registration || data.company_excise_registration,
                company_header: req.body.company_header || data.company_header,
                company_footer: req.body.company_footer || data.company_footer,
                company_note: req.body.company_note || data.company_note,
                company_address: req.body.company_address || data.company_address,
                company_secondary_address: req.body.company_secondary_address || data.company_secondary_address,
                company_city: req.body.company_city || data.company_city,
                company_district: req.body.company_district || data.company_district,
                company_state: req.body.company_state || data.company_state,
                company_zipcode: req.body.company_zipcode || data.company_zipcode,
                company_country: req.body.company_country || data.company_country,
                CIN_no: req.body.CIN_no || data.CIN_no,
                IEC: req.body.IEC || data.IEC,
                TAN: req.body.TAN || data.TAN,
                updatedAt: date || data.updatedAt
            },
                {
                    where: {
                        id: req.body.id
                    }
                }).then((_) => {
                    res.status(200).send({
                        message: "update company"
                    })
                })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}

exports.deleteCompany = async (req, res) => {
    try {
        const company = await Company.findOne({ where: { id: req.body.id } })
        console.log(req.body)
        if (!company) {
            return res.status(404).json({
                message: "company not found"
            })
        } else {
            Company.update({
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
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}

exports.companyGetById = async (req, res) => {
    try {
        const company = await Company.findOne({ where: { id: req.body.id } });
        if (!company) {
            return res.status(404).json({
                message: "company not found"
            })
        } else {
            res.status(200).send({
                message: "Company",
                company
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}


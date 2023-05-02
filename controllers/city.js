const {
    QueryTypes
} = require('sequelize');
// const { SELECT } = require('sequelize/types/query-types');
const {
    Candidate,
    User
} = require('../models')
const db = require('../models/index')


exports.getCountries = async (req, res) => {
    try {
        const {
            id
        } = req.body;

        const countries = await db.sequelize.query(`select id,name from countries`, {
            type: QueryTypes.SELECT
        })
        res.status(200).send({
            message: "Done",
            countries
        })

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}
exports.getStates = async (req, res) => {
    try {
        const {
            id
        } = req.body;

        const countries = await db.sequelize.query(`select id,name from states where country_id=${id} `, {
            type: QueryTypes.SELECT
        })
        res.status(200).send({
            message: "Done",
            countries
        })

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}
exports.getCities = async (req, res) => {
    try {
        const {
            id
        } = req.body;

        const countries = await db.sequelize.query(`select id,name from cities where state_id=${id} `, {
            type: QueryTypes.SELECT
        })
        res.status(200).send({
            message: "Done",
            countries
        })

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}
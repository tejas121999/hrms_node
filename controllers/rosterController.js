const { Roster,RosterYearly,OnCrewInRoster,OffCrewInRoster } = require('../models')
const { QueryTypes, where } = require('sequelize');
const db = require('../models/index')
const moment= require('moment') 
const model = require('../models');

exports.getRoster = async (req, res) => {
    try {
        // var roster = await Roster.findAndCountAll({
        //     limit: req.body.limit,
        //     offset: req.body.offset
        // })
        // const roster = await db.sequelize.query("select rs.*,onc.* from roster as rs left join on_crew_in_roster as onc on rs.id = onc.roster_id",{ type: QueryTypes.SELECT })
        const roster = await db.sequelize.query("select * from roster",{ type: QueryTypes.SELECT })
        const onCrew = await db.sequelize.query("select * from on_crew_in_roster",{ type: QueryTypes.SELECT })
        const offCrew = await db.sequelize.query("select * from off_crew_in_roster",{ type: QueryTypes.SELECT })
        if (!roster & !onCrew & !offCrew) {
            return res.status(404).json({
                message: "Something went wrong"
            })
        } else {

            return res.status(200).json({
                message: "Success",
                roster,onCrew,offCrew
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}

exports.getYearlyRoster = async (req, res) => {
    try {
        const{query,limit,offset}=req.body;
        // var roster = await Roster.findAndCountAll({
        //     limit: req.body.limit,
        //     offset: req.body.offset
        // })
        // const roster = await db.sequelize.query("select rs.*,onc.* from roster as rs left join on_crew_in_roster as onc on rs.id = onc.roster_id",{ type: QueryTypes.SELECT })
        // const roster = await db.sequelize.query("select * from roster_yearly",{ type: QueryTypes.SELECT })
        var roster = await RosterYearly.findAndCountAll({
            where: query,
            limit: limit,
            offset: offset,
            include: [
                {
                    model: model.Crew,
                    as: "on_crew",
                    subQuery: false,
                    attributes: [
                        'crew_name'
                    ]
                },
                {
                    model: model.Crew,
                    as: "off_crew",
                    subQuery: false,
                    attributes: [
                        'crew_name'
                    ]
                }
            ]
        })
        if (!roster) {
            return res.status(404).json({
                message: "Something went wrong"
            })
        } else {

            return res.status(200).json({
                message: "Success",
                roster
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}
exports.getSingleYearlyRoster = async (req, res) => {
    try {
        const{id}=req.body;
        // var roster = await Roster.findAndCountAll({
        //     limit: req.body.limit,
        //     offset: req.body.offset
        // })
        // const roster = await db.sequelize.query("select rs.*,onc.* from roster as rs left join on_crew_in_roster as onc on rs.id = onc.roster_id",{ type: QueryTypes.SELECT })
        // const roster = await db.sequelize.query("select * from roster_yearly",{ type: QueryTypes.SELECT })
        var roster = await RosterYearly.findByPk(id)
        console.log(roster)
        if (!roster) {
            return res.status(404).json({
                message: "Something went wrong"
            })
        } else {

            return res.status(200).json({
                message: "Success",
                roster
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}
exports.addRoster = async (req,res)=>{
    try {
    
        const { 
            roster,
            onCrew,
            offCrew
         } = req.body
        var rosterResult = await Roster.create({
            "on_crew_year": roster.on_crew_year,
            "on_crew_date": roster.on_crew_date,
            "sign_on_crew_name":roster.sign_on_crew_name,
            "sign_off_crew_name":roster.sign_off_crew_name,
            "on_crew_id": roster.on_crew_id,
            "off_crew_year": roster.off_crew_year,
            "off_crew_date": roster.off_crew_date,
            "off_crew_id": roster.off_crew_id,
        
        })

        // onCrew.forEach(element =>{
        //     element.roster_id = rosterResult.id
        // })
        // var onCrewResult = await OnCrewInRoster.bulkCreate(onCrew)

        // offCrew.forEach(element =>{
        //     element.roster_id = rosterResult.id
        // })
        // var offCrewResult = await OffCrewInRoster.bulkCreate(offCrew)

        if (!roster) {
            return res.status(404).json({
                message: "failed to create"
            })
        } else {
            return res.status(200).json({
                message: "created",
                rosterResult,
                // onCrewResult,
                // offCrewResult
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}
exports.addYearlyRoster = async (req,res)=>{
    try {
    
        const { 
            roster,
            onCrew,
            offCrew
         } = req.body
         if(!roster.startDate||!roster.endDate||!roster.on_crew_id||!roster.off_crew_id||!roster.gap)
         {
            return res.status(404).json({
                message: "Bad Request"
            })
         }
         var startDate = moment(roster.startDate);
         var endDate = moment(roster.endDate);
         var diff=endDate.diff(startDate, 'days')
         if(diff%roster.gap!=0)
         {
            return res.status(404).json({
                message: "Check date difference"
            })
         }
         console.log(roster.gap)
        var rosterResult = await RosterYearly.create({
            "startDate": roster.startDate,
            "on_crew_id": roster.on_crew_id,
            "endDate": roster.endDate,
            "off_crew_id": roster.off_crew_id,
            "gap":roster.gap
        })

        // onCrew.forEach(element =>{
        //     element.roster_id = rosterResult.id
        // })
        // var onCrewResult = await OnCrewInRoster.bulkCreate(onCrew)

        // offCrew.forEach(element =>{
        //     element.roster_id = rosterResult.id
        // })
        // var offCrewResult = await OffCrewInRoster.bulkCreate(offCrew)

        if (!roster) {
            return res.status(404).json({
                message: "failed to create"
            })
        } else {
            return res.status(200).json({
                message: "created",
                rosterResult,
                // onCrewResult,
                // offCrewResult
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}
exports.addYearlyRosterAndCrew = async (req,res)=>{
    try {
    
        const { 
            roster,
            onCrew,
            offCrew
         } = req.body
         if(!roster.startDate||!roster.endDate||!roster.on_crew_id||!roster.off_crew_id||!roster.gap)
         {
            return res.status(400).json({
                message: "Bad Request"
            })
         }
         var startDate = moment(roster.startDate);
         var endDate = moment(roster.endDate);
         var diff=endDate.diff(startDate, 'days')
         if(diff%roster.gap!=0)
         {
            return res.status(400).json({
                message: "Check date difference"
            })
         }
         console.log(roster.gap)
        var rosterResult = await RosterYearly.create({
            "startDate": roster.startDate,
            "on_crew_id": roster.on_crew_id,
            "endDate": roster.endDate,
            "off_crew_id": roster.off_crew_id,
            "gap":roster.gap
        })

        // onCrew.forEach(element =>{
        //     element.roster_id = rosterResult.id
        // })
        // var onCrewResult = await OnCrewInRoster.bulkCreate(onCrew)

        // offCrew.forEach(element =>{
        //     element.roster_id = rosterResult.id
        // })
        // var offCrewResult = await OffCrewInRoster.bulkCreate(offCrew)

        if (!roster) {
            return res.status(400).json({
                message: "failed to create"
            })
        } else {
            return res.status(200).json({
                message: "created",
                rosterResult,
                // onCrewResult,
                // offCrewResult
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}
exports.getSingle = async (req, res) => {
    try {
        const { roster_id } = req.body;

        // const onCrew = await db.sequelize.query("select scip.id as _id , scip.salary_component_name as scip_id,scip.type,scip.value,scip.actual,scip.deduction,scip.monthly_value,scip.yearly_value,sc.* from salary_component_in_package scip left join salary_component sc on sc.id =scip.salary_component_name where package_id=" + package_id + "", { type: QueryTypes.SELECT })
        // const onCrew = await db.sequelize.query(`select rs.*,onc.* from roster as rs left join on_crew_in_roster as onc on rs.id = onc.roster_id where roster_id = ${roster_id};`,{ type: QueryTypes.SELECT });
        // const offCrew = await db.sequelize.query(`select rs.*,ofc.* from roster as rs left join off_crew_in_roster as ofc on rs.id = ofc.roster_id where roster_id = ${roster_id};` ,{ type: QueryTypes.SELECT });
        const roster = await db.sequelize.query(`select * from roster where id = ${roster_id}`,{ type: QueryTypes.SELECT })
        const onCrew = await db.sequelize.query(`select *,(select CONCAT(first_name,' ',last_name)from employees e where id=ocir.on_employee_id ) as emp_name,(select job_title from designation d where id=ocir.on_designation_id  ) as job_title from on_crew_in_roster ocir where roster_id = ${roster_id}`,{ type: QueryTypes.SELECT })
        const offCrew = await db.sequelize.query(`select *,(select CONCAT(first_name,' ',last_name)from employees e where id=ocir.on_employee_id ) as emp_name,(select job_title from designation d where id=ocir.on_designation_id  ) as job_title from off_crew_in_roster ocir; where roster_id = ${roster_id}`,{ type: QueryTypes.SELECT })
        if (!roster & !onCrew & !offCrew) {
            return res.status(404).json({
                message: " not found"
            })
        } else {
            res.status(200).send({
                message: "data",
                roster,
                onCrew,
                offCrew,
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

exports.updateRoster = async (req, res) => {
    try {
        const { id, roster } = req.body;
        console.log("req.body.roster", req.body.roster)
        var rosterDetails = await Roster.update(roster, { where: { "id": id } })

        if (!rosterDetails) {
            return res.status(404).json({
                message: "roster not found"
            })
        } else {
            res.status(200).send({
                message: "roster",
                rosterDetails
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

exports.updateOnCrewToRoster = async (req, res) => {
    try {
        const { ocir_id, onCrew } = req.body;
        var onCrewInRoster = await OnCrewInRoster.update(onCrew, { where: { "id": ocir_id } })

        if (!onCrewInRoster) {
            return res.status(404).json({
                message: "roster not found"
            })
        } else {
            res.status(200).send({
                message: "roster",
                onCrewInRoster
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

exports.removeOnCrewFromRoster = async (req, res) => {
    try {
        const { id } = req.body;

        var oncrew = await OnCrewInRoster.destroy({ where: { "id": id } });

        if (!oncrew) {
            return res.status(404).json({
                message: "oncrew not found"
            })
        } else {
            res.status(200).send({
                message: "roster",
                oncrew
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

exports.updateOffCrewToRoster = async (req, res) => {
    try {
        const { offcir_id, offCrew } = req.body;
        var offCrewInRoster = await OffCrewInRoster.update(offCrew, { where: { "id": offcir_id } })

        if (!offCrewInRoster) {
            return res.status(404).json({
                message: "roster not found"
            })
        } else {
            res.status(200).send({
                message: "roster",
                offCrewInRoster
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}


exports.removeOffCrewFromRoster = async (req, res) => {
    try {
        const { id } = req.body;

        var offcrew = await OffCrewInRoster.destroy({ where: { "id": id } });

        if (!offcrew) {
            return res.status(404).json({
                message: "offcrew not found"
            })
        } else {
            res.status(200).send({
                message: "offCrew Deleted",
                offcrew
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}




















// exports.addOnCrew = async (req, res) => {
//     try {
//         const {
//             onCrewRoster
//         } = req.body
//         var onCrew = await OnCrewInRoster.create(onCrewRoster)
//         if (!onCrew) {
//             return res.status(401).json({
//                 message: "failed to create"
//             })
//         } else {
//             return res.status(200).json({
//                 message: "created",
//                 onCrew
//             })
//         }
//     } catch (error) {
//         res.status(500).json({
//             message: "Server Error",
//             error
//         })
//     }
// }

// exports.addOffCrew = async (req, res) => {
//     try {
//         const {
//             offCrewRoster
//         } = req.body
//         var offCrew = await OnCrewInRoster.create(offCrewRoster)
//         if (!offCrew) {
//             return res.status(401).json({
//                 message: "failed to create"
//             })
//         } else {
//             return res.status(200).json({
//                 message: "created",
//                 offCrew
//             })
//         }
//     } catch (error) {
//         res.status(500).json({
//             message: "Server Error",
//             error
//         })
//     }
// }
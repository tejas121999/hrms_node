const { Crew, CrewEmployees} = require('../models')
const db = require('../models/index')
const { QueryTypes, where } = require('sequelize');
// exports.getCrew = async (req, res) => {
//     try {
//         const{query}=req.body;
//         var crew = await Crew.findAndCountAll({
//             where: query,
//         })
//             return res.status(200).json({
//                 message: "Success",
//                 crew
//             })
        
//     } catch (error) {
//         console.error("errr====", error.message)
//         res.status(500).send("Server Error")
//     }
// }
exports.getSingleCrew = async (req, res) => {
    try {
        const{crew_id}=req.body;
        var crew = await Crew.findByPk(crew_id)
        const crewEmployees = await db.sequelize.query(`select *,(select CONCAT(first_name,' ',last_name)from employees e where id=ce.employee_id ) as emp_name,(select job_title from designation d where id=ce.designation_id  ) as job_title from crewEmployees ce where crew_id = ${crew_id}`,{ type: QueryTypes.SELECT })
            return res.status(200).json({
                message: "Success",
                crew,crewEmployees
            })
        
    } catch (error) {
        console.error("errr====", error.message)
        res.status(500).send("Server Error")
    }
}

exports.getCrew = async (req, res) => {
    try {
        // const{query}=req.body;
        var crew = await Crew.findAndCountAll({
            limit: req.body.limit,
            offset: req.body.offset,
        })
            return res.status(200).json({
                message: "Success",
                crew
            })
        
    } catch (error) {
        console.error("errr====", error.message)
        res.status(500).send("Server Error")
    }
}
exports.addCrew = async (req, res) => {
    try {
        const{crew,crewEmp}=req.body;
        var crewResponse = await Crew.create(crew)
        crewEmp.forEach(element => {
            element.crew_id = crewResponse.id
        }); 
        var crewEmpResult = await CrewEmployees.bulkCreate(crewEmp)
            return res.status(200).json({
                message: "Success",
                crewResponse,
                crewEmpResult
            })
        
    } catch (error) {
        console.error("errr====", error.message)
        res.status(500).send("Server Error")
    }
}

exports.editCrewEmployee = async (req, res) => {
    try {
        const { id, crewEmployee } = req.body;
        var updateCrewEmployee = await CrewEmployees.update(crewEmployee,
            {
                where: {
                    id: id
                }
            }
        )
        return res.status(200).send({
            message: "updated",
            updateCrewEmployee
        })

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}

exports.deleteCrewEmployees = async (req, res) => {
    try {
        const { id } = req.body;
        const data = await CrewEmployees.findOne({ where: { id: id} })
        if (!data) {
            return res.status(400).json({
                message: "not found"
            })
        } else {
            CrewEmployees.destroy( {
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

exports.deleteCrew = async (req, res) => {
    try {
        const { id } = req.body;
        const data = await Crew.findOne({ where: { id: id} })
        if (!data) {
            return res.status(400).json({
                message: "not found"
            })
        } else {
            Crew.update({
                isDeleted: true
            }, {
                where: {
                    id: id
                }
            }).then((_) => {
                CrewEmployees.destroy({
                    where: {
                        crew_id: id
                    }
                })
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




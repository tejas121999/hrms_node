const db = require('../models');
const { Department, DepartmentManager } = require('../models')
const model = require('../models');
const { QueryTypes } = require('sequelize');


exports.getDepartment = async (req, res) => {
    try {
        var department = await Department.findAndCountAll({
            where: {
                isDeleted: req.body.where,
                department_owner_id: req.body.department_owner_id
            },
            limit: req.body.limit,
            offset: req.body.offset,
            include: [
                {
                    model: model.Owner,
                    as: "department_owner_data",
                    subQuery: false,
                    attributes: [
                        'owner_name'
                    ]
                },
                {
                    model: model.Employee,
                    as: "manager_data",
                    subQuery: false,
                    attributes: [
                        'first_name',
                        'last_name'
                    ]
                }
            ]
        })
        if (!department) {
            return res.status(404).json({
                message: "Something went wrong"
            })
        } else {
            return res.status(200).json({
                message: "Success",
                department
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}
// test
exports.addDepartment = async (req, res) => {
    try {
        const {
            department
        } = req.body

        const departmentName = await Department.findOne({
            where:{
                department_name:department.department_name,
                department_owner_id:department.department_owner_id
            }
        })
        if(departmentName){
            return res.status(400).json({
                message: "duplicate Department Name",
            })
        }

        const data = await db.sequelize.query(`select count(id) as counts from department d where department_owner_id = ${department.department_owner_id} `, { type: QueryTypes.SELECT })
        console.log("data",data);
        department.department_code = data[0].counts+1;
        var dept_data = await Department.create(department)
        // console.log("Department.id", dept_data.id)
        // manager.forEach(element => {
        //     element.department_id = dept_data.id
        // });

        // var dept_manager = await DepartmentManager.bulkCreate(manager)

        if (!dept_data && !dept_manager) {
            return res.status(404).json({
                message: "failed to create"
            })
        } else {
            return res.status(200).json({
                message: "created",
                dept_data,
                // dept_manager
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}

exports.eidtDepartment = async (req, res) => {
    try {
        const { dept_id,department } = req.body
        const data = await Department.findOne({ where: { id: dept_id } })
        if (!data) {
            return res.status(404).json({
                message: "Department not found"
            })
        } else {
            var updateDepartment = await Department.update(
                department,
                {
                    where: {
                        id: dept_id
                    }
                }
            ).then(async (_) => {
                // for await (const)
            })
        }

        return res.status(200).send({
            message: "updated Loan",
            updateDepartment
        })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}

exports.deletedepartment = async (req, res) => {
    try {
        const department = await Department.findByPk(req.body.id)
        if (!department) {
            return res.status(404).json({
                message: "department not found"
            })
        } else {
            Department.update({
                isDeleted: req.body.isDeleted
            }, {
                where: {
                    id: req.body.id
                }
            }).then((_) => {
                res.status(200).send({
                    message: "department"
                })
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}

exports.departmentGetById = async (req, res) => {
    try {
        //   const { id } = req.body
        const department = await Department.findAll({
            where: {
                id: req.body.id
            },
            include: [
                {
                    model: model.Employee,
                    as: "manager_data",
                    subQuery: false,
                    attributes: [
                        'first_name',
                        'last_name'
                    ]
                }
            ]
        })

        // const department = await db.sequelize.query(`select d.*, e.first_name from department d left join employees e ON e.id=d.manager_id where d.id =${id}`, { type: QueryTypes.SELECT })
        if (!department) {
            return res.status(404).json({
                message: "department not found"
            })
        } else {
            res.status(200).send({
                message: "department",
                department
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}

exports.getManagerName = async (req, res) => {
    try {
        const department = await db.sequelize.query(``, { type: QueryTypes.SELECT })
    } catch (error) {

    }
}

exports.getDepartmentCode = async (req, res) => {
    try {
        const { department_owner_id} = req.body;
        const data = await db.sequelize.query(`select d.department_code from department d where department_owner_id = ${department_owner_id} `, { type: QueryTypes.SELECT })
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
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}

exports.getDepartmentManagerName = async (req, res) => {
    try {
        const { department_id } = req.body

        const data = await db.sequelize.query(`select dm.department_id,dm.manager_id,e.first_name,e.last_name from department_manager dm left join employees e on dm.manager_id = e.id where dm.department_id = ${department_id}`, { type: QueryTypes.SELECT })
        if (!data) {
            return res.status(404).json({
                message: " not found"
            })
        } else {
            res.status(200).send({
                message: "Department Manager Name",
                data
            })
        }
    } catch (error) {
        res.status(500).send(error)
    }
}
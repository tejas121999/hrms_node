const { Package, salaryComponentinPackage, SalaryComponent, LeavesInPackage } = require('../models')
const model = require('../models');
const { QueryTypes, where } = require('sequelize');
const db = require('../models/index')

exports.getPackage = async (req, res) => {
    try {
        var package = await Package.findAndCountAll({
            where: {
                isDeleted: req.body.isDeleted,
                package_owner_id: req.body.package_owner_id
            },
            limit: req.body.limit,
            offset: req.body.offset
        })
        console.log(req.body)
        if (!package) {
            return res.status(404).json({
                message: "Something went wrong"
            })
        } else {

            return res.status(200).json({
                message: "Success",
                package
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}

exports.deletePackage = async (req, res) => {
    try {
        var deletePackage = await Package.findOne({ where: { id: req.body.id } })
        if (!deletePackage) {
            return res.status(404).json({
                message: "package not found"
            })
        } else {
            Package.update({
                isDeleted: req.body.isDeleted
            }, {
                where: {
                    id: req.body.id
                }
            }).then((_) => {
                res.status(200).send({
                    message: "package Deleted"
                })
            })
        }
    } catch (error) {

    }
}

exports.update = async (req, res) => {
    try {
        const { package, salary_component, delete_component } = req.body

        const data = await Package.findOne({ where: { id: package.id } })
        if (!data) {
            return res.status(404).json({
                message: "Package Not Found"
            })
        } else {
            var updatePackage = await Package.update(package, {
                where: {
                    id: package.id
                }
            }).then(async (_) => {
                if (salary_component != null) {
                    for await (const element of salary_component) {
                        let payloade = {
                            "comp_id": element._id,
                            "salary_component_name": element.salary_component_name,
                            "type": element.type,
                            "monthly_value": element.monthly_value,
                            "yearly_value": element.yearly_value
                        }
                        var salaryComponent = await salaryComponentinPackage.upsert(payloade)
                    }
                }

                if (delete_component != null) {
                    let _id = delete_component.map((ele) => ele)
                    console.log("==========",_id)
                    salaryComponentinPackage.destroy({
                        where: {
                            id: _id
                        }
                    })
                }

                res.status(200).send({
                    message: "Updated Successfully",
                    updatePackage, salaryComponent
                })
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}
exports.addPackage = async (req, res) => {
    try {
        const {
            package,
            salary_component
        } = req.body
        //TODO add validations
        var packageResults = await Package.create({
            "package_owner_id": package.package_owner_id,
            "package_name": package.package_name,
            "annual_ctc": package.annual_ctc,
            "package_type": package.package_type
        })
        salary_component.forEach(element => {
            element.package_id = packageResults.id
        });

        var salaryComponentResult = await salaryComponentinPackage.bulkCreate(salary_component);
        if (!package) {
            return res.status(404).json({
                message: "failed to create"
            })
        } else {
            return res.status(200).json({
                message: "created",
                packageResults,
                salaryComponentResult
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}

exports.addsalaryComponentinPackage = async (req, res) => {
    try {
        // var date = new Date()
        var componentInPackage = await salaryComponentinPackage.bulkCreate(req.body)

        if (!componentInPackage) {
            return res.status(404).json({
                message: "failed to create"
            })
        } else {
            return res.status(200).json({
                message: "created",
                componentInPackage
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}

exports.addsalaryComponentinPackage = async (req, res) => {
    try {
        // var date = new Date()
        var componentInPackage = await salaryComponentinPackage.bulkCreate(req.body)

        if (!componentInPackage) {
            return res.status(404).json({
                message: "failed to create"
            })
        } else {
            return res.status(200).json({
                message: "created",
                componentInPackage
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}


exports.getOne = async (req, res) => {
    try {
        const { package_id } = req.body;

        const leaves = await db.sequelize.query("select lip.package_id,l.* from leavesInPackage lip left join `leave` l on lip.leave_id =l.id where lip.package_id = " + package_id + "", { type: QueryTypes.SELECT })
        const salary = await db.sequelize.query(`select cip.package_id,sc.* from componentsInPackages cip  left join salary_component sc on cip.salary_component_id=sc.id where cip.package_id = ${package_id};`, { type: QueryTypes.SELECT });

        if (!leaves && !salary) {
            return res.status(404).json({
                message: "package not found"
            })
        } else {
            res.status(200).send({
                message: "package",
                leaves, salary
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

exports.getPackageofEmployee = async (req, res) => {
    try {
        const { emp_id } = req.body

        const package = await db.sequelize.query("select poe.emp_id,p.* from packageOfEmp poe left join `package` p on poe.package_id = p.id where poe.emp_id = " + emp_id + "", { type: QueryTypes.SELECT })
        if (!package) {
            return res.status(404).json({
                message: "package not found"
            })
        } else {
            res.status(200).send({
                message: "package",
                package
            })
        }
    } catch (error) {
        res.status(500).send(error)
    }
}


exports.getSingle = async (req, res) => {
    try {
        const { package_id } = req.body;

        const components = await db.sequelize.query("select scip.id as _id , scip.salary_component_name as scip_id,scip.monthly_value,scip.yearly_value, scip.type,scip.calculation_type ,sc.* from salary_component_in_package scip left join salary_component sc on sc.id =scip.salary_component_name where package_id=" + package_id + "", { type: QueryTypes.SELECT })


        if (!leaves && !components) {
            return res.status(404).json({
                message: "package not found"
            })
        } else {
            res.status(200).send({
                message: "package",
                components
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}
exports.addLeavesToPackage = async (req, res) => {
    try {
        const { package_id, leave_id } = req.body;

        var leavesResult = await LeavesInPackage.create({ "leave_id": leave_id, "package_id": package_id });
        // const leaves = await db.sequelize.query("SELECT lip.id as lip_id,l.* from leavesInPackage lip left join `leave` l on l.id =lip.leave_id where package_id =" + package_id, { type: QueryTypes.SELECT });

        if (!leavesResult) {
            return res.status(404).json({
                message: "package not found"
            })
        } else {
            res.status(200).send({
                message: "package",
                leavesResult
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}
exports.removeLeaveFromPackage = async (req, res) => {
    try {
        const { id } = req.body;
        var leavesResult = await LeavesInPackage.destroy({ where: { "id": id } });
        //  const leaves = await db.sequelize.query("SELECT lip.id as lip_id,l.* from leavesInPackage lip left join `leave` l on l.id =lip.leave_id where package_id ="+package_id, { type: QueryTypes.SELECT });

        if (!leavesResult) {
            return res.status(404).json({
                message: "leave not found"
            })
        } else {
            res.status(200).send({
                message: "package",
                leavesResult
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}
exports.addComponentToPackage = async (req, res) => {
    try {
        const { component } = req.body;

        var salary_component = await salaryComponentinPackage.create(component);
        // const leaves = await db.sequelize.query("SELECT lip.id as lip_id,l.* from leavesInPackage lip left join `leave` l on l.id =lip.leave_id where package_id ="+package_id, { type: QueryTypes.SELECT });

        if (!salary_component) {
            return res.status(404).json({
                message: "package not found"
            })
        } else {
            res.status(200).send({
                message: "package",
                salary_component
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

exports.updateComponentToPackage = async (req, res) => {
    try {
        const { component, scip_id } = req.body;

        var salary_component = await salaryComponentinPackage.update(component, { where: { "id": scip_id } });
        // const leaves = await db.sequelize.query("SELECT lip.id as lip_id,l.* from leavesInPackage lip left join `leave` l on l.id =lip.leave_id where package_id ="+package_id, { type: QueryTypes.SELECT });

        if (!salary_component) {
            return res.status(404).json({
                message: "package not found"
            })
        } else {
            res.status(200).send({
                message: "package",
                salary_component
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

exports.removeComponentFromPackage = async (req, res) => {
    try {
        const { id } = req.body;

        var componentResult = await salaryComponentinPackage.destroy({ where: { "id": id } });
        //  const leaves = await db.sequelize.query("SELECT lip.id as lip_id,l.* from leavesInPackage lip left join `leave` l on l.id =lip.leave_id where package_id ="+package_id, { type: QueryTypes.SELECT });

        if (!componentResult) {
            return res.status(404).json({
                message: "component not found"
            })
        } else {
            res.status(200).send({
                message: "package",
                componentResult
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

exports.getPackageForEmp = async (req, res) => {
    try {
        var package = await db.sequelize.query("SELECT * FROM user.package p left join user.packageOfEmp poe  on p.id=poe.package_id", { type: QueryTypes.SELECT })
        if (!package) {
            return res.status(404).json({
                message: "package not found"
            })
        } else {
            res.status(200).send({
                message: "package",
                package
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}

exports.getPackageInfo = async (req, res) => {
    try {
        var package = await salaryComponentinPackage.findAll({
            where: {
                package_id: req.body.package_id
            },
            include: [
                {
                    model: model.Package,
                    as: 'package_data',
                    subQuery: false
                },
                {
                    model: model.SalaryComponent,
                    as: 'salary_component_data',
                    subQuery: false,
                }
            ]
        })

        if (!package) {
            return res.status(400).json({
                message: "Something went wrong"
            })
        } else {
            return res.status(200).json({
                message: "Success",
                package
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}








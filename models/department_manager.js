const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class DepartmentManager extends Model {
        static associations(models) {
            DepartmentManager.belongsTo(models.Department, {
                foreignKey: "department_id",
                as: 'dept_data'
            })

            DepartmentManager.belongsTo(models.Employee, {
                foreignKey: "manager_id",
                as: 'emp_data'
            })
        }
    }

    DepartmentManager.init({
        department_id: {
            type: DataTypes.INTEGER,
            field: 'department_id'
        },
        manager_id: {
            type: DataTypes.INTEGER,
            field: 'manager_id'
        }
    }, {
        sequelize,
        tableName: 'department_manager',
        modelName: 'DepartmentManager',
        timestamps: false
    }
    )
    return DepartmentManager
}
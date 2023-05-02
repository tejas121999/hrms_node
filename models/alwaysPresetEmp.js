const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class AlwaysPresentEmp extends Model {
        static associate(models) {
            AlwaysPresentEmp.belongsTo(models.Employee, {
                foreignKey: "employee_id",
                as: 'emp_data'
            })
        }
    }

    AlwaysPresentEmp.init({
        employee_id: {
            type: DataTypes.INTEGER,
            field: 'employee_id'
        },
        owner_id: {
            type: DataTypes.INTEGER,
            field: 'owner_id'
        },
        minimum_start_time: {
            type: DataTypes.DATE,
            field: 'minimum_start_time'
        },
        maximum_start_time: {
            type: DataTypes.DATE,
            field: 'maximum_start_time'
        },
        minimum_end_time: {
            type: DataTypes.DATE,
            field: 'minimum_end_time'
        },
        maximum_end_time: {
            type: DataTypes.DATE,
            field: 'maximum_end_time'
        },
        description: {
            type: DataTypes.STRING,
            field: 'description'
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            field: 'isDeleted',
            defaultValue: false
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'createdAt'
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: 'updatedAt'
        },
    }, {
        sequelize,
        tableName: 'always_present_employee',
        modelName: 'AlwaysPresentEmp',
        timestamps: true
    })
    return AlwaysPresentEmp
}
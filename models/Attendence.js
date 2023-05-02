const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Attendence extends Model {
        static associate(models) {
            Attendence.belongsTo(models.Employee, {
                foreignKey: "employee_id",
                as: 'emp_attendence_data'
            })
        }
    }

    Attendence.init({
        owner_id: {
            type: DataTypes.INTEGER,
            field: 'owner_id'
        },
        employee_id: {
            type: DataTypes.INTEGER,
            field: 'employee_id'
        },
        inTime: {
            type: DataTypes.DATE,
            field: 'inTime'
        },
        outTime: {
            type: DataTypes.DATE,
            field: 'outTime'
        },
        hours: {
            type: DataTypes.INTEGER,
            field: 'hours'
        },
        roundOf: {
            type: DataTypes.STRING,
            field: 'roundOf'
        },
        attendence_date: {
            type: DataTypes.STRING,
            field: 'attendence_date'
        },
        status: {
            type: DataTypes.STRING,
            field: 'status'
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'createdAt'
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: 'updatedAt'
        }
    }, {
        sequelize,
        tableName: 'attendance',
        modelName: 'Attendence',
        timestamps: true
    })
    return Attendence
}
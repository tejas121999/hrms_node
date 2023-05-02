const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class AssignShift extends Model {

    }

    AssignShift.init({
        shift_emp_id: {
            type: DataTypes.INTEGER,
            field: 'shift_emp_id'
        },
        shift_id: {
            type: DataTypes.INTEGER,
            field: 'shift_id'
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            field: 'isDeleted',
            defaultValue: false,
        }
    },
        {
            sequelize,
            tableName: 'shiftofEmp',
            modelName: 'AssignShift',
            timestamps: true
        }
    )
    return AssignShift
}
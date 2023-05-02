const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class LeaveTypeOfEmp extends Model {

    }

    LeaveTypeOfEmp.init({
        leave_type_id: {
            type: DataTypes.INTEGER,
            field: 'leave_type_id'
        },
        leave_emp_id: {
            type: DataTypes.INTEGER,
            field: 'leave_emp_id'
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            field: 'isDeleted',
            defaultValue: false,
        }
    },
        {
            sequelize,
            tableName: 'leave_type_of_emp',
            modelName: 'LeaveTypeOfEmp',
            timestamps: true
        }
    )
    return LeaveTypeOfEmp
}
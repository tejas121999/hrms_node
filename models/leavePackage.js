const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class LeavePackage extends Model {

    }

    LeavePackage.init({
        leave_emp_id: {
            type: DataTypes.INTEGER,
            field: 'leave_emp_id'
        },
        leave_id: {
            type: DataTypes.INTEGER,
            field: 'leave_id'
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            field: 'isDeleted',
            defaultValue: false,
        }
    },
        {
            sequelize,
            tableName: 'leaveofemp',
            modelName: 'LeavePackage',
            timestamps: true
        }
    )
    return LeavePackage
}
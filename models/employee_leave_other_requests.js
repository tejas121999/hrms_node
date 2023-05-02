const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Employee_leave_other_request extends Model {
        // static associate(models) {
        //     Employee_leave_other_request.belongsTo(models.Employee, {
        //         foreignKey: "request_user_id",
        //         as: 'other_manager_data'
        //     })

        //     Employee_leave_other_request.belongsTo(models.Employee_Leave, {
        //         foreignKey: "employee_leave_id",
        //         as: 'other_leave_data'
        //     })
        // }
        //TODO: Currently using raw query, this can be used in the future
    }

    Employee_leave_other_request.init({
        employee_leave_id: {
            type: DataTypes.INTEGER,
            field: 'employee_leave_id'
        },
        request_user_id: {
            type: DataTypes.INTEGER,
            field: 'request_user_id'
        }
    }, {
        sequelize,
        tableName: 'employee_leave_other_request',
        modelName: 'Employee_leave_other_request',
        timestamps: false
    })
    return Employee_leave_other_request
}
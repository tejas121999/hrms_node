const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Employee_Leave extends Model {
        static associate(models) {
            // Employee_Leave.belongsTo(models.Leave, {
            //     foreignKey: "leave_type",
            //     as: 'leave_type_data'
            // })

            Employee_Leave.belongsTo(models.Employee, {
                foreignKey: "manager_id",
                as: 'emp_manager_name_data'
            })

            Employee_Leave.belongsTo(models.Owner, {
                foreignKey: "owner_id",
                as: 'emp_leave_owner_data'
            })

            Employee_Leave.belongsTo(models.Employee, {
                foreignKey: "emp_id",
                as: 'emp_leave_data'
            })
            Employee_Leave.belongsTo(models.LeaveType, {
                foreignKey: "leave_type",
                as: 'leave_type_data'
            })
        }
    }

    Employee_Leave.init({
        emp_id: {
            type: DataTypes.INTEGER,
            field: 'emp_id'
        },
        leave_type: {
            type: DataTypes.INTEGER,
            field: 'leave_type'
        },
        manager_id: {
            type: DataTypes.INTEGER,
            field: 'manager_id'
        },
        owner_id: {
            type: DataTypes.INTEGER,
            field: 'owner_id'
        },
        available_leave: {
            type: DataTypes.STRING,
            field: 'available_leave'
        },
        from_date: {
            type: DataTypes.DATE,
            field: 'from_date'
        },
        to_date: {
            type: DataTypes.DATE,
            field: 'to_date'
        },
        total_leave_days: {
            type: DataTypes.INTEGER,
            field: 'total_leave_days'
        },
        reason: {
            type: DataTypes.STRING,
            field: 'reason'
        },
        other_manager_name: {
            type: DataTypes.INTEGER,
            field: 'other_manager_name'
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            field: 'isDeleted',
            defaultValue: false,
        },
        isApproved: {
            type: DataTypes.INTEGER,
            field: 'isApproved',
        }
    }, {
        sequelize,
        tableName: 'employee_leave',
        modelName: 'Employee_Leave',
        timestamps: true
    })
    return Employee_Leave
}
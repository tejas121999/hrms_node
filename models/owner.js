const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Owner extends Model {
        static associate(models) {
            Owner.hasMany(models.OvertimeApprovalNotification, {
                foreignKey: "owner_id"
            })

            Owner.hasMany(models.OvertimeNotification, {
                foreignKey: "owner_id"
            })

            Owner.hasOne(models.Company, {
                foreignKey: "company_owner_id"
            })

            Owner.hasOne(models.Loan, {
                foreignKey: "loan_owner_id"
            })

            Owner.hasOne(models.Branch, {
                foreignKey: "branch_owner_id"
            })

            Owner.hasOne(models.Department, {
                foreignKey: "department_owner_id"
            })

            Owner.hasOne(models.Designation, {
                foreignKey: "designation_owner_id"
            })

            Owner.hasOne(models.Employee, {
                foreignKey: "user_owner_id",
            })

            Owner.hasOne(models.employeeLoan, {
                foreignKey: "emploan_owner_id",
            })

            Owner.hasOne(models.RoleManager, {
                foreignKey: "role_owner_id",
            })

            Owner.hasOne(models.Employee_Leave, {
                foreignKey: "owner_id",
            })

            Owner.hasOne(models.ApprovalNotification, {
                foreignKey: "owner_id",
            })

            Owner.hasMany(models.LeaveConfiguration, {
                foreignKey: "owner_id"
            })

            Owner.hasMany(models.AttendanceConfiguration, {
                foreignKey: "owner_id"
            })

            Owner.hasMany(models.LeaveApproval, {
                foreignKey: "owner_id"
            })

            Owner.hasMany(models.LeaveEncashApplication, {
                foreignKey: "owner_id"
            })

            Owner.hasMany(models.LeaveEncashApproval, {
                foreignKey: "owner_id"
            })

            Owner.hasMany(models.LeaveApplicationNotification, {
                foreignKey: "owner_id"
            })

            Owner.hasMany(models.LeaveApprovalNotification, {
                foreignKey: "owner_id"
            })

            Owner.hasMany(models.LeavePendingNotification, {
                foreignKey: "owner_id"
            })

            Owner.hasMany(models.LeaveEncashAppovalNotification, {
                foreignKey: "owner_id"
            })
        }
    }

    Owner.init({
        owner_name: {
            type: DataTypes.STRING,
            field: 'owner_name'
        },
        subscription: {
            type: DataTypes.STRING,
            field: 'subscription'
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
        tableName: 'owner',
        modelName: 'Owner',
        timestamps: true
    })
    return Owner
}
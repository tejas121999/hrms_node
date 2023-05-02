const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Department extends Model {
        static associate(models) {
            Department.hasOne(models.DepartmentManager, {
                foreignKey: 'department_id',
            })

            Department.hasOne(models.Employee, {
                foreignKey: 'department_id',
            })

            Department.hasOne(models.ApprovalNotification, {
                foreignKey: 'department_id',
            })

            Department.hasOne(models.AbsentNotification, {
                foreignKey: 'department_id',
            })

            Department.belongsTo(models.Owner, {
                foreignKey: "department_owner_id",
                as: 'department_owner_data'
            })

            Department.belongsTo(models.Employee, {
                foreignKey: "manager_id",
                as: 'manager_data'
            })

            Department.hasMany(models.OvertimeApprovalNotification, {
                foreignKey: 'department_id',
            })

            Department.hasMany(models.OvertimeNotification, {
                foreignKey: 'department_id',
            })

            Department.hasMany(models.LeaveApproval, {
                foreignKey: 'department_id',
            })

            Department.hasMany(models.LeaveEncashApplication, {
                foreignKey: 'department_id',
            })

            Department.hasMany(models.LeaveEncashApproval, {
                foreignKey: 'department_id',
            })

            Department.hasMany(models.LeaveApplicationNotification, {
                foreignKey: 'department_id',
            })

            Department.hasMany(models.LeaveApprovalNotification, {
                foreignKey: 'department_id',
            })

            Department.hasMany(models.LeavePendingNotification, {
                foreignKey: 'department_id',
            })

            Department.hasMany(models.LeaveEncashAppovalNotification, {
                foreignKey: 'department_id',
            })
        }
    }

    Department.init({
        department_owner_id: {
            type: DataTypes.INTEGER,
            field: 'department_owner_id'
        },
        department_code: {
            type: DataTypes.STRING,
            field: 'department_code'
        },
        department_name: {
            type: DataTypes.STRING,
            field: 'department_name'
        },
        parent_department: {
            type: DataTypes.STRING,
            field: 'parent_department'
        },
        phone_number: {
            type: DataTypes.STRING,
            field: 'phone_number'
        },
        manager_id: {
            type: DataTypes.INTEGER,
            field: 'manager_id'
        },
        fax: {
            type: DataTypes.STRING,
            field: 'fax'
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            field: 'isDeleted',
            defaultValue: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'createdAt'
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: 'updatedAt'
        }

    },
        {
            sequelize,
            tableName: 'department',
            modelName: 'Department',
            timestamps: true
        }
    )
    return Department
}
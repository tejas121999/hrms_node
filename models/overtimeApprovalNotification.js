const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class OvertimeApprovalNotification extends Model { 
        static associate (models){
            OvertimeApprovalNotification.belongsTo(models.Owner, {
                foreignKey: 'owner_id',
                as: 'owner_data'
            });

            OvertimeApprovalNotification.belongsTo(models.Department, {
                foreignKey: 'department_id',
                as: 'approval_notification'
            })
        }
    }

    OvertimeApprovalNotification.init({
        department_id: {
            type: DataTypes.INTEGER,
            field: 'department_id'
        },
        require_approval_of: {
            type: DataTypes.STRING,
            field: 'require_approval_of'
        },
        owner_id: {
            type: DataTypes.INTEGER,
            field: 'owner_id'
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
    }, {
        sequelize,
        tableName: 'overtime_approval_notification',
        modelName: 'OvertimeApprovalNotification',
        timestamps: true
    })
    return OvertimeApprovalNotification
}
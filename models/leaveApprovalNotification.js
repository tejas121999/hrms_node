const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class LeaveApprovalNotification extends Model { 
        static associate (models){
            LeaveApprovalNotification.belongsTo(models.Owner, {
                foreignKey: 'owner_id',
                as: 'owner_data'
            });

            LeaveApprovalNotification.belongsTo(models.Department, {
                foreignKey: 'department_id',
                as: 'leave_approval_notification'
            })
        }
    }

    LeaveApprovalNotification.init({
        department_id: {
            type: DataTypes.INTEGER,
            field: 'department_id'
        },
        send_approval_notification_to: {
            type: DataTypes.STRING,
            field: 'send_approval_notification_to'
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
        tableName: 'leave_approval_notification',
        modelName: 'LeaveApprovalNotification',
        timestamps: true
    })
    return LeaveApprovalNotification
}
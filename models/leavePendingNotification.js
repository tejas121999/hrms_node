const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class LeavePendingNotification extends Model { 
        static associate (models){
            LeavePendingNotification.belongsTo(models.Owner, {
                foreignKey: 'owner_id',
                as: 'owner_data'
            });

            LeavePendingNotification.belongsTo(models.Department, {
                foreignKey: 'department_id',
                as: 'leave_pending_notification'
            })
        }
    }

    LeavePendingNotification.init({
        department_id: {
            type: DataTypes.INTEGER,
            field: 'department_id'
        },
        send_pending_notification_to: {
            type: DataTypes.STRING,
            field: 'send_pending_notification_to'
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
        tableName: 'leave_pending_notification',
        modelName: 'LeavePendingNotification',
        timestamps: true
    })
    return LeavePendingNotification
}
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class LeaveApplicationNotification extends Model { 
        static associate (models){
            LeaveApplicationNotification.belongsTo(models.Owner, {
                foreignKey: 'owner_id',
                as: 'owner_data'
            });

            LeaveApplicationNotification.belongsTo(models.Department, {
                foreignKey: 'department_id',
                as: 'leave_application_notification'
            })
        }
    }

    LeaveApplicationNotification.init({
        department_id: {
            type: DataTypes.INTEGER,
            field: 'department_id'
        },
        send_application_notification_to: {
            type: DataTypes.STRING,
            field: 'send_application_notification_to'
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
        tableName: 'leave_application_notification',
        modelName: 'LeaveApplicationNotification',
        timestamps: true
    })
    return LeaveApplicationNotification
}
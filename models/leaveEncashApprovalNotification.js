const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class LeaveEncashAppovalNotification extends Model { 
        static associate (models){
            LeaveEncashAppovalNotification.belongsTo(models.Owner, {
                foreignKey: 'owner_id',
                as: 'owner_data'
            });

            LeaveEncashAppovalNotification.belongsTo(models.Department, {
                foreignKey: 'department_id',
                as: 'leave_encash_approval_notification'
            })
        }
    }

    LeaveEncashAppovalNotification.init({
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
        tableName: 'leave_encash_approval_notification',
        modelName: 'LeaveEncashAppovalNotification',
        timestamps: true
    })
    return LeaveEncashAppovalNotification
}
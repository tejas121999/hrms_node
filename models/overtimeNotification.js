const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class OvertimeNotification extends Model { 
        static associate (models){
            OvertimeNotification.belongsTo(models.Owner, {
                foreignKey: 'owner_id',
                as: 'owner_data'
            });

            OvertimeNotification.belongsTo(models.Department, {
                foreignKey: 'department_id',
                as: 'overtime_notification'
            })
        }
    }

    OvertimeNotification.init({
        department_id: {
            type: DataTypes.INTEGER,
            field: 'department_id'
        },
        send_notification_to: {
            type: DataTypes.STRING,
            field: 'send_notification_to'
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
        tableName: 'overtime_notification',
        modelName: 'OvertimeNotification',
        timestamps: true
    })
    return OvertimeNotification
}
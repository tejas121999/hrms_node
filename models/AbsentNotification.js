const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class AbsentNotification extends Model {
        static associate(models) {
            AbsentNotification.belongsTo(models.Owner, {
                foreignKey: 'owner_id',
                as: 'owner_data'
            })

            AbsentNotification.belongsTo(models.Department, {
                foreignKey: 'department_id',
                as: 'approval_notification'
            })
        }
    }

    AbsentNotification.init({
        owner_id: {
            type: DataTypes.INTEGER,
            field: 'owner_id'
        },
        department_id: {
            type: DataTypes.INTEGER,
            field: 'department_id'
        },
        send_absent_notification_to: {
            type: DataTypes.STRING,
            field: 'send_absent_notification_to'
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
            tableName: 'absent_notification',
            modelName: 'AbsentNotification',
            timestamps: true
        }
    )

    return AbsentNotification
}
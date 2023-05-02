const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class ApprovalNotification extends Model {
        static associate(models) {
            ApprovalNotification.belongsTo(models.Owner, {
                foreignKey: 'owner_id',
                as: 'owner_data'
            })

            ApprovalNotification.belongsTo(models.Department, {
                foreignKey: 'department_id',
                as: 'approval_notification'
            })
        }
    }

    ApprovalNotification.init({
        owner_id: {
            type: DataTypes.INTEGER,
            field: 'owner_id'
        },
        department_id: {
            type: DataTypes.INTEGER,
            field: 'department_id'
        },
        send_approval_notification_to: {
            type: DataTypes.STRING,
            field: 'send_approval_notification_to'
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
            tableName: 'approval_notification',
            modelName: 'ApprovalNotification',
            timestamps: true
        }
    )
    return ApprovalNotification
}
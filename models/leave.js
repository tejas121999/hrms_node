const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Leave extends Model {
        static associate(models) {
            // Leave.hasOne(models.Employee_Leave, {
            //     foreignKey: "leave_type"
            // })
        }
    }

    Leave.init({
        leave_name: {
            type: DataTypes.STRING,
            field: 'leave_name'
        },
        no_of_days: {
            type: DataTypes.STRING,
            field: 'no_of_days'
        },
        leave_desc: {
            type: DataTypes.STRING,
            field: 'leave_desc'
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            field: 'isDeleted',
            defaultValue: false,
        },
        leave_owner_id: {
            type: DataTypes.INTEGER,
            field: 'leave_owner_id'
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
            tableName: 'leave',
            modelName: 'Leave',
            timestamps: true
        }
    )
    return Leave
}
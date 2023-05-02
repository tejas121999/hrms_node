const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class LeaveConfiguration extends Model {
        static associate(models) {
            LeaveConfiguration.belongsTo(models.Owner, {
                foreignKey: "owner_id"
            });
            LeaveConfiguration.belongsTo(models.Company, {
                foreignKey: "company_id"
            })
        }
    }

    LeaveConfiguration.init({
        leave_balance: {
            type: DataTypes.JSON,
            field: 'leave_balance'
        },
        approval: {
            type: DataTypes.JSON,
            field: 'approval'
        },
        subordinates: {
            type: DataTypes.JSON,
            field: 'subordinates'
        },
        leave_meter: {
            type: DataTypes.JSON,
            field: 'leave_meter'
        },
        owner_id: {
            type: DataTypes.INTEGER,
            field: 'owner_id'
        },
        company_id: {
            type: DataTypes.INTEGER,
            field: 'company_id'
        }

    }, {
        sequelize,
        tableName: 'leave_configuration',
        modelName: 'LeaveConfiguration',
        timestamps: true
    })
    return LeaveConfiguration
}
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class LeaveTypeConfiguration extends Model {
        static associate(models) {
            LeaveTypeConfiguration.belongsTo(models.Owner, {
                foreignKey: "owner_id"
            });
            LeaveTypeConfiguration.belongsTo(models.Company, {
                foreignKey: "company_id"
            })
        }
    }

    LeaveTypeConfiguration.init({
        data: {
            type: DataTypes.JSON,
            field: 'data'
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
        tableName: 'leave_type_configuration',
        modelName: 'LeaveTypeConfiguration',
        timestamps: true
    }) 

    return LeaveTypeConfiguration
}
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class LeaveType extends Model {
        static associate(models) {
            LeaveType.belongsTo(models.Owner, {
                foreignKey: "owner_id"
            });
            LeaveType.belongsTo(models.Company, {
                foreignKey: "company_id"
            });
            LeaveType.hasOne(models.Employee_Leave, {
                foreignKey: "leave_type"
            })
        }
    }

    LeaveType.init({
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
        },
        leave_amount_criteria:{
            type:DataTypes.JSON,
            field:'leave_amount_criteria'
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            field: 'isDeleted',
            defaultValue: false,
        },
        leave_name:{
            type: DataTypes.STRING,
            field: 'leave_name'
        },
        no_of_days:{
            type: DataTypes.INTEGER,
            field: 'no_of_days'
        }
    }, {
        sequelize,
        tableName: 'leave_type',
        modelName: 'LeaveType',
        timestamps: true
    })

    return LeaveType
}
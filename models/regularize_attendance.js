const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class RegularizeAttendance extends Model {
        static associate(models) {

            RegularizeAttendance.belongsTo(models.Employee, {
                foreignKey: "emp_id",
                as: 'emp_data'
            })

            RegularizeAttendance.belongsTo(models.Shift, {
                foreignKey: "shift_type",
                as: 'shift_data'
            })
        }
    }

    RegularizeAttendance.init({
        date:{
            type: DataTypes.DATE,
            field: 'date'
        },
        checkin_time:{
            type: DataTypes.DATE,
            field: 'checkin_time'
        },
        checkout_time:{
            type: DataTypes.DATE,
            field: 'checkout_time'
        },
        day_type: {
            type: DataTypes.STRING,
            field: 'day_type'
        },
        reason: {
            type: DataTypes.STRING,
            field: 'reason'
        },
        emp_id: {
            type: DataTypes.INTEGER,
            field: 'emp_id'
        },
        owner_id: {
            type: DataTypes.INTEGER,
            field: 'owner_id'
        },
        shift_type: {
            type: DataTypes.INTEGER,
            field: 'shift_type'
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            field: 'isDeleted',
            defaultValue: false,
        },
        manager_id:{
            type: DataTypes.INTEGER,
            field:'manager_id'
        },
        isApproved: {
            type: DataTypes.INTEGER,
            field: 'isApproved',
        }
     
    }, {
        sequelize,
        tableName: 'regularize_attendance',
        modelName: 'RegularizeAttendance',
        timestamps: true
    })
    return RegularizeAttendance
}
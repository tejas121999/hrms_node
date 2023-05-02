const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class LateComingEarlyGoing extends Model { }

    LateComingEarlyGoing.init({
        lc_activate_emp_late_coming: {
            type: DataTypes.BOOLEAN,
            field: 'lc_activate_emp_late_coming'
        },
        lc_deduct_every_late_going: {
            type: DataTypes.BOOLEAN,
            field: 'lc_deduct_every_late_going'
        },
        lc_deduction_type: {
            type: DataTypes.STRING,
            field: 'lc_deduction_type'
        },
        lc_leave_type_for_deduction: {
            type: DataTypes.STRING,
            field: 'lc_leave_type_for_deduction'
        },
        eg_activate_emp_early_coming: {
            type: DataTypes.BOOLEAN,
            field: 'eg_activate_emp_early_coming'
        },
        eg_deduct_every_early_going: {
            type: DataTypes.BOOLEAN,
            field: 'eg_deduct_every_early_going'
        },
        eg_deduction_type: {
            type: DataTypes.STRING,
            field: 'eg_deduction_type'
        },
        eg_leave_type_for_deduction: {
            type: DataTypes.STRING,
            field: 'eg_leave_type_for_deduction'
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
        tableName: 'lateComing_earlyGoing',
        modelName: 'LateComingEarlyGoing',
        timestamps: true
    })
    return LateComingEarlyGoing
}
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class CreditLeave extends Model { }

    CreditLeave.init({
        emp_id:{
            type: DataTypes.INTEGER,
            field: 'emp_id'
        },
        date: {
            type: DataTypes.DATE,
            field: 'date'
        },
        resone: {
            type: DataTypes.STRING,
            field: 'resone'
        },
        manager_name: {
            type: DataTypes.STRING,
            field: 'manager_name'
        },
        isApproved: {
            type: DataTypes.BOOLEAN,
            field: 'isApproved'
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            field: 'isDeleted',
            defaultValue: false,
        },
        owner_id:{
            type: DataTypes.INTEGER,
            field: 'owner_id'
        }
    },
        {
            sequelize,
            tableName: 'credit_leave',
            modelName: 'CreditLeave',
            timestamps: true
        }
    )
    return CreditLeave
}
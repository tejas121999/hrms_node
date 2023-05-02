const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Alert extends Model { }

    Alert.init({
        alert_name: {
            type: DataTypes.INTEGER,
            field: 'alert_name'
        },
        SMS: {
            type: DataTypes.BOOLEAN,
            field: 'SMS',
            defaultValue: false,
        },
        email: {
            type: DataTypes.BOOLEAN,
            field: 'email',
            defaultValue: false,
        },
        dashboard: {
            type: DataTypes.BOOLEAN,
            field: 'dashboard',
            defaultValue: false,
        },
        user_email: {
            type: DataTypes.STRING,
            field: 'user_email'
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
        tableName: 'alert',
        modelName: 'Alert',
        timestamps: false
    })
    return Alert
}
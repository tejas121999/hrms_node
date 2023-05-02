const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class AttendenceSetting extends Model { }

    AttendenceSetting.init({
        owner_id: {
            type: DataTypes.INTEGER,
            field: 'owner_id'
        },
        title: {
            type: DataTypes.STRING,
            field: 'title'
        },
        code: {
            type: DataTypes.STRING,
            field: 'code'
        },
        color_code: {
            type: DataTypes.STRING,
            field: 'color_code'
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
    }, {
        sequelize,
        tableName: 'attendance_setting',
        modelName: 'AttendenceSetting',
        timestamps: true
    })
    return AttendenceSetting
}
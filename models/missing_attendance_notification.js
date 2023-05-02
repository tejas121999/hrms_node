const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Missing_Attendance_Notification extends Model {

    }

    Missing_Attendance_Notification.init({
        owner_id: {
            type: DataTypes.INTEGER,
            field: 'owner_id'
        },
        Occurrence: {
            type: DataTypes.STRING,
            field: 'Occurrence'
        },
        when_to_send: {
            type: DataTypes.DATE,
            field: 'when_to_send'
        },
        TimeZone: {
            type: DataTypes.STRING,
            field: 'TimeZone'
        },
        starting_from: {
            type: DataTypes.DATE,
            field: 'starting_from'
        },
        collect_attendance_data_for: {
            type: DataTypes.STRING,
            field: 'collect_attendance_data_for'
        },
        Description: {
            type: DataTypes.STRING,
            field: 'Description'
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
            tableName: 'missing_attendance_notification',
            modelName: 'Missing_Attendance_Notification',
            timestamps: true
        }
    )

    return Missing_Attendance_Notification
}
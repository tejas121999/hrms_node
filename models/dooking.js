const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Booking extends Model { }

    Booking.init({
        name: {
            type: DataTypes.STRING,
            field: 'name'
        },
        description: {
            type: DataTypes.STRING,
            field: 'description'
        },
        booking_date: {
            type: DataTypes.DATE,
            field: 'booking_date'
        },
        upload: {
            type: DataTypes.STRING,
            field: 'upload'
        },
        code: {
            type: DataTypes.STRING,
            field: 'code'
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            field: 'isDeleted',
            defaultValue: false,
        },
        booking_owner_id: {
            type: DataTypes.INTEGER,
            field: 'booking_owner_id'
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
        tableName: 'booking',
        modelName: 'Booking',
        timestamps: true
    })

    return Booking
}
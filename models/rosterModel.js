const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Roster extends Model {}

    Roster.init({
        on_crew_year: {
            type: DataTypes.STRING,
            field: 'on_crew_year'
        },
        on_crew_date: {
            type: DataTypes.DATE,
            field: 'on_crew_date'
        },
        on_crew_id: {
            type: DataTypes.INTEGER,
            field: 'on_crew_id'
        },
        sign_on_crew_name: {
            type: DataTypes.STRING,
            field: 'sign_on_crew_name'
        },
        sign_off_crew_name: {
            type: DataTypes.STRING,
            field: 'sign_off_crew_name'
        },
        off_crew_year: {
            type: DataTypes.STRING,
            field: 'off_crew_year'
        },
        off_crew_date: {
            type: DataTypes.DATE,
            field: 'off_crew_date'
        },
        off_crew_id: {
            type: DataTypes.INTEGER,
            field: 'off_crew_id'
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
        tableName: 'roster',
        modelName: 'Roster',
        timestamps: true
    })
    return Roster
}
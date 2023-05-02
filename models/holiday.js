const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Holiday extends Model {
        static associate(models) {
            Holiday.hasMany(models.HolidayGeneral, {
                foreignKey: 'holiday_id',
            });
            Holiday.hasMany(models.HolidayDepartments, {
                foreignKey: 'holiday_id',
            });
            Holiday.hasMany(models.HolidayEmployees, {
                foreignKey: 'holiday_id',
            });
        }
    }

    Holiday.init({
        holiday_name: {
            type: DataTypes.INTEGER,
            field: 'holiday_name'
        },
        holiday_date: {
            type: DataTypes.DATE,
            field: 'holiday_date'
        },
        holiday_day: {
            type: DataTypes.STRING,
            field: 'holiday_day'
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            field: 'isDeleted',
            defaultValue: false,
        },
        holiday_owner_id: {
            type: DataTypes.INTEGER,
            field: 'holiday_owner_id'
        },
        option: {
            type: DataTypes.BOOLEAN, //TODO: Need to clarify what option does
            field: 'option'
        },
    },
        {
            sequelize,
            tableName: 'holiday',
            modelName: 'Holiday',
            timestamps: true
        }
    )
    return Holiday
}
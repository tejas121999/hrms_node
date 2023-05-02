const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class HolidayDepartments extends Model { 
        static associate(models) {
            // HolidayDepartments.hasMany(models.Department, {
            //     foreignKey: 'department_id',
            // });
            // HolidayDepartments.hasOne(models.Holiday, {
            //     foreignKey: 'holiday_id',
            // });
            HolidayDepartments.belongsTo(models.Department, {
                foreignKey: "department_id",
                as: 'department'
            });
            HolidayDepartments.belongsTo(models.Holiday, {
                foreignKey: "holiday_id"
            });
        }
    }

    HolidayDepartments.init({
        department_id: {
            type: DataTypes.INTEGER,
            field: 'department_id'
        },
        holiday_id: {
            type: DataTypes.INTEGER,
            field: 'holiday_id'
        }
    },
        {
            sequelize,
            tableName: 'holiday_departments',
            modelName: 'HolidayDepartments',
            timestamps: false
        }
    )
    return HolidayDepartments
}
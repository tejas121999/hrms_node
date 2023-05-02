const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class HolidayEmployees extends Model { 
        static associate(models) {
            HolidayEmployees.belongsTo(models.Employee, {
                foreignKey: 'employee_id',
            });
            HolidayEmployees.belongsTo(models.Holiday, {
                foreignKey: 'holiday_id',
            });
        }
    }

    HolidayEmployees.init({
        employee_id: {
            type: DataTypes.INTEGER,
            field: 'employee_id'
        },
        holiday_id: {
            type: DataTypes.INTEGER,
            field: 'holiday_id'
        }
    },
        {
            sequelize,
            tableName: 'holiday_employees',
            modelName: 'HolidayEmployees',
            timestamps: false
        }
    )
    return HolidayEmployees
}
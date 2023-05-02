const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class HolidayGeneral extends Model { 
        static associate(models) {
            HolidayGeneral.belongsTo(models.Holiday, {
                foreignKey: 'holiday_id',
            });
        }
    }

    HolidayGeneral.init({
        option: {
            type: DataTypes.BOOLEAN, //TODO: Need to clarify what option does
            field: 'option'
        },
        holiday_id: {
            type: DataTypes.INTEGER,
            field: 'holiday_id'
        }
    },
        {
            sequelize,
            tableName: 'holiday_general',
            modelName: 'HolidayGeneral',
            timestamps: false
        }
    )
    return HolidayGeneral
}
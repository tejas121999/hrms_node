const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class shift_half_day_full_day extends Model {
        static associate(models) {
            // shift_half_day_full_day.belongsTo(models.Shift, {
            //     foreignKey: "shift_id",
            //     as: 'shift_days'
            // })
        }
    }

    shift_half_day_full_day.init({
        shift_id: {
            type: DataTypes.INTEGER,
            field: 'shift_id'
        },
        day: {
            type: DataTypes.STRING,
            field: 'day'
        },
        week_days: {
            type: DataTypes.STRING,
            field: 'week_days'
        },
        off_days: {
            type: DataTypes.STRING,
            field: 'off_days'
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'createdAt'
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: 'updatedAt'
        },
    }, {
        sequelize,
        tableName: 'shift_day',
        modelName: 'shift_half_day_full_day',
        timestamps: true
    })
    return shift_half_day_full_day
}
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Shift extends Model {
        static associate(models) {
            Shift.hasOne(models.Employee, {
                foreignKey: 'emp_shift'
            })

            // Shift.hasOne(models.shift_half_day_full_day, {
            //     foreignKey: 'shift_id'
            // })

            Shift.hasOne(models.ShiftMetaData, {
                foreignKey: 'shift_id',
            });
        }
    }

    Shift.init({
        shift_name: {
            type: DataTypes.INTEGER,
            field: 'shift_name'
        },
        start_time: {
            type: DataTypes.DATE,
            field: 'start_time'
        },
        end_time: {
            type: DataTypes.DATE,
            field: 'end_time'
        },
        full_day_working_hrs: {
            type: DataTypes.STRING,
            field: 'full_day_working_hrs'
        },
        half_day_working_hrs: {
            type: DataTypes.STRING,
            field: 'half_day_working_hrs'
        },
        working_hours_ot_rate: {
            type: DataTypes.STRING,
            field: 'working_hours_ot_rate'
        },
        late_mark_time: {
            type: DataTypes.STRING,
            field: 'late_mark_time'
        },
        half_day_time: {
            type: DataTypes.STRING,
            field: 'half_day_time'
        },
        working_hrs_LT_half_day: {
            type: DataTypes.STRING,
            field: 'working_hrs_LT_half_day'
        },
        week_days: {
            type: DataTypes.STRING,
            field: 'week_days'
        },
        off_days: {
            type: DataTypes.STRING,
            field: 'off_days'
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            field: 'isDeleted',
            defaultValue: false,
        },
        shift_owner_id: {
            type: DataTypes.INTEGER,
            field: 'shift_owner_id'
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
            tableName: 'shift',
            modelName: 'Shift',
            timestamps: true
        }
    )
    return Shift
}
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ShiftMetaData extends Model {
        static associate(models) {
            // Shift.hasOne(models.Employee, {
            //     foreignKey: 'emp_shift'
            // })

            // Shift.hasOne(models.shift_half_day_full_day, {
            //     foreignKey: 'shift_id'
            // })
            ShiftMetaData.belongsTo(models.Shift, {
                foreignKey: "shift_id"
            })
        }
    }

    ShiftMetaData.init({
        shift_id: {
            type: DataTypes.INTEGER,
            field: 'shift_id'
        },
        code: {
            type: DataTypes.STRING,
            field: 'code'
        },
        description: {
            type: DataTypes.STRING,
            field: 'description'
        },
        flexible_time: {
            type: DataTypes.BOOLEAN,
            field: 'flexible_time'
        },
        break_shift: {
            type: DataTypes.BOOLEAN,
            field: 'break_shift'
        },
        cutof_time: {
            type: DataTypes.DATE,
            field: 'cutof_time'
        },
        break_time: {
            type: DataTypes.INTEGER,
            field: 'break_time'
        },
       
        createdAt: {
            type: DataTypes.DATE,
            field: 'createdAt'
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: 'updatedAt'
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            field: 'isDeleted',
            defaultValue: false,
        }
    },
        {
            sequelize,
            tableName: 'shift_meta_data',
            modelName: 'ShiftMetaData',
            timestamps: true
        }
    )
    return ShiftMetaData
}
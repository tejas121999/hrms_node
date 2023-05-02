const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class AttendanceConfiguration extends Model {
        static associate(models) {
            AttendanceConfiguration.belongsTo(models.Owner, {
                foreignKey: "owner_id"
            });
            AttendanceConfiguration.belongsTo(models.Company, {
                foreignKey: "company_id"
            })
            // AttendanceConfiguration.belongsTo(models.User, {
            //     foreignKey: "attendence_config_id"
            // })
        }
    }

    AttendanceConfiguration.init({
        check_in_out: {
            type: DataTypes.JSON,
            field: 'check_in_out'
        },
        present_absent: {
            type: DataTypes.JSON,
            field: 'present_absent'
        },
        shift: {
            type: DataTypes.JSON,
            field: 'shift'
        },
        regularization: {
            type: DataTypes.JSON,
            field: 'regularization'
        },
        subordinates: {
            type: DataTypes.JSON,
            field: 'subordinates'
        },
        others: {
            type: DataTypes.JSON,
            field: 'others'
        },
        owner_id: {
            type: DataTypes.INTEGER,
            field: 'owner_id'
        },
        company_id: {
            type: DataTypes.INTEGER,
            field: 'company_id'
        }

    }, {
        sequelize,
        tableName: 'attendance_configuration',
        modelName: 'AttendanceConfiguration',
        timestamps: true
    })
    return AttendanceConfiguration
}
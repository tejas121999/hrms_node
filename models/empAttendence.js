const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class EmpAttendance extends Model {
        static associate(models) {
            EmpAttendance.belongsTo(models.Employee, {
                foreignKey: "emp_attendence_name",
                as: 'emp_attendence_data'
            })
        }
    }

    EmpAttendance.init({
        emp_attendence_name: {
            type: DataTypes.INTEGER,
            field: 'emp_attendence_name'
        },
        attendence_owner_id: {
            type: DataTypes.INTEGER,
            field: 'attendence_owner_id'
        },
        attendence_date: {
            type: DataTypes.DATE,
            field: 'attendence_date'
        },
        status: {
            type: DataTypes.STRING,
            field: 'status'
        },
        start_time: {
            type: DataTypes.DATE,
            field: 'start_time'
        },
        end_time: {
            type: DataTypes.DATE,
            field: 'end_time'
        },
        total_time: {
            type: DataTypes.INTEGER,
            field: 'total_time'
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
            tableName: 'employee_attendence',
            modelName: 'EmpAttendance',
            timestamps: true
        }
    )
    return EmpAttendance
}
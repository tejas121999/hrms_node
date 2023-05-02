const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class SalaryGrade extends Model { }

    SalaryGrade.init({
        salary_grade_name: {
            type: DataTypes.INTEGER,
            field: 'salary_grade_name'
        },
        grade_salary_struct: {
            type: DataTypes.INTEGER,
            field: 'grade_salary_struct'
        },
        grade_salary_comp: {
            type: DataTypes.INTEGER,
            field: 'grade_salary_comp'
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
        tableName: 'salary_grade',
        modelName: 'SalaryGrade',
        timestamps: false
    }
    )
    return SalaryGrade
}
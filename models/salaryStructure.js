const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class SalaryStructure extends Model {

    }

    SalaryStructure.init({
        salary_structure_name: {
            type: DataTypes.INTEGER,
            field: 'salary_structure_name'
        },
        salary_stru_grade_id: {
            type: DataTypes.INTEGER,
            field: 'salary_stru_grade_id'
        },
        salary_stru_comp_id: {
            type: DataTypes.INTEGER,
            field: 'salary_stru_comp_id'
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
        tableName: 'salary_structure',
        modelName: 'SalaryStructure',
        timestamps: false
    })
    return SalaryStructure
}
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Salary extends Model {
        static associate(models) {
            Salary.belongsTo(models.Employee, {
                foreignKey: "employeeName",
                as: 'employee_name'
            })

            Salary.belongsTo(models.SalaryComponent, {
                foreignKey: "salary_component",
                as: 'salary_comp'
            })

        }
    }

    Salary.init({
        employeeName: {
            type: DataTypes.INTEGER,
            field: 'employeeName'
        },
        salary_component: {
            type: DataTypes.INTEGER,
            field: 'salary_component'
        },
        monthly: {
            type: DataTypes.STRING,
            field: 'monthly'
        },
        yearly: {
            type: DataTypes.STRING,
            field: 'yearly'
        },
        tax: {
            type: DataTypes.STRING,
            field: 'tax'
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
    }
        ,
        {
            sequelize,
            tableName: 'salary',
            modelName: 'Salary',
            timestamps: false
        }
    )
    return Salary
}
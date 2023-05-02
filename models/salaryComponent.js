const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class SalaryComponent extends Model {
        static associate(models) {
            SalaryComponent.hasOne(models.Salary, {
                foreignKey: 'salary_component'
            })

            SalaryComponent.hasOne(models.salaryComponentinPackage, {
                foreignKey: 'salary_component_name'
            })

            // SalaryComponent.hasOne(models.Package, {
            //     foreignKey: 'package_component'
            // })
        }
    }

    SalaryComponent.init({
        salary_component_name: {
            type: DataTypes.STRING,
            field: 'salary_component_name'
        },
        salary_component_code: {
            type: DataTypes.STRING,
            field: 'salary_component_code'
        },
        ledger: {
            type: DataTypes.STRING,
            field: 'ledger'
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            field: 'isDeleted',
            defaultValue: false,
        },
        component_owner_id: {
            type: DataTypes.INTEGER,
            field: 'component_owner_id'
        },
        component_type: {
            type: DataTypes.STRING,
            field: 'component_type'
        },
        pay_type: {
            type: DataTypes.STRING,
            field: 'pay_type'
        },
        calculation_type: {
            type: DataTypes.STRING,
            field: 'calculation_type'
        },
        calculate_value: {
            type: DataTypes.INTEGER,
            field: 'calculate_value'
        },
        configurations: {
            type: DataTypes.JSON,
            field: 'configurations'
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
        tableName: 'salary_component',
        modelName: 'SalaryComponent',
        timestamps: true
    }
    )
    return SalaryComponent
}
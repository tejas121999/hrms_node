const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class salaryComponentinPackage extends Model {
        static associate(models) {
            salaryComponentinPackage.belongsTo(models.Package, {
                foreignKey: "package_id",
                as: 'package_data'
            })

            salaryComponentinPackage.belongsTo(models.SalaryComponent, {
                foreignKey: "salary_component_name",
                as: 'salary_component_data'
            })
        }
    }
    salaryComponentinPackage.init({
        package_id: {
            type: DataTypes.INTEGER,
            field: 'package_id'
        },
        salary_component_name: {
            type: DataTypes.INTEGER,
            field: 'salary_component_name'
        },
        calculation_type: {
            type: DataTypes.STRING,
            field: 'calculation_type'
        },
        type: {
            type: DataTypes.STRING,
            field: 'type'
        },
        monthly_value: {
            type: DataTypes.STRING,
            field: 'monthly_value'
        },
        yearly_value: {
            type: DataTypes.STRING,
            field: 'yearly_value'
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
            tableName: 'salary_component_in_package',
            modelName: 'salaryComponentinPackage',
            timestamps: true
        })
    return salaryComponentinPackage
}
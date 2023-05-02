const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Package extends Model {
        static associate(models) {
            Package.hasOne(models.AssignPackage, {
                foreignKey: 'package_id'
            })

            Package.hasOne(models.Employee, {
                foreignKey: 'emp_package'
            })

            Package.hasOne(models.salaryComponentinPackage, {
                foreignKey: 'package_id'
            })
        }
    }

    Package.init({
        package_name: {
            type: DataTypes.STRING,
            field: 'package_name'
        },
        annual_ctc: {
            type: DataTypes.STRING,
            field: 'annual_ctc'
        },
        package_type: {
            type: DataTypes.STRING,
            field: 'package_type'
        },
        package_owner_id: {
            type: DataTypes.INTEGER,
            field: 'package_owner_id'
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            field: 'isDeleted',
            defaultValue: false
        }
    }, {
        sequelize,
        tableName: 'package',
        modelName: 'Package',
        timestamps: true
    })
    return Package
}
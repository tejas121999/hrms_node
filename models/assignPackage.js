const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class AssignPackage extends Model {
        static associate(model) {
            // AssignPackage.belongsTo(model.Employee, {
            //     foreignKey: 'emp_id',
            //     as: 'employee'
            // })

            AssignPackage.belongsTo(model.Package, {
                foreignKey: 'package_id',
                as: 'package_data'
            })
        }
    }

    AssignPackage.init({
        emp_id: {
            type: DataTypes.INTEGER,
            field: 'emp_id'
        },
        package_id: {
            type: DataTypes.INTEGER,
            field: 'package_id'
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            field: 'isDeleted',
            defaultValue: false,
        }
    },
        {
            sequelize,
            tableName: 'packageOfEmp',
            modelName: 'AssignPackage',
            timestamps: true
        }
    )
    return AssignPackage
}
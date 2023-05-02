const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class LeavesInPackage extends Model {
        static associate(models) {


            LeavesInPackage.belongsTo(models.Package, {
                foreignKey: "package_id",
                as: 'package'
            })
            LeavesInPackage.belongsTo(models.Leave, {
                foreignKey: "leave_id",
                as: 'leave'
            })
        }
    }
    

    LeavesInPackage.init({
        package_id: {
            type: DataTypes.INTEGER,
            field: 'package_id'
        },
        leave_id: {
            type: DataTypes.INTEGER,
            field: 'leave_id'
        }
    },
        {
            sequelize,
            tableName: 'leavesInPackage',
            modelName: 'LeavesInPackage',
            timestamps: false
        }
    )
    return LeavesInPackage
}
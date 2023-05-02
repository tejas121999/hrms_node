const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class RoleManager extends Model {
        static associate(models) {
            RoleManager.hasOne(models.UserAccess, {
                foreignKey: "role_id"
            })

            RoleManager.hasOne(models.User, {
                foreignKey: "user_role"
            })

            RoleManager.hasOne(models.Employee, {
                foreignKey: "emp_role"
            })
        }
    }

    RoleManager.init({
        roll_name: {
            type: DataTypes.STRING,
            field: 'roll_name'
        },
        colne_roll: {
            type: DataTypes.STRING,
            field: 'colne_roll'
        },
        type_roll: {
            type: DataTypes.STRING,
            field: 'type_roll'
        },
        role_owner_id: {
            type: DataTypes.INTEGER,
            field: 'role_owner_id'
        },
        access_id: {
            type: DataTypes.INTEGER,
            field: 'role_owner_id'
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            field: 'isDeleted',
            defaultValue: false,
        },
        defaultAccess: {
            type: DataTypes.BOOLEAN,
            field: 'defaultAccess',
            defaultValue: false,
        }
    }, {
        sequelize,
        tableName: 'role_master',
        modelName: 'RoleManager',
        timestamps: true
    }
    )
    return RoleManager
}
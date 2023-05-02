const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class RoleManagerNew extends Model {
        static associate(models) {
            // RoleManagerNew.hasOne(models.UserAccess, {
            //     foreignKey: "role_id"
            // })

            // RoleManagerNew.hasOne(models.User, {
            //     foreignKey: "user_role"
            // })

            // RoleManagerNew.hasOne(models.Employee, {
            //     foreignKey: "emp_role"
            // })
        }
    }

    RoleManagerNew.init({
        role_name: {
            type: DataTypes.STRING,
            field: 'role_name'
        },
        clone_role: {
            type: DataTypes.INTEGER,
            field: 'clone_role'
        },
        role_type: {
            type: DataTypes.STRING,
            field: 'role_type'
        },
        role_owner_id: {
            type: DataTypes.INTEGER,
            field: 'role_owner_id'
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            field: 'isDeleted',
            defaultValue: false,
        }
    }, {
        sequelize,
        tableName: 'role_master_new',
        modelName: 'RoleManagerNew',
        timestamps: true
    }
    )
    return RoleManagerNew
}
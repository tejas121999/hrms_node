const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class AccessMaster extends Model {
        static associate(models) {
            AccessMaster.belongsTo(models.Owner, {
                foreignKey: "owner_id"
            });
            AccessMaster.belongsTo(models.Company, {
                foreignKey: "company_id"
            })
        }
    }

    AccessMaster.init({
        data: {
            type: DataTypes.JSON,
            field: 'data'
        },
        owner_id: {
            type: DataTypes.INTEGER,
            field: 'owner_id'
        },
        company_id: {
            type: DataTypes.INTEGER,
            field: 'company_id'
        },
        role_id:{
            type:DataTypes.INTEGER,
            field:'role_id'
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            field: 'isDeleted',
            defaultValue: false,
        },
    }, {
        sequelize,
        tableName: 'access_master',
        modelName: 'AccessMaster',
        timestamps: true
    })

    return AccessMaster
}
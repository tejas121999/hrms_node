const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class RigManifest extends Model { }

    RigManifest.init({
        name: {
            type: DataTypes.STRING,
            field: 'name'
        },
        description: {
            type: DataTypes.STRING,
            field: 'description'
        },
        rigmanifest_date: {
            type: DataTypes.DATE,
            field: 'rigmanifest_date'
        },
        upload: {
            type: DataTypes.STRING,
            field: 'upload'
        },
        code: {
            type: DataTypes.STRING,
            field: 'code'
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            field: 'isDeleted',
            defaultValue: false,
        },
        rig_owner_id: {
            type: DataTypes.INTEGER,
            field: 'rig_owner_id'
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
        tableName: 'rig_manifest',
        modelName: 'RigManifest',
        timestamps: false
    }
    )
    return RigManifest
}
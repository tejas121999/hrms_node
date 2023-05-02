const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Designation extends Model {
        static associate(models) {
            // Designation.hasOne(models.OnCrewInRoster, {
            //     foreignKey: "on_designation_id"
            // })
            // Designation.hasOne(models.OffCrewInRoster, {
            //     foreignKey: "off_designation_id"
            // })
            Designation.hasOne(models.Employee, {
                foreignKey: 'designation_id'
            })

            Designation.belongsTo(models.Owner, {
                foreignKey: "designation_owner_id",
                as: 'designation_owner_data'
            })
        }
    }

    Designation.init({
        designation_owner_id: {
            type: DataTypes.INTEGER,
            field: 'designation_owner_id'
        },
        job_title: {
            type: DataTypes.STRING,
            field: 'job_title'
        },
        description: {
            type: DataTypes.STRING,
            field: 'description'
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
    },
        {
            sequelize,
            tableName: 'designation',
            modelName: 'Designation',
            timestamps: false
        }
    )
    return Designation
}
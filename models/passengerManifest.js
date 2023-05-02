const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class PassengerManifest extends Model { }

    PassengerManifest.init(
        {
            owner_id: {
                type: DataTypes.INTEGER,
                field: 'owner_id'
            },
            type: {
                type: DataTypes.STRING,
                field: 'type'
            },
            purchasing: {
                type: DataTypes.STRING,
                field: 'purchasing'
            },
            sub_vendor_code: {
                type: DataTypes.STRING,
                field: 'sub_vendor_code'
            },
            vendor_code: {
                type: DataTypes.STRING,
                field: 'vendor_code'
            },
            plant: {
                type: DataTypes.STRING,
                field: 'plant'
            },
            passengerManifest_date: {
                type: DataTypes.DATE,
                field: 'passengerManifest_date'
            },
            company_name: {
                type: DataTypes.STRING,
                field: 'company_name'
            },
            company_address: {
                type: DataTypes.STRING,
                field: 'company_address'
            },
            RFM_number: {
                type: DataTypes.STRING,
                field: 'RFM_number'
            },
            mode_of_journey: {
                type: DataTypes.STRING,
                field: 'mode_of_journey'
            },
            vendor_name: {
                type: DataTypes.STRING,
                field: 'vendor_name'
            },
            scheduled_sector: {
                type: DataTypes.STRING,
                field: 'scheduled_sector'
            },
            date_of_sortie: {
                type: DataTypes.STRING,
                field: 'date_of_sortie'
            },
            scheduled_dep_time: {
                type: DataTypes.STRING,
                field: 'scheduled_dep_time'
            },
            task: {
                type: DataTypes.STRING,
                field: 'task'
            },
            sortie_type: {
                type: DataTypes.STRING,
                field: 'sortie_type'
            },
            plant_of_manifest: {
                type: DataTypes.STRING,
                field: 'plant_of_manifest'
            },
            remark: {
                type: DataTypes.STRING,
                field: 'remark'
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
            tableName: 'passenger_manifest',
            modelName: 'PassengerManifest',
            timestamps: false
        }
    )
    return PassengerManifest
}
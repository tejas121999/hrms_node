const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class EmergencyInformation extends Model {  }

    EmergencyInformation.init({
        name:{
            type: DataTypes.STRING,
            field: 'name'
        },
        relation_with_employee:{
            type: DataTypes.STRING,
            field: 'relation_with_employee'
        },
        telephone_no:{
            type: DataTypes.STRING,
            field: 'telephone_no'
        },
        mobile_no: {
            type: DataTypes.STRING,
            field: 'mobile_no'
        },
        address: {
            type: DataTypes.STRING,
            field: 'address'
        },
        email: {
            type: DataTypes.STRING,
            field: 'email'
        },
        emergencyInfo_id:{
            type: DataTypes.INTEGER,
            field: 'emergencyInfo_id'
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            field: 'isDeleted',
            defaultValue: false,
        }
     
    }, {
        sequelize,
        tableName: 'emergency_information',
        modelName: 'EmergencyInformation',
        timestamps: true
    })
    return EmergencyInformation
}
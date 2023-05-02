const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class TDS extends Model { }

    TDS.init({
        assessment_year: {
            type: DataTypes.DATE,
            field: 'assessment_year'
        },
        payment_type: {
            type: DataTypes.DATE,
            field: 'payment_type'
        },
        parcentage: {
            type: DataTypes.FLOAT,
            field: 'parcentage'
        },
        section_type: {
            type: DataTypes.STRING,
            field: 'section_type'
        },
        description: {
            type: DataTypes.STRING,
            field: 'description'
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
        tableName: 'tds',
        modelName: 'TDS',
        timestamps: false
    })
    return TDS
}
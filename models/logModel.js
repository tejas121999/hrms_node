const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('.');

module.exports = (sequelize,DataTypes) => {
    class Log extends Model { }

    Log.init({
        object_id:{
            type: DataTypes.INTEGER,
            field: 'object_id'
        },
        object_types:{
            type: DataTypes.STRING,
            field: 'object_types'
        },
        user_id:{
            type: DataTypes.INTEGER,
            field: 'user_id'
        },
        message:{
            type: DataTypes.STRING,
            field:'message'
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'createdAt'
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: 'updatedAt'
        }
    },{
        sequelize,
        tableName: 'Log',
        modelName: 'log',
        timestamps: true
    })
    return Log
}
const { Model } = require('sequelize');
const { departmentGetById } = require('../controllers/department');

module.exports = (sequelize, DataTypes) => {
    class TemplateField extends Model { }

    TemplateField.init({
        department: {
            type: DataTypes.JSON,
            field: 'department'
        },
        designation: {
            type: DataTypes.JSON,
            field: 'designation'
        },
        employee: {
            type: DataTypes.JSON,
            field: 'employee'
        },
        package:{
            type: DataTypes.JSON,
            field:'package'
        },
        rig:{
            type:DataTypes.JSON,
            field:'rig'
        },
        passenger:{
            type:DataTypes.JSON,
            field:'passenger'
        },
        booking:{
            type:DataTypes.JSON,
            field:'booking'
        },
        roster:{
            type:DataTypes.JSON,
            field:'roster'    
        },
        // isDeleted: {
        //     type: DataTypes.BOOLEAN,
        //     field: 'isDeleted',
        //     defaultValue: false,
        // },
        owner_id:{
            type: DataTypes.INTEGER,
            field:'owner_id'
        },
        // form_name :{
        //     type:DataTypes.STRING,
        //     field:'form_name'
        // },
        // fields:{
        //     type:DataTypes.STRING,
        //     field:'fields'
        // }

    }, {
        sequelize,
        tableName: 'template_field',
        modelName: 'TemplateField',
        timestamps: true
    })
    return TemplateField
}
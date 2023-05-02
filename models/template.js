const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Template extends Model { }

    Template.init({
        template_name: {
            type: DataTypes.STRING,
            field: 'template_name'
        },
        template_type: {
            type: DataTypes.STRING,
            field: 'template_type'
        },
        template_description: {
            type: DataTypes.STRING,
            field: 'template_description'
        },
        template:{
            type: DataTypes.STRING,
            field:'template'
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            field: 'isDeleted',
            defaultValue: false,
        },
        owner_id:{
            type: DataTypes.INTEGER,
            field:'owner_id'
        },
        form_name :{
            type:DataTypes.STRING,
            field:'form_name'
        },
        fields:{
            type:DataTypes.STRING,
            field:'fields'
        }

    }, {
        sequelize,
        tableName: 'template',
        modelName: 'Template',
        timestamps: true
    })
    return Template
}
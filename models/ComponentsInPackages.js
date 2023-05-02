const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ComponentsInPackages extends Model {

    }

    ComponentsInPackages.init({
        package_id: {
            type: DataTypes.INTEGER,
            field: 'package_id'
        },
        salary_component_id: {
            type: DataTypes.INTEGER,
            field: 'salary_component_id'
        }
    }, {
        sequelize,
        tableName: 'componentsInPackages',
        modelName: 'ComponentsInPackages',
        timestamps: false
    })
    return ComponentsInPackages
}
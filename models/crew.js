const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Crew extends Model { 
        static associate(models) {
            Crew.hasMany(models.CrewEmployees, {
                foreignKey: "employee_id",
            })
            // Crew.hasMany(models.RosterYearly, {
            //     foreignKey: "on_crew_id",
            //     as:'on_crew'
            // })
            // Crew.hasMany(models.RosterYearly, {
            //     foreignKey: "off_crew_id",
            //     as:'off_crew'
            // })
        }
    }

    Crew.init({
        crew_name: {
            type: DataTypes.STRING,
            field: 'crew_name'
        },
        owner_id:{
            type: DataTypes.INTEGER,
            field: 'owner_id'
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            field: 'isDeleted',
            defaultValue: false,
        },
       
    }, {
        sequelize,
        tableName: 'crew',
        modelName: 'Crew',
        timestamps: true
    })
    return Crew
}
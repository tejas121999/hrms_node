const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class CrewEmployees extends Model { 
        static associate(models) {
            CrewEmployees.belongsTo(models.Crew, {
                foreignKey: "employee_id",
                as: 'employee_data'
            })
        }
    }

    CrewEmployees.init({
        designation_id: {
            type: DataTypes.INTEGER,
            field: 'designation_id'
        },
        employee_id: {
            type: DataTypes.INTEGER,
            field: 'employee_id'
        },
        crew_id:{
            type: DataTypes.INTEGER,
            field: 'crew_id'
        }
       
    }, {
        sequelize,
        tableName: 'crewEmployees',
        modelName: 'CrewEmployees',
        timestamps: true
    })
    return CrewEmployees
}
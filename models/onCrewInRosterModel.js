const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class OnCrewInRoster extends Model { 
        static associate(models) {
            // OnCrewInRoster.belongsTo(models.Designation, {
            //     foreignKey: "on_designation_id",
            //     as: 'designation_data'
            // })
            // OnCrewInRoster.belongsTo(models.Employee, {
            //     foreignKey: "on_employee_id",
            //     as: 'employee_data'
            // })
        }

    }

    OnCrewInRoster.init({
        roster_id: {
            type: DataTypes.INTEGER,
            field: 'roster_id'
        },
        on_designation_id: {
            type: DataTypes.INTEGER,
            field: 'on_designation_id'
        },
        on_employee_id: {
            type: DataTypes.INTEGER,
            field: 'on_employee_id'
        }
    },
        {
            sequelize,
            tableName: 'on_crew_in_roster',
            modelName: 'OnCrewInRoster',
            timestamps: false
        }
    )
    return OnCrewInRoster
}
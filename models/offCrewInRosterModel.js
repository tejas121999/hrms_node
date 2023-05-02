const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class OffCrewInRoster extends Model {
        static associate(models) {
            // OffCrewInRoster.belongsTo(models.Designation, {
            //     foreignKey: "off_designation_id",
            //     as: 'designation_data'
            // })
            // OffCrewInRoster.belongsTo(models.Employee, {
            //     foreignKey: "off_employee_id",
            //     as: 'employee_data'
            // })
        }
     }
    

    OffCrewInRoster.init({
        roster_id: {
            type: DataTypes.INTEGER,
            field: 'roster_id'
        },
        off_designation_id: {
            type: DataTypes.INTEGER,
            field: 'off_designation_id'
        },
        off_employee_id: {
            type: DataTypes.INTEGER,
            field: 'off_employee_id'
        }
    },
        {
            sequelize,
            tableName: 'off_crew_in_roster',
            modelName: 'OffCrewInRoster',
            timestamps: false
        }
    )
    return OffCrewInRoster
}
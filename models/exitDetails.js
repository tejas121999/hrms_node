const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ExitDetails extends Model {
        static associate(models){
            ExitDetails.belongsTo(models.Employee, {
                foreignKey: "employee_name",
                as: 'employee_name_data'
            })

            ExitDetails.belongsTo(models.Employee, {
                foreignKey: "interviewer",
                as: 'manager_name_data'
            })
        }
     }

    ExitDetails.init({
        employee_name:{
            type: DataTypes.INTEGER,
            field:'employee_name'
        },
        separation_date:{
            type: DataTypes.DATE,
            field:'separation_date'
        },
        resignation_letter_submitted:{
            type: DataTypes.STRING,
            field:'resignation_letter_submitted'
        },
        manager_clearance:{
            type: DataTypes.STRING,
            field:'manager_clearance'
        },
        details:{
            type:DataTypes.JSON,
            field:'details'
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
        interviewer:{
            type: DataTypes.INTEGER,
            field:'interviewer'
        }
    }, {
        sequelize,
        tableName: 'exit_details',
        modelName: 'ExitDetails',
        timestamps: true
    })
    return ExitDetails
}
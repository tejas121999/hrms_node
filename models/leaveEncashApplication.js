const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class LeaveEncashApplication extends Model { 
        static associate (models){
            LeaveEncashApplication.belongsTo(models.Owner, {
                foreignKey: 'owner_id',
                as: 'owner_data'
            });

            LeaveEncashApplication.belongsTo(models.Department, {
                foreignKey: 'department_id',
                as: 'leave_encash_application'
            })
        }
    }

    LeaveEncashApplication.init({
        department_id: {
            type: DataTypes.INTEGER,
            field: 'department_id'
        },
        require_application_of: {
            type: DataTypes.STRING,
            field: 'require_application_of'
        },
        owner_id: {
            type: DataTypes.INTEGER,
            field: 'owner_id'
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            field: 'isDeleted',
            defaultValue: false,
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
        tableName: 'leave_encash_application',
        modelName: 'LeaveEncashApplication',
        timestamps: true
    })
    return LeaveEncashApplication
}
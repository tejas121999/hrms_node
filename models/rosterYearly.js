const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class RosterYearly extends Model {
        static associate(models) {
            RosterYearly.belongsTo(models.Crew, {
                foreignKey: 'on_crew_id',
                as: 'on_crew'
            })
            RosterYearly.belongsTo(models.Crew, {
                foreignKey: 'off_crew_id',
                as: 'off_crew'
            })
        }
    }

    RosterYearly.init({
        gap: {
            type: DataTypes.INTEGER,
            filed: "gap"
        },
        startDate: {
            type: DataTypes.DATE,
            field: 'startDate'
        },
        on_crew_id: {
            type: DataTypes.INTEGER,
            field: 'on_crew_id'
        },
        endDate: {
            type: DataTypes.DATE,
            field: 'endDate'
        },
        off_crew_id: {
            type: DataTypes.INTEGER,
            field: 'off_crew_id'
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            field: 'isDeleted',
            defaultValue: false,
        }
    }, {
        sequelize,
        tableName: 'roster_yearly',
        modelName: 'RosterYearly',
        timestamps: true
    })
    return RosterYearly
}
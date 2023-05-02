const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Grade extends Model {
        static associate(models) {
        }
    }

    Grade.init({
        grade_name: {
            type: DataTypes.STRING,
            field: 'grade_name'
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
    },
        {
            sequelize,
            tableName: 'grade',
            modelName: 'Grade',
            timestamps: false
        }
    )
    return Grade
}
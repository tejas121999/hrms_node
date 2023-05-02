const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class Loan extends Model {
        static associate(models) {
            Loan.belongsTo(models.Owner, {
                foreignKey: "loan_owner_id",
                as: 'loan_owner_data'
            })

            Loan.hasOne(models.employeeLoan, {
                foreignKey: "loan_name",
            })
        }
    }

    Loan.init({
        loan_owner_id: {
            type: DataTypes.INTEGER,
            field: 'loan_owner_id'
        },
        loan_name: {
            type: DataTypes.STRING,
            field: 'loan_name'
        },
        rate_of_interest: {
            type: DataTypes.STRING,
            field: 'rate_of_interest'
        },
        max_loan_ammount: {
            type: DataTypes.STRING,
            field: 'max_loan_ammount'
        },
        duration: {
            type: DataTypes.STRING,
            field: 'duration'
        },
        duration_type: {
            type: DataTypes.STRING,
            field: 'duration_type'
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            field: 'isDeleted',
            defaultValue: false,
        },

    }, {
        sequelize,
        tableName: 'loan',
        modelName: 'Loan',
        timestamps: true
    })

    return Loan
}
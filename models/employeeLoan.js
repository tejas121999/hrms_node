const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class employeeLoan extends Model {
        static associate(models) {
            employeeLoan.belongsTo(models.Owner, {
                foreignKey: "emploan_owner_id",
                as: 'loanemp_owner_data'
            })

            employeeLoan.belongsTo(models.Loan, {
                foreignKey: "loan_name",
                as: 'loan_data_name'
            })

            employeeLoan.belongsTo(models.Employee, {
                foreignKey: "loan_employee_name",
                as: 'loan_emp_datae'
            })
        }
    }

    employeeLoan.init({
        loan_name: {
            type: DataTypes.INTEGER,
            field: 'loan_name'
        },
        emploan_owner_id: {
            type: DataTypes.INTEGER,
            field: 'emploan_owner_id'
        },
        loan_employee_name: {
            type: DataTypes.INTEGER,
            field: 'loan_employee_name'
        },
        rate_of_interest: {
            type: DataTypes.STRING,
            field: 'rate_of_interest'
        },
        loan_amount: {
            type: DataTypes.STRING,
            field: 'loan_amount'
        },
        disbursment_date: {
            type: DataTypes.DATE,
            field: 'disbursment_date'
        },
        employee_address: {
            type: DataTypes.STRING,
            field: 'employee_address'
        },
        exempt: {
            type: DataTypes.BOOLEAN,
            field: 'exempt',
            defaultValue: false,
        },
        loan_start_date: {
            type: DataTypes.DATE,
            field: 'loan_start_date'
        },
        instalment_amount: {
            type: DataTypes.STRING,
            field: 'instalment_amount'
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            field: 'isDeleted',
            defaultValue: false,
        }
    }, {
        sequelize,
        tableName: 'employeeLoan',
        modelName: 'employeeLoan',
        timestamps: true
    })
    return employeeLoan

}
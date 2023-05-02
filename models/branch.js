const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Branch extends Model {
        static associate(model) {
            Branch.belongsTo(model.Owner, {
                foreignKey: "branch_owner_id",
                as: 'branch_owner_data'
            })
        }
    }

    Branch.init({
        // todo forign key

        branch_owner_id: {
            type: DataTypes.INTEGER,
            field: 'branch_owner_id'
        },
        branch_name: {
            type: DataTypes.STRING,
            field: 'branch_name'
        },
        branch_code: {
            type: DataTypes.STRING,
            field: 'branch_code'
        },
        branch_type: {
            type: DataTypes.STRING,
            field: 'branch_type'
        },
        branch_address: {
            type: DataTypes.STRING,
            field: 'branch_address'
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            field: 'isDeleted',
            defaultValue: false,
        },
        weekly_off: {
            type: DataTypes.STRING,
            field: 'weekly_off'
        },
        company_name: {
            type: DataTypes.STRING,
            field: 'company_name'
        },
        phone_no: {
            type: DataTypes.STRING,
            field: 'phone_no'
        },
        contact_person: {
            type: DataTypes.STRING,
            field: 'contact_person'
        },
        branch_email: {
            type: DataTypes.STRING,
            field: 'branch_email'
        },
        year_of_establish: {
            type: DataTypes.DATE,
            field: 'year_of_establish'
        },
        fax: {
            type: DataTypes.STRING,
            field: 'fax'
        },
        branch_mobile: {
            type: DataTypes.STRING,
            field: 'branch_mobile'
        },
        pan_no: {
            type: DataTypes.STRING,
            field: 'pan_no'
        },
        header: {
            type: DataTypes.STRING,
            field: 'header'
        },
        cst: {
            type: DataTypes.STRING,
            field: 'cst'
        },
        excise_registration: {
            type: DataTypes.STRING,
            field: 'excise_registration'
        },
        footer: {
            type: DataTypes.STRING,
            field: 'footer'
        },
        associate_user: {
            type: DataTypes.STRING,
            field: 'associate_user'
        },
        associate_warehouse: {
            type: DataTypes.STRING,
            field: 'associate_warehouse'
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
            tableName: 'branch',
            modelName: 'Branch',
            timestamps: false
        }
    )
    return Branch
}
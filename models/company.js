const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Company extends Model {
        static associate(models) {
            Company.hasOne(models.Employee, {
                foreignKey: "company_id"
            })

            Company.belongsTo(models.Owner, {
                foreignKey: "company_owner_id",
                as: 'owner_data'
            });

            Company.hasOne(models.LeaveConfiguration, {
                foreignKey: "company_id"
            })

            Company.hasOne(models.AttendanceConfiguration, {
                foreignKey: "company_id"
            })
        }
    }
    Company.init({
        company_owner_id: {
            type: DataTypes.INTEGER,
            field: 'company_owner_id'
        },
        company_name: {
            type: DataTypes.STRING,
            field: 'company_name'
        },
        company_code: {
            type: DataTypes.STRING,
            field: 'company_code'
        },
        parent_company: {
            type: DataTypes.STRING,
            field: 'parent_company'
        },
        subsidiaries: {
            type: DataTypes.STRING,
            field: 'subsidiaries'
        },
        year_of_establishment: {
            type: DataTypes.DATE,
            field: 'year_of_establishment'
        },
        company_phone: {
            type: DataTypes.STRING,
            field: 'company_phone'
        },
        company_email: {
            type: DataTypes.STRING,
            field: 'company_email'
        },
        company_fax: {
            type: DataTypes.STRING,
            field: 'company_fax'
        },
        company_website: {
            type: DataTypes.STRING,
            field: 'company_website'
        },
        company_contact_person: {
            type: DataTypes.STRING,
            field: 'company_contact_person'
        },
        company_mobile: {
            type: DataTypes.STRING,
            field: 'company_mobile'
        },
        company_vat: {
            type: DataTypes.STRING,
            field: 'company_vat'
        },
        company_pan: {
            type: DataTypes.STRING,
            field: 'company_pan'
        },
        company_gst: {
            type: DataTypes.STRING,
            field: 'company_gst'
        },
        company_excise_registration: {
            type: DataTypes.STRING,
            field: 'company_excise_registration'
        },
        company_header: {
            type: DataTypes.STRING,
            field: 'company_header'
        },
        company_footer: {
            type: DataTypes.STRING,
            field: 'company_footer'
        },
        company_note: {
            type: DataTypes.STRING,
            field: 'company_note'
        },
        company_address: {
            type: DataTypes.STRING,
            field: 'company_address'
        },
        company_secondary_address: {
            type: DataTypes.STRING,
            field: 'company_secondary_address'
        },
        company_city: {
            type: DataTypes.STRING,
            field: 'company_city'
        },
        company_district: {
            type: DataTypes.STRING,
            field: 'company_district'
        },
        company_state: {
            type: DataTypes.STRING,
            field: 'company_state'
        },
        company_zipcode: {
            type: DataTypes.STRING,
            field: 'company_zipcode'
        },
        company_country: {
            type: DataTypes.STRING,
            field: 'company_country'
        },
        type_of_orginization: {
            type: DataTypes.STRING,
            field: 'type_of_orginization'
        },
        CIN_no: {
            type: DataTypes.STRING,
            field: 'CIN_no'
        },
        IEC: {
            type: DataTypes.STRING,
            field: 'IEC'
        },
        TAN: {
            type: DataTypes.STRING,
            field: 'TAN'
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
        tableName: 'company',
        modelName: 'Company',
        timestamps: true
    })
    return Company
}
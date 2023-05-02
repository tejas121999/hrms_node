const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class LeaveConfig extends Model {

    }

    LeaveConfig.init({
        owner_id: {
            type: DataTypes.INTEGER,
            field: 'owner_id'
        },
        clb_1: {
            type: DataTypes.BOOLEAN,
            field: 'clb_1',
            defaultValue: false,
        },
        clb_2: {
            type: DataTypes.STRING,
            field: 'clb_2'
        },
        clb_3: {
            type: DataTypes.BOOLEAN,
            field: 'clb_3',
            defaultValue: false,
        },
        clb_4: {
            type: DataTypes.STRING,
            field: 'clb_4'
        },
        clb_5: {
            type: DataTypes.STRING,
            field: 'clb_5'
        },
        clb_6: {
            type: DataTypes.BOOLEAN,
            field: 'clb_6',
            defaultValue: false,
        },
        clb_7: {
            type: DataTypes.BOOLEAN,
            field: 'clb_7',
            defaultValue: false,
        },
        clb_8: {
            type: DataTypes.BOOLEAN,
            field: 'clb_8',
            defaultValue: false,
        },
        clb_9: {
            type: DataTypes.STRING,
            field: 'clb_9'
        },
        clb_10: {
            type: DataTypes.BOOLEAN,
            field: 'clb_10',
            defaultValue: false,
        },
        ac_1: {
            type: DataTypes.BOOLEAN,
            field: 'ac_1',
            defaultValue: false,
        },
        ac_2: {
            type: DataTypes.BOOLEAN,
            field: 'ac_2',
            defaultValue: false,
        },
        ac_3: {
            type: DataTypes.BOOLEAN,
            field: 'ac_3',
            defaultValue: false,
        },
        ac_4: {
            type: DataTypes.STRING,
            field: 'ac_4'
        },
        ac_5: {
            type: DataTypes.STRING,
            field: 'ac_5'
        },
        ac_6: {
            type: DataTypes.STRING,
            field: 'ac_5'
        },
        ac_7: {
            type: DataTypes.BOOLEAN,
            field: 'ac_7',
            defaultValue: false,
        },
        ac_8: {
            type: DataTypes.BOOLEAN,
            field: 'ac_8',
            defaultValue: false,
        },
        ac_9: {
            type: DataTypes.BOOLEAN,
            field: 'ac_9',
            defaultValue: false,
        },
        ac_10: {
            type: DataTypes.BOOLEAN,
            field: 'ac_10',
            defaultValue: false,
        },
        ac_11: {
            type: DataTypes.BOOLEAN,
            field: 'ac_11',
            defaultValue: false,
        },
        ac_12: {
            type: DataTypes.STRING,
            field: 'ac_12'
        },
        ac_13: {
            type: DataTypes.BOOLEAN,
            field: 'ac_13',
            defaultValue: false,
        },
        ac_14: {
            type: DataTypes.BOOLEAN,
            field: 'ac_14',
            defaultValue: false,
        },
        ac_15: {
            type: DataTypes.STRING,
            field: 'ac_12'
        },
        sc_1: {
            type: DataTypes.BOOLEAN,
            field: 'sc_1',
            defaultValue: false,
        },
        sc_2: {
            type: DataTypes.BOOLEAN,
            field: 'sc_2',
            defaultValue: false,
        },
        sc_3: {
            type: DataTypes.BOOLEAN,
            field: 'sc_3',
            defaultValue: false,
        },
        sc_4: {
            type: DataTypes.BOOLEAN,
            field: 'sc_4',
            defaultValue: false,
        },
        sc_5: {
            type: DataTypes.BOOLEAN,
            field: 'sc_5',
            defaultValue: false,
        },
        sc_6: {
            type: DataTypes.BOOLEAN,
            field: 'sc_6',
            defaultValue: false,
        },
        sc_7: {
            type: DataTypes.BOOLEAN,
            field: 'sc_7',
            defaultValue: false,
        },
        lmc_1: {
            type: DataTypes.STRING,
            field: 'lmc_1'
        },
        lmc_2: {
            type: DataTypes.STRING,
            field: 'lmc_2'
        },
        lmc_3: {
            type: DataTypes.BOOLEAN,
            field: 'lmc_3',
            defaultValue: false,
        },
        lmc_4: {
            type: DataTypes.BOOLEAN,
            field: 'lmc_4',
            defaultValue: false,
        },
        lmc_5: {
            type: DataTypes.STRING,
            field: 'lmc_5'
        },
        lmc_6: {
            type: DataTypes.STRING,
            field: 'lmc_6'
        },
        lmc_7: {
            type: DataTypes.BOOLEAN,
            field: 'lmc_7',
            defaultValue: false,
        },
        lmc_8: {
            type: DataTypes.BOOLEAN,
            field: 'lmc_8',
            defaultValue: false,
        },
        lmc_9: {
            type: DataTypes.BOOLEAN,
            field: 'lmc_8',
            defaultValue: false,
        },
        lmc_10: {
            type: DataTypes.STRING,
            field: 'lmc_10'
        },
        lmc_11: {
            type: DataTypes.STRING,
            field: 'lmc_11'
        },
        lmc_12: {
            type: DataTypes.BOOLEAN,
            field: 'lmc_12',
            defaultValue: false,
        },
        lmc_13: {
            type: DataTypes.BOOLEAN,
            field: 'lmc_13',
            defaultValue: false,
        },
        lmc_14: {
            type: DataTypes.STRING,
            field: 'lmc_14'
        },
        lmc_15: {
            type: DataTypes.STRING,
            field: 'lmc_15'
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
        tableName: 'leave_config',
        modelName: 'LeaveConfig',
        timestamps: true
    })

    return LeaveConfig
}
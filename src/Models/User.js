const { DataTypes } = require('sequelize')
const { tokenHash } = require('token-hash')

module.exports = (sequelize) => {

    sequelize.define('User', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password:{
            type: DataTypes.STRING,
            allowNull:false,
            set(value) {
                this.setDataValue( 'password', tokenHash( "RS256", value ) );
            }
        }
    },
    { timetamps: false})

}
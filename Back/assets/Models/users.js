module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User',{
    iduser:{
      name:'idusers',
      type:DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    mail:{
      type:DataTypes.STRING,
      unique: true,
      isEmail: true,
      allowNull:false,
    },
    password:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    biographie:{
      type:DataTypes.STRING,
    },
    nickname:{
      type:DataTypes.STRING,
      unique: true,
      allowNull:false,
    },
    role:{
      type:DataTypes.BOOLEAN
    },
  },{timestamps:false}
  )
  User.associate = (models) => {

  }
  return User;
}
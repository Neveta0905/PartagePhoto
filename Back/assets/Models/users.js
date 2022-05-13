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
      defaultValue: 'My bio ...',
    },
    nickname:{
      type:DataTypes.STRING,
      unique: true,
      allowNull:false,
      defaultValue: 'New User',
    },
    role:{
      type:DataTypes.BOOLEAN
    },
  },{timestamps:false}
  )
  User.associate = (models) => {
    models.User.hasMany(models.Multimedia,{
      foreignKey:
      {name:'creator'}
    })

    models.User.hasMany(models.Event,{
      foreignKey:
      {name:'creator'}
    })

    models.User.belongsToMany(models.Event,
      {
        through: models.Events_subscribers,
        foreignKey:'users_id'
      }
    )
  }
  return User;
}
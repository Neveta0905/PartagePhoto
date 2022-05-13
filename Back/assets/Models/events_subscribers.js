module.exports = (sequelize,DataTypes) => {
  const Events_subscribers = sequelize.define('Events_subscribers',{
  }, {timestamps:false}
  )
  Events_subscribers.associate = (models) =>{
    models.Events_subscribers.hasMany(models.Event,{
      foreignKey:
      {name:'idevent'}
    })
    models.Events_subscribers.hasMany(models.User,{
      foreignKey:
      {name:'iduser'}
    })
  }
  return Events_subscribers;
} 
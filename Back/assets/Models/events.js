module.exports = (sequelize,DataTypes) => {
	const Event = sequelize.define('Event',{
		idevent:{
			name:'idevent',
			type:DataTypes.INTEGER,
			primaryKey:true,
			autoIncrement: true,
		},
		name:{
			type: DataTypes.STRING,
			allowNull:false,
		},
		begin_date:{
			type: DataTypes.DATEONLY,
			allowNull:false,
		},
		end_date:{
			type: DataTypes.DATEONLY,
			allowNull:false,
		},
		country:{
			type: DataTypes.STRING,
			allowNull:false,
		},
		city:{
			type: DataTypes.STRING,
			allowNull:false,
		},
	},{timestamps:false}
	)
	Event.associate = (models) => {
		models.Event.belongsTo(models.User,{
			foreignKey:{
				allowNull : false,
				name : 'creator'
			}
		})

		models.Event.belongsToMany(models.User,
			{
				through: models.Events_subscribers,
				foreignKey:'events_id'
			}
		)
	}
	return Event;
}
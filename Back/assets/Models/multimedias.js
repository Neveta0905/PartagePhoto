module.exports = (sequelize, DataTypes) =>{
	const Multimedia = sequelize.define('Multimedias',{
		idMultimedia:{
			name:'idMultimedia',
		    type:DataTypes.INTEGER,
		    primaryKey: true,
		    autoIncrement: true
		},
		name:{
			type:DataTypes.STRING,
		    allowNull:false,
		},
		creation_date:{
			type: DataTypes.DATEONLY,
			allowNull:true,
		},
		type:{
			type:DataTypes.STRING,
			allowNull:false
		},
		url:{
			type:DataTypes.STRING,
			allowNull:false,
		},
	},
		{timestamps:false}
	);
	Multimedia.associate = (models) =>{
		models.Multimedias.belongsTo(models.User,{
			foreignKey:{
				allowNull : false,
				name : 'creator'
			}
		})

		models.Multimedias.belongsTo(models.Event,{
			foreignKey:{
				allowNull : false,
				name : 'idevent'
			}
		})
	}
	return Multimedia;
}
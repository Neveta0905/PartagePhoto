const Regex_list = {
	password: new RegExp(".{8,}"),
	mail: new RegExp("[a-z0-9\-_]+[a-z0-9\.\-_]*@[a-z0-9\-_]{2,}\.[a-z\.\-_]+[a-z\-_]+"),
	nickname: new RegExp(".{4,}"),
}

const errors_list = {
	password : 'Password too short',
	mail: 'Mail structure not respected',
	nickname: 'Nickname too short',
}

exports.check_regex = (compared,regex,res) =>{
	if(!Regex_list[regex].test(compared))
		res.status(400).json({error:errors_list[regex]})
	else return true
}
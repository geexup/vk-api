var request = require("request");
var token = "";
var timeout = 1000;

Object.prototype.toString = function(){
	var keys = Object.keys(this);
	var str = "";
	for (var i = 0; i < keys.length; i++) {
		var key = keys[i];
		var val = this[key];
		if(i <= 0)
			str += key+"="+val;
		else
			str += "&"+key+"="+val;
	};
	return str;
};

var get_method = function (mathod, params, callback){
	var str_params = params != null ? params.toString()+"&" : "";
	var url = 'https://api.vk.com/method/'+mathod+'?'+str_params+'access_token='+token;
	request({url:url, timeout: timeout}, function(error, response, body){
		if(!error)
		{
			var res = JSON.parse(body);
			if(!res.error)
				callback(res.response, null);
			else
				callback(null, res);
		}
		else
			callback(null, error);
	});
};
var user = function (id) {
	var uid = id;
	this.id = id;
	this.wall = new wall(id);
	this.params_add_owner = function (params){
		if(params == null)
			params = {};
		params.user_id = uid;
		return params;
	};

	this.get = function(params, callback){
		params = this.params_add_owner(params);
		get_method("users.get", params, callback);
	};
	this.isAppUser = function(params, callback){
		params = this.params_add_owner(params);
		get_method("users.isAppUser", params, callback);
	};
	this.getFollowers = function(params, callback){
		params = this.params_add_owner(params);
		get_method("users.getFollowers", params, callback);
	};
	this.getSubscriptions = function(params, callback){
		params = this.params_add_owner(params);
		get_method("users.getSubscriptions", params, callback);
	};

	this.status = {
		get : function (callback){
			get_method("status.get", {user_id: uid}, callback);
		},
		set : function (status, callback, group_id){
			var params = {};
			if(typeof group_id !== "undefined")
				params.group_id = group_id;
			params.text = encodeURI(status);
			get_method("status.set", params, callback);
		}
	};

	this.friends = {
		params_add_owner : this.params_add_owner,
		get : function (params, callback){
			params = this.params_add_owner(params);
			get_method("friends.get", params, callback);
		},
		getOnline : function (params, callback){
			params = this.params_add_owner(params);
			get_method("friends.getOnline", params, callback);
		},
		add : function (params, callback){
			params = this.params_add_owner(params);
			get_method("friends.add", params, callback);
		},
		edit : function (params, callback){
			params = this.params_add_owner(params);
			get_method("friends.edit", params, callback);
		},
		delete : function (params, callback){
			params = this.params_add_owner(params);
			get_method("friends.delete", params, callback);
		},
		getLists : function (params, callback){
			params = this.params_add_owner(params);
			get_method("friends.getLists", params, callback);
		},
		areFriends : function (params, callback){
			if(params == null)
				params = {};
			params.user_ids = uid;
			get_method("friends.areFriends", params, callback);
		},
		search : function (params, callback){
			params = this.params_add_owner(params);
			get_method("friends.search", params, callback);
		}
	};
};
//## Static
user.get = function(params, callback){
	get_method("users.get", params, callback);
};
user.isAppUser = function(params, callback){
	get_method("users.isAppUser", params, callback);
};
user.getFollowers = function(params, callback){
	get_method("users.getFollowers", params, callback);
};
user.getSubscriptions = function(params, callback){
	get_method("users.getSubscriptions", params, callback);
};
user.search = function (params, callback){
	get_method("users.search", params, callback);
};
user.report = function (params, callback){
	get_method("users.report", params, callback);
};
user.getNearby = function (params, callback){
	get_method("users.getNearby", params, callback);
};

var status = {
	get : function (params, callback){
		get_method("status.get", params, callback);
	},
	set : function (status, callback, group_id){
		var params = {};
		if(typeof group_id !== "undefined")
			params.group_id = group_id;
		params.text = encodeURI(status);
		get_method("status.set", params, callback);
	}
};
var friends = {
	get : function (params, callback){
		get_method("friends.get", params, callback);
	},
	getOnline : function (params, callback){
		get_method("friends.getOnline", params, callback);
	},
	getMutual : function (params, callback){
		get_method("friends.getMutual", params, callback);
	},
	getRecent : function (params, callback){
		get_method("friends.getRecent", params, callback);
	},
	getRequests : function (params, callback){
		get_method("friends.getRequests", params, callback);
	},
	add : function (params, callback){
		get_method("friends.add", params, callback);
	},
	edit : function (params, callback){
		get_method("friends.edit", params, callback);
	},
	delete : function (params, callback){
		get_method("friends.delete", params, callback);
	},
	getLists : function (params, callback){
		get_method("friends.getLists", params, callback);
	},
	addList : function (params, callback){
		get_method("friends.addList", params, callback);
	},
	editList : function (params, callback){
		get_method("friends.editList", params, callback);
	},
	deleteList : function (params, callback){
		get_method("friends.deleteList", params, callback);
	},
	getAppUsers : function (callback){
		get_method("friends.getAppUsers", null, callback);
	},
	getByPhones : function (params, callback){
		get_method("friends.getByPhones", params, callback);
	},
	deleteAllRequests : function (callback){
		get_method("friends.deleteAllRequests", null, callback);
	},
	getSuggestions : function (params, callback){
		get_method("friends.getSuggestions", params, callback);
	},
	areFriends : function (params, callback){
		get_method("friends.areFriends", params, callback);
	},
	getAvailableForCall : function (params, callback){
		get_method("friends.getAvailableForCall", params, callback);
	},
	search : function (params, callback){
		get_method("friends.search", params, callback);
	}
};

var wall = function (domain_owner_id){
	var doid = [ typeof domain_owner_id === "number" ? "owner_id" : "domain", domain_owner_id.toString() ];
	this.params_add_owner = function (params){
		if(params == null)
			params = {};
		params[doid[0]] = doid[1];
		return params;
	};
	this.get = function (params, callback){
		params = this.params_add_owner(params);
		get_method("wall.get", params, callback);
	};
	this.search = function (params, callback){
		params = this.params_add_owner(params);
		get_method("wall.search", params, callback);
	};
	wall.post = function (params, callback){
		params = this.params_add_owner(params);
		get_method("wall.post", params, callback);
	};
	wall.getReposts = function (params, callback){
		params = this.params_add_owner(params);
		get_method("wall.getReposts", params, callback);
	};
	wall.edit = function (params, callback){
		params = this.params_add_owner(params);
		get_method("wall.edit", params, callback);
	};
	wall.delete = function (params, callback){
		params = this.params_add_owner(params);
		get_method("wall.delete", params, callback);
	};
	wall.restore = function (params, callback){
		params = this.params_add_owner(params);
		get_method("wall.restore", params, callback);
	};
	wall.pin = function (params, callback){
		params = this.params_add_owner(params);
		get_method("wall.pin", params, callback);
	};
	wall.unpin = function (params, callback){
		params = this.params_add_owner(params);
		get_method("wall.unpin", params, callback);
	};
	wall.getComments = function (params, callback){
		params = this.params_add_owner(params);
		get_method("wall.getComments", params, callback);
	};
	wall.addComment = function (params, callback){
		params = this.params_add_owner(params);
		get_method("wall.addComment", params, callback);
	};
	wall.editComment = function (params, callback){
		params = this.params_add_owner(params);
		get_method("wall.editComment", params, callback);
	};
	wall.deleteComment = function (params, callback){
		params = this.params_add_owner(params);
		get_method("wall.deleteComment", params, callback);
	};
	wall.restoreComment = function (params, callback){
		params = this.params_add_owner(params);
		get_method("wall.restoreComment", params, callback);
	};
	wall.reportPost = function (params, callback){
		params = this.params_add_owner(params);
		get_method("wall.reportPost", params, callback);
	};
	wall.reportComment = function (params, callback){
		params = this.params_add_owner(params);
		get_method("wall.reportComment", params, callback);
	};
};
wall.get = function (params, callback){
	get_method("wall.get", params, callback);
};
wall.search = function (params, callback){
	get_method("wall.search", params, callback);
};
wall.getById = function (params, callback){
	get_method("wall.getById", params, callback);
};
wall.post = function (params, callback){
	get_method("wall.post", params, callback);
};
wall.repost = function (params, callback){
	get_method("wall.repost", params, callback);
};
wall.getReposts = function (params, callback){
	get_method("wall.getReposts", params, callback);
};
wall.edit = function (params, callback){
	get_method("wall.edit", params, callback);
};
wall.delete = function (params, callback){
	get_method("wall.delete", params, callback);
};
wall.restore = function (params, callback){
	get_method("wall.restore", params, callback);
};
wall.pin = function (params, callback){
	get_method("wall.pin", params, callback);
};
wall.unpin = function (params, callback){
	get_method("wall.unpin", params, callback);
};
wall.getComments = function (params, callback){
	get_method("wall.getComments", params, callback);
};
wall.addComment = function (params, callback){
	get_method("wall.addComment", params, callback);
};
wall.editComment = function (params, callback){
	get_method("wall.editComment", params, callback);
};
wall.deleteComment = function (params, callback){
	get_method("wall.deleteComment", params, callback);
};
wall.restoreComment = function (params, callback){
	get_method("wall.restoreComment", params, callback);
};
wall.reportPost = function (params, callback){
	get_method("wall.reportPost", params, callback);
};
wall.reportComment = function (params, callback){
	get_method("wall.reportComment", params, callback);
};

module.exports = {
	init: function (tkn, tmot){
		timeout = typeof tmot !== "undefined" ? tmot : 1000;
		token = tkn;
	}, 
	users : user,
	wall : wall,
	status : status,
	friends: friends
};

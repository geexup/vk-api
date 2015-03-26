Objects:
---------
* users
	* wall
	* status
	* storage
	* audio
* wall
* status
* friends
* storage
* audio

API Usage Example:
------------------
````
var vk = require("vk.js");
vk.init("token123");
var me = new vk.users(69088083);
me.wall.get({param_key: "value"}, function (response, error){
	if(!error)
		console.log(response);
});
````

This module uses [request](https://github.com/request/request)

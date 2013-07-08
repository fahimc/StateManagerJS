var StateManagerJS = {
	events : {
		STATE_CHANGE : "STATE_CHANGE"
	},
	_states : {},
	_callbacks : [],
	_const:
	{
		STATES:"states"
	},
	init:function()
	{
		console.log(this.hasLocalStorage(),localStorage[this._const.STATES]);
		if(this.hasLocalStorage() && localStorage[this._const.STATES])
		{
			this._states = JSON.parse(localStorage[this._const.STATES]);
		}
	},
	setState : function(id, obj) {
		if (!this._states[id])
			this._states[id] = {};
		for (var name in obj) {
			this._states[id][name] = obj[name];
		}
		console.log("setState",this._states);
		this.updateLocalStorage();
		
		this.executeCallbacks(id, this.events.STATE_CHANGE);
	},
	updateLocalStorage:function()
	{
		if(this.hasLocalStorage())
		localStorage.setItem(this._const.STATES, JSON.stringify(this._states));
	},
	getState : function(id, name) {
		if (!this._states[id] || this._states[id][name] == undefined)
			return null;
		return this._states[id][name];
	},
	addListener : function(id, eventName, callback) {
		if (!this._callbacks[id])
			this._callbacks[id] = [];
		if (!this._callbacks[id][eventName])
			this._callbacks[id][eventName] = [];
		this._callbacks[id][eventName].push(callback);

	},
	executeCallbacks : function(id, eventName) {
		if (!this._callbacks[id] || !this._callbacks[id][eventName])
			return;
		for (var a = 0; a < this._callbacks[id][eventName].length; a++) {
			this._callbacks[id][eventName][a](this._states[id]);
		}

	},
	hasLocalStorage : function() {
		return (window['localStorage'] !== null);
	}
}

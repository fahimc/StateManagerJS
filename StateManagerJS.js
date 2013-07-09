var StateManagerJS = {
	events : {
		STATE_CHANGE : "STATE_CHANGE"
	},
	_states : {},
	_callbacks : {},
	_const:
	{
		STATES:"states",
		CALLBACKS:"callbacks"
	},
	init:function()
	{
		
		if(this.hasLocalStorage())
		{
			if(localStorage[this._const.STATES])this._states = JSON.parse(localStorage[this._const.STATES]);
			// if(localStorage[this._const.CALLBACKS])this._callbacks = JSON.parse(localStorage[this._const.CALLBACKS]);
			
			
		}
	},
	setState : function(id, obj) {
		if (!this._states[id])
			this._states[id] = {};
		for (var name in obj) {
			this._states[id][name] = obj[name];
		}
		
		this.updateLocalStorage();
		
		this.executeCallbacks(id, this.events.STATE_CHANGE);
	},
	updateLocalStorage:function()
	{
		if(this.hasLocalStorage())
		{
			
		localStorage.setItem(this._const.STATES, JSON.stringify(this._states));
		// localStorage.setItem(this._const.CALLBACKS, JSON.stringify(this._callbacks));	
		}
	},
	getState : function(id, name) {
		if (!this._states[id] || this._states[id][name] == undefined)
			return null;
		return this._states[id][name];
	},
	addListener : function(id, eventName, callback) {
		if (!this._callbacks[id])
			this._callbacks[id] = {};
		if (!this._callbacks[id][eventName])
			this._callbacks[id][eventName] = [];
		this._callbacks[id][eventName].push(callback);
		
		this.updateLocalStorage();
	},
	executeCallbacks : function(id, eventName) {
		if (!this._callbacks[id] || !this._callbacks[id][eventName])
			return;
		for (var a = 0; a < this._callbacks[id][eventName].length; a++) {
			this._callbacks[id][eventName][a](this._states[id]);
		}

	},
	clear:function()
	{
		if(this.hasLocalStorage())
		localStorage.clear();
	},
	hasLocalStorage : function() {
		return (window['localStorage'] !== null);
	}
}

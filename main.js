(function(window) {
  function Main() {
    if(window.addEventListener) {
        window.addEventListener("load", onLoad);
    } else {
        window.attachEvent("onload", onLoad);
    }

}
  function onLoad() {
    // the body has loaded. 
    // start coding here!
    var states = {
    	visible:"hidden",
    	x:20,
    	y:100
    };
    StateManagerJS.init();
   // StateManagerJS.addListener("test",StateManagerJS.events.STATE_CHANGE,stateChange);
   StateManagerJS.setState("test",states);
    StateManagerJS.getState("test","visible");
  }
	function stateChange(obj)
	{
		console.log(obj)
	}
Main();
}
)(window);
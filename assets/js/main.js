var APPLICATION = null;

$(document).ready(function(){
    //initiate application
    APPLICATION = new App();
    APPLICATION.init();

    //Notice: we use to apply bindings to div-element, in this case we've added an ID
    //to the body. Because we want to load/unload styles in HTML-head...
    ko.applyBindings(APPLICATION, document.getElementById("topolis-game"));
});
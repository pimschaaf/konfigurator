function App(){
    var self = this;

    //controllers
    self.controllers = {
//        page: new Page()
    };

    //models for elements array
    self.elementModels = {
        view: new View()
    };

    //models for pages array
    self.pageModels = {
//        "initializing": new PageInitializing()
    };

    //singletons
//    self.loader = new Modal("#loading-modal");

    //this var is used to define which page is shown
    self.currentPage = ko.observable("initializing");

    //this function is called to initiate the model
    self.init = function(){

    };
}
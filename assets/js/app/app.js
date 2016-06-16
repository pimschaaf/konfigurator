function App(){
    var self = this;

    //elements
    self.$konfiguratorWrapper = $("#konfigurator-wrapper");

    //controllers
    self.controllers = {
//        page: new Page()
    };

    //models for elements array
    self.elementModels = {
//        view: new View()
    };

    //models for pages array
    self.pageModels = {
        "initializing": new PageInitializing(),
        "editor": new Editor()
    };

    //singletons
//    self.loader = new Modal("#loading-modal");

    //this var is used to define which page is shown
    self.currentPage = ko.observable("initializing");
    self.currentPageTitle = ko.observable("");

    //this function is called to initiate the model
    self.init = function(){
        //go to requested page, else login
        self.analyzeUrl();

        self.bindEvents();
    };

    self.bindEvents = function() {
        $("body").on("click", "a.page-link", function(event){
            self.changePage(null, event);
            return false;
        });

        //history back
        window.addEventListener('popstate', function(event){
            self.goBack(event);
        });
    };

    /*region ChangePage*/
    //this function is called when a user clicks on a link with changePage-click event bound in data-bind
    self.changePage = function(data, event){
        //get some vars
        var requestedPage = $(event.currentTarget).attr("href");

        if(requestedPage.indexOf("#") >= 0){
            requestedPage = requestedPage.replace("#","");
        }

        //call actual perform change page
        self.performChangePage(requestedPage);
    };

    //this function is called to perform switch pages between application
    self.performChangePage = function(requestedPage, event){
        //APPLICATION.isLoading(true);

        var previousPage = APPLICATION.currentPage();

        //only perform animated changepage, if pages are different
        if(requestedPage != previousPage){
            self.$konfiguratorWrapper.addClass("is-changing-page");
        }

        //delay for page-transition
        setTimeout(function(){
            //set current page
            APPLICATION.currentPage(requestedPage);

            //init current page
            try{
                APPLICATION.pageModels[requestedPage].init();
            }catch(error){

            }

            //update title
            APPLICATION.updatePageTitle(requestedPage);

            //remove active class, only perform animated changepage, if pages are different
            if(requestedPage != previousPage){
                self.$konfiguratorWrapper.removeClass("is-changing-page");
            }
        }, 500, requestedPage, previousPage);
    };
    /*endregion ChangePage*/

    /*region UrlLogic*/
    /*region UpdatePageUrl*/
    //this function is called to update URL based on page views (fakers)
    self.windowLocation = ko.computed(function(){
        //add requested page to url
        var pageUrl = CONFIG.BASE_URL;

        //check if page model contains additional url logic
        try{
            if(APPLICATION.pageModels[self.currentPage()].windowLocation()){
                pageUrl += APPLICATION.pageModels[self.currentPage()].windowLocation();
            }else{
                pageUrl += self.currentPage();
            }
        }catch(error){
            pageUrl += self.currentPage();
        }

        return pageUrl;
    }, self);

    self.windowLocation.subscribe(function(newValue){
        //if browser supports, continue
        if(history && history.pushState) {
            //push url to adress bar
            history.pushState({}, '', newValue);
        }
    });
    /*endregion UpdatePageUrl*/

    //this function is called to update pageTitle
    self.updatePageTitle = function(requestedPage){
        self.currentPageTitle(self.pageModels[requestedPage].pageTitle);
        document.title = self.currentPageTitle() + " | Konfigurator";
    };

    //this function is called when url is changed, using back-button
    self.goBack = function(event){
        self.analyzeUrl();
    };

    //this function is called to analyze existing URL
    self.analyzeUrl = function(){
        //default page
        var pageToOpen = CONFIG.HOME_PAGE;

        //split url in keys
        try{
            var url = location.pathname;

            //replace base_url && base_url + "/"
            url = url.replace(CONFIG.BASE_URL + "/", "");
            url = url.replace(CONFIG.BASE_URL, "");

            //split in keys
            var urlArray = url.split("/");

            //get first key as page to open
            if(urlArray.length > 0 && urlArray[0] != ""){
                pageToOpen = urlArray[0];
            }
        }catch(error){

        }

        self.performChangePage(pageToOpen);
    };
    /*endregion UrlLogic*/
}
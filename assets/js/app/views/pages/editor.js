function Editor(){
    var self = this;

    self.pageTitle = "Editor";

    //example content
    self.firstName = ko.observable('Pim');
    self.lastName = ko.observable('Schaaf');

    self.fullName = ko.computed(function(){
        return self.firstName() + " " + self.lastName();
    });
}
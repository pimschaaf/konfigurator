function View(){
    var self = this;

    self.firstName = ko.observable('Pim');
    self.lastName = ko.observable('Schaaf');

    self.fullName = ko.computed(function(){
        return self.firstName() + " " + self.lastName();
    });
}
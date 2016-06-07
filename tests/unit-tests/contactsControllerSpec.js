describe("Contacts", function(){
  var deferResponse,
      controller,
      contactsFactoryMock;

  beforeEach(module('cwapp'));

  beforeEach(inject(function($controller, $q){
    deferResponse = $q.defer();
    contactsFactoryMock = {
       then: jasmine.createSpy('then spy').and.returnValue(deferResponse.promise)
    };

    controller = $controller('Contacts', {'Contacts': contactsFactoryMock});
  }));

  it('requests from the factory', function(){
    console.log(contactsFactoryMock.then);
    expect(contactsFactoryMock.then).toHaveBeenCalled();
  });
});

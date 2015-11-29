describe('tabs', function() {
  var elm, $rootScope, $compile;

  // load the tabs code
  beforeEach(module('tabs'));

  // load the templates
  beforeEach(module('app/tpl/tabs.html', 'app/tpl/pane.html'));

  beforeEach(inject(function(_$rootScope_, _$compile_) {
    // we might move this tpl into an html file as well...
    elm = angular.element(
      '<div>' +
        '<tabs>' +
          '<pane title="First Tab">' +
            'first content is {{first}}' +
          '</pane>' +
          '<pane title="Second Tab">' +
            'second content is {{second}}' +
          '</pane>' +
        '</tabs>' +
      '</div>');

    $rootScope = _$rootScope_;
    $compile = _$compile_;

    $compile(elm)($rootScope);
    $rootScope.$digest();
  }));


  it('should create clickable titles', function() {
    var titles = elm.find('ul.nav-tabs li a');

    expect(titles.length).toBe(2);
    expect(titles.eq(0).text()).toBe('First Tab');
    expect(titles.eq(1).text()).toBe('Second Tab');
  });


  it('should bind the content', function() {
    var contents = elm.find('div.tab-content div.tab-pane');

    expect(contents.length).toBe(2);
    expect(contents.eq(0).text()).toBe('first content is ');
    expect(contents.eq(1).text()).toBe('second content is ');

    $rootScope.$apply(function() {
      $rootScope.first = 123;
      $rootScope.second = 456;
    });

    expect(contents.eq(0).text()).toBe('first content is 123');
    expect(contents.eq(1).text()).toBe('second content is 456');
  });


  it('should set active class on title', function() {
    var titles = elm.find('ul.nav-tabs li');

    expect(titles.eq(0)).toHaveClass('active');
    expect(titles.eq(1)).not.toHaveClass('active');
  });


  it('should set active class on content', function() {
    var contents = elm.find('div.tab-content div.tab-pane');

    expect(contents.eq(0)).toHaveClass('active');
    expect(contents.eq(1)).not.toHaveClass('active');
  });


  it('should change active pane when title clicked', function() {
    var titles = elm.find('ul.nav-tabs li');
    var contents = elm.find('div.tab-content div.tab-pane');

    // click the second tab
    titles.eq(1).find('a').click();

    // second title should be active
    expect(titles.eq(0)).not.toHaveClass('active');
    expect(titles.eq(1)).toHaveClass('active');

    // second content should be active
    expect(contents.eq(0)).not.toHaveClass('active');
    expect(contents.eq(1)).toHaveClass('active');
  });
});


describe('tabs controller', function() {
  var $rootScope, ctrl;

  beforeEach(inject(function(_$controller_, _$rootScope_) {
    $rootScope = _$rootScope_;

    // instantiate the controller stand-alone, without the directive
    ctrl = _$controller_(TabsController, {$scope: $rootScope, $element: null});
  }));


  describe('select', function() {

    it('should mark given pane selected', function() {
      var pane = {};

      $rootScope.select(pane);
      expect(pane.selected).toBe(true);
    });


    it('should deselect other panes', function() {
      var pane1 = {}, pane2 = {}, pane3 = {};

      ctrl.addPane(pane1);
      ctrl.addPane(pane2);
      ctrl.addPane(pane3);

      $rootScope.select(pane1);
      expect(pane1.selected).toBe(true);
      expect(pane2.selected).toBe(false);
      expect(pane3.selected).toBe(false);

      $rootScope.select(pane2);
      expect(pane1.selected).toBe(false);
      expect(pane2.selected).toBe(true);
      expect(pane3.selected).toBe(false);

      $rootScope.select(pane3);
      expect(pane1.selected).toBe(false);
      expect(pane2.selected).toBe(false);
      expect(pane3.selected).toBe(true);
    });
  });


  describe('addPane', function() {

    it('should append pane', function() {
      var pane1 = {}, pane2 = {};

      expect($rootScope.panes).toEqual([]);

      ctrl.addPane(pane1);
      expect($rootScope.panes).toEqual([pane1]);

      ctrl.addPane(pane2);
      expect($rootScope.panes).toEqual([pane1, pane2]);
    });


    it('should select the first one', function() {
      var pane1 = {}, pane2 = {};

      ctrl.addPane(pane1);
      expect(pane1.selected).toBe(true);

      ctrl.addPane(pane2);
      expect(pane1.selected).toBe(true);
    });
  });
});
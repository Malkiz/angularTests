describe('transclude directive', function() {
    var $compile,
        $rootScope;
    // Load the myApp module, which contains the directive
    beforeEach(module('app'));
    // Store references to $rootScope and $compile
    // so they are available to all tests in this describe block
    beforeEach(inject(function(_$compile_, _$rootScope_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('Replaces the element with the appropriate content', function() {
        // Compile a piece of HTML containing the directive
        var node = $compile('<pane title="my title">my text</pane>')($rootScope);
        $rootScope.$digest();
        var contents = node.contents();
        var innerContents = contents[0].childNodes;
        var transcludeContents = innerContents[1].childNodes;
        // Check that the compiled element contains the templated content
        expect(node[0].nodeType).toEqual(Node.ELEMENT_NODE);
        expect(contents[0].nodeType).toEqual(Node.ELEMENT_NODE);
        expect(contents[0].tagName).toEqual("DIV");
        expect(innerContents[0].nodeType).toEqual(Node.ELEMENT_NODE);
        expect(innerContents[0].tagName).toEqual("DIV");
        expect(innerContents[0].innerHTML).toEqual("my title");
        expect(innerContents[1].nodeType).toEqual(Node.ELEMENT_NODE);
        expect(innerContents[1].tagName).toEqual("NG-TRANSCLUDE");
        expect(transcludeContents[0].nodeType).toEqual(Node.ELEMENT_NODE);
        expect(transcludeContents[0].tagName).toEqual("SPAN");
        expect(transcludeContents[0].innerHTML).toEqual("my text");
    });
});
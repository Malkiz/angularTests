myModule.directive('pane', function() {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            title: '@'
        },
        template: '<div style="border: 1px solid black;">' + 
        			'<div style="background-color: gray">{{title}}</div>' + 
        			'<ng-transclude></ng-transclude>' + 
        		'</div>'
    };
});
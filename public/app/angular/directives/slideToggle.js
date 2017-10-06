/* app.directive('slideable', function () {
    return {
        restrict:'C',
        compile: function (element, attr) {
            // wrap tag
            var contents = element.html();
            element.html('<div class="slideable_content" style="margin:0 !important; padding:0 !important" >' + contents + '</div>');

            return function postLink(scope, element, attrs) {
                // default properties
                attrs.duration = (!attrs.duration) ? '0.2s' : attrs.duration;
                attrs.easing = (!attrs.easing) ? 'ease-in-out' : attrs.easing;
                element.css({
                    'overflow': 'hidden',
                    'height': '0px',
                    'transitionProperty': 'height',
                    'transitionDuration': attrs.duration,
                    'transitionTimingFunction': attrs.easing
                });
            };
        }
    };
}) */
/* .directive('slideToggle',['$document', function($document) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var target = document.querySelector(attrs.slideToggle);
            attrs.expanded = false;
            element.bind('click', function() {
                var content = target.querySelector('.slideable_content');
                if(!attrs.expanded) {
                    content.style.border = '1px solid rgba(0,0,0,0)';
                    var y = content.clientHeight;
                    content.style.border = 0;
                    target.style.height = y + 'px';
                } else {
                    target.style.height = '0px';
                }
                attrs.expanded = !attrs.expanded;
            });

            $document.bind('click', function(event){
                var isClickedElementChildOfPopup = element
                .find(event.target)
                .length > 0;
                
                if(!isClickedElementChildOfPopup){
                    target.style.height = '0px';
                    attrs.expanded = false;
                }
                  
              });
        }
    }
}]) */

app.directive('slideToggle', function() {  
    return {
      restrict: 'A',      
      scope:{
        isOpen: "=slideToggle" // 'data-slide-toggle' in our html
      },  
      link: function(scope, element, attr) {
        var slideDuration = parseInt(attr.slideToggleDuration, 10) || 200;      
        
        // Watch for when the value bound to isOpen changes
        // When it changes trigger a slideToggle
        scope.$watch('isOpen', function(newIsOpenVal, oldIsOpenVal){
          if(newIsOpenVal !== oldIsOpenVal){ 
            element.stop().slideToggle(slideDuration);
          }
        });
        
      }
    };  
  });
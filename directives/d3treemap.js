(function() {
   'use strict';

   angular.module('datavizApp.directives', ['d3'])
      .directive('d3Treemap', ['d3', '$timeout', function(d3, $timeout) {
         return {
            restrict: 'EA',
            scope: {
               data: '=',
               onClick: '&'
            },
            link: function(scope, el, attrs) {

               var div = d3.select(el[0]).append('div')
                                         .style("position", "relative");
               var treemap = d3.layout.treemap()
                                          .size([940, 600])
                                          .sticky(false)
                                          .sort(null)
                                          .value(function(d) { return d["Weight"] || 0; });

               var color = d3.scale.category20c();


               scope.render = function(data) {
                  // render treemap cells  
                  if (!data) {
                     return;
                  }
                  // we need a copy because d3 will manipulate the data
                  var data = angular.copy(data);

                  var node = div.data([data]).selectAll('.node').data(treemap.nodes);

                  // the new nodes
                  node.enter().append('div')
                     .attr('class', 'node')
                     .on('click', function(d) {
                     return scope.onClick({ item: d });
                     });

                  // nodes to remove
                  node.exit().remove();

                  // the updating nodes
                  node
                     .style("background", function(d) { return d.children ? color(d.name) : null; })
                     .text(function(d) { return d.children ? null : d.name; })
                     .transition().duration(150)
                     .call(position)


                  function position() {
                     this.style("left", function(d) { return d.x + "px"; })
                        .style("top", function(d) { return d.y + "px"; })
                        .style("width", function(d) { return Math.max(0, d.dx - 1) + "px"; })
                        .style("height", function(d) { return Math.max(0, d.dy - 1) + "px"; });
                  }

               };

              
               var dataTimeout,
                   tempVals;
               // watch for data changes and re-render
               scope.$watch('data', function(newVals, oldVals) {
                  // using a timeout in order to prevent too many render-calls e.g. when slider dragged
                  if (dataTimeout) { $timeout.cancel(dataTimeout); }
                  tempVals = newVals;

                  dataTimeout = $timeout(function() {
                     scope.render(tempVals);
                  }, 150);
               }, true);
            }
         };
      }]);

}());
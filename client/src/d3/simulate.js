var d3 = require('d3');

var render = function() {
  var h = window.innerHeight;
  var w = window.innerWidth;
  var randomX = function() { return Math.random () * w; };
  var randomY = function() { return Math.random () * h; };

  var container = d3
    .select('body')
    .append('svg')
    .attr('width', w)
    .attr('height', h);

  var particleRadius = 3;

  var particle = container
    .selectAll('.particle')
    .data(d3.range(30))
    .enter()
    .append('circle')
    .attr('class', 'particle')
    .attr('cx', randomX)
    .attr('cy', randomY)
    .attr('r', particleRadius);

  var robotRadius = 20;
  var robot = container
    .selectAll('.robot')
    .data(d3.range(1))
    .enter()
    .append('circle')
    .attr('class', 'robot')
    .attr('cx', w/2)
    .attr('cy', h/2)
    .attr('r', robotRadius)
    .attr('fill', 'blue');
};

render();
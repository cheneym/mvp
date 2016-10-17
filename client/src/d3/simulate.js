var d3 = require('d3');

var render = function(data) {
  var h = window.innerHeight;
  var w = window.innerWidth;
  var randomX = function() { return Math.random () * w; };
  var randomY = function() { return Math.random () * h; };

  var container = d3
    .select('body')
    .append('svg')
    .attr('width', w)
    .attr('height', h);

  var robotRadius = 20;
  var particleRadius = 2;

  var robot = container
    .selectAll('.robot')
    .data(d3.range(1))
    .enter()
    .append('circle')
    .attr('class', 'robot')
    .attr('cx', w/8)
    .attr('cy', h/2)
    .attr('r', robotRadius)
    .attr('fill', 'blue');

  var particle = container
    .selectAll('.particle')
    .data(data)
    .enter()
    .append('circle')
    .attr('class', 'particle')
    .attr('cx', +robot.attr('cx'))
    .attr('cy', +robot.attr('cy'))
    .attr('r', particleRadius);

  container.transition()
      .duration(4000)
      .selectAll('.robot')
      .attr('cx', 3 / 4 * w)
      .attr('cy', h/2);

  transition = container.transition().duration(750);
  var delay = (d, i) => i * 50;
  console.log(typeof robot.attr('cx'));
  transition.selectAll(".particle")
      .delay(delay)
      .attr('cx', +robot.attr('cx'))
      .attr('cy', d => +robot.attr('cy') + d.distance);
};

d3.json('http://localhost:8000/data', render);
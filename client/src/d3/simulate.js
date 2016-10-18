var d3 = require('d3');

var render = function(data) {
  var h = window.innerHeight;
  var w = window.innerWidth;

  var container = d3
    .select('body')
    .append('svg')
    .attr('width', w)
    .attr('height', h);

  var robotRadius = 20;
  var particleRadius = 2;
  var initialPos = data[0].position;
  var finalPos = data[data.length - 1].position;
  var totalTime = 50 * data.length

  var robot = container
    .selectAll('.robot')
    .data(d3.range(1))
    .enter()
    .append('circle')
    .attr('class', 'robot')
    .attr('cx', initialPos)
    .attr('cy', h/2)
    .attr('r', robotRadius)
    .attr('fill', 'blue');

  var robotMove = (element, index) => {
    element.transition().duration(50).ease(d3.easeLinear)
      .attr('cx', data[index].position)
      .on('end', () => {
        robotMove(d3.select('.robot'), index + 1);
      });
  }
  robotMove(d3.select('.robot'), 0);
  // var particle = container
  //   .selectAll('.particle')
  //   .data(data)
  //   .enter()
  //   .append('circle')
  //   .attr('class', 'particle')
  //   .attr('cx', d => d.position)
  //   .attr('cy', +robot.attr('cy'))
  //   .attr('r', particleRadius);

  // container.transition()
  //     .duration(totalTime)
  //     .ease(d3.easeLinear)
  //     .selectAll('.robot')
  //     .attr('cx', finalPos)
  //     .attr('cy', h/2);

  // transition = container.transition().duration(100);
  // var delay = (d, i) => i * 50;
  // console.log(typeof robot.attr('cx'));
  // transition.selectAll(".particle")
  //     .delay(delay)
  //     .attr('cx', d => d.position)
  //     .attr('cy', d => +robot.attr('cy') + d.distance);

  // var positionData = randomPositions(n);

  //   var circles = svgContainer.selectAll('.enemy')
  //                             .data(positionData);
  //   var nodes = circles.data();
  //   circles.transition().duration(timeDelay).attr('cx', function(d) { return d.x; })
  //          .attr('cy', function(d) { return d.y; });
  //   circles.enter()
  //          .append('circle')
  //          .attr('class', 'enemy')
  //          .attr('cx', function(d) { return d.x; })
  //          .attr('cy', function(d) { return d.y; })
  //          .attr('r', function(d) { return r; });
  //   circles.exit().remove();
};

d3.json('http://localhost:8000/data', render);
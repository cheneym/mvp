var d3 = require('d3');

var rotateLeft = (position) => {
  var obj = {
    'Front': 'Right',
    'Right': 'Back',
    'Back': 'Left',
    'Left': 'Front'
  };
  return obj[position];
}

var rotateRight = (position) => {
  var obj = {
    'Front': 'Left',
    'Right': 'Front',
    'Back': 'Right',
    'Left': 'Back'
  };
  return obj[position];
}

var reverse = (position) => {
  var obj = {
    'Front': 'Back',
    'Back': 'Front',
    'Left': 'Right',
    'Right': 'Left'
  };
  return obj[position];
}

var resolveXPosition = (config, robotXPos, radius) => {
  if (config.s1position === 'Left') {
    return robotXPos - radius;
  } else if (config.s1position === 'Right') {
    return robotXPos + radius;
  } else {
    return robotXPos;
  }
};

var resolveYPosition = (config, robotYPos, radius) => {
  if (config.s1position === 'Front') {
    return robotYPos - radius;
  } else if (config.s1position === 'Back') {
    return robotYPos + radius;
  } else {
    return robotYPos;
  }
};

var convertDirection = (config) => {
  var tempConfig = {};
  if (config.s1orientation === null) {
    tempConfig.s1orientation = 'Forward';
  } else {
    tempConfig.s1orientation = config.s1orientation;
  }
  if (tempConfig.s1orientation === 'Forward') {
    tempConfig.s1position = config.s1position;
  } else if (tempConfig.s1orientation === 'Backward') {
    tempConfig.s1position = reverse(config.s1position);
  } else if (tempConfig.s1orientation === 'Left') {
    tempConfig.s1position = rotateRight(config.s1position);
  } else {
    tempConfig.s1position = rotateLeft(config.s1position);
  }
  return tempConfig;
};


var render = (config, data) => {
  var h = window.innerHeight;
  var w = window.innerWidth;

  var container = d3
    .select('body')
    .append('svg')
    .attr('width', w)
    .attr('height', h);

  var robotRadius = 20;
  var particleRadius = 2;
  var initialXPos = data[0].xposition;
  var initialYPos = data[0].yposition;
  var finalPos = data[data.length - 1].position;
  var totalTime = 50 * data.length
  var robot = container
    .selectAll('.robot')
    .data(d3.range(1))
    .enter()
    .append('circle')
    .attr('class', 'robot')
    .attr('cx', initialXPos)
    .attr('cy', initialYPos)
    .attr('r', robotRadius)
    .attr('fill', 'blue');

  var robotMove = (element, index) => {
    if (index >= data.length) { return; }
    element.transition().duration(50).ease(d3.easeLinear)
      .attr('cx', data[index].xposition)
      .attr('cy', data[index].yposition)
      .on('end', () => {
        robotMove(d3.select('.robot'), index + 1);
      });
  }

  robotMove(d3.select('.robot'), 0);

  var tempConfig = convertDirection(config);
  var particleMove = (elements, index) => {
    var startX = resolveXPosition(config, +robot.attr('cx'), particleRadius * 10);
    var startY = resolveYPosition(config, +robot.attr('cy'), particleRadius * 10);
    var dx = startX - +robot.attr('cx');
    var dy = startY - +robot.attr('cy');
    elements.data(data.slice(0, index + 1))
      .enter()
      .append('circle')
      .attr('class', 'particle')
      .attr('cx', startX)
      .attr('cy', startY)
      .attr('r', particleRadius)
      .transition().duration(50).ease(d3.easeLinear)
      .attr('cx', d => dx + resolveXPosition(tempConfig, +robot.attr('cx'), d.distance))
      .attr('cy', d => dy + resolveYPosition(tempConfig, +robot.attr('cy'), d.distance))
      .on('end', () => particleMove(container.selectAll('.particle'), index + 1));
  }

  particleMove(container.selectAll('.particle'), 0);
};

d3.json('http://localhost:8000/configs', function(config) {
  d3.json('http://localhost:8000/data', render.bind(null, config));
});

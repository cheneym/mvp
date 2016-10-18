var d3 = require('d3');

var rotateLeft = (position) => {
  var obj = {
    'Front': 'Right',
    'Right': 'Back',
    'Back': 'Left',
    'Left': 'Front'
  };
  return obj[position];
};

var rotateRight = (position) => {
  var obj = {
    'Front': 'Left',
    'Right': 'Front',
    'Back': 'Right',
    'Left': 'Back'
  };
  return obj[position];
};

var reverse = (position) => {
  var obj = {
    'Front': 'Back',
    'Back': 'Front',
    'Left': 'Right',
    'Right': 'Left'
  };
  return obj[position];
};

var convertDirection = (orientation, position) => {
  var fireDirection = position;
  if (orientation === null) {
    orientation = 'Forward';
  }
  if (orientation === 'Forward') {
    fireDirection = position;
  } else if (orientation === 'Backward') {
    fireDirection = reverse(position);
  } else if (orientation === 'Left') {
    fireDirection = rotateRight(position);
  } else {
    fireDirection = rotateLeft(position);
  }
  return fireDirection;
};

var resolveXPosition = (position, robotXPos, radius) => {
  if (position === 'Left') {
    return robotXPos - radius;
  } else if (position === 'Right') {
    return robotXPos + radius;
  } else {
    return robotXPos;
  }
};

var resolveYPosition = (position, robotYPos, radius) => {
  if (position === 'Front') {
    return robotYPos - radius;
  } else if (position === 'Back') {
    return robotYPos + radius;
  } else {
    return robotYPos;
  }
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


  var particleMove = (className, index, sensorNum) => {
    var elements = container.selectAll('.' + className);

    var sensorPosition = config['s' + sensorNum + 'position'];
    var sensorOrientation  = config['s' + sensorNum + 'orientation'];
    var fireDirection = convertDirection(sensorOrientation, sensorPosition);
  
    var startX = resolveXPosition(sensorPosition, +robot.attr('cx'), particleRadius * 10);
    var startY = resolveYPosition(sensorPosition, +robot.attr('cy'), particleRadius * 10);
    var dx = startX - +robot.attr('cx');
    var dy = startY - +robot.attr('cy');
    elements.data(data.slice(0, index + 1))
      .enter()
      .append('circle')
      .attr('class', className)
      .attr('cx', startX)
      .attr('cy', startY)
      .attr('r', particleRadius)
      .transition().duration(50).ease(d3.easeLinear)
      .attr('cx', d => dx + resolveXPosition(fireDirection, +robot.attr('cx'), d['distance' + sensorNum]))
      .attr('cy', d => dy + resolveYPosition(fireDirection, +robot.attr('cy'), d['distance' + sensorNum]))
      .on('end', () => particleMove(className, index + 1, sensorNum));
  }

  var class1 = 'particle1';
  var class2 = 'particle2';
  var class3 = 'particle3';
  particleMove(class1, 0, 1);
  particleMove(class2, 0, 2);
  particleMove(class3, 0, 3);
};

d3.json('http://localhost:8000/configs', function(config) {
  d3.json('http://localhost:8000/data', render.bind(null, config));
});
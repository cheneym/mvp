var React = require('react');
var SpecForm = require('./SpecForm.jsx');


var FormRow = (props) => (
  <div className="col s12">
    <div className="row">
      <div className="col s4">
        <h3>{props.heading}</h3>
      </div>
      <div className="col s4">
        <SpecForm forms={{
          heading: 'Position on Robot',
          li1: 'Left',
          li2: 'Right',
          li3: 'Front',
          li4: 'Back',
          group: props.group,
          id: props.group + 'col1'
        }} clickHandler={props.clickHandlers[0]}/>
      </div>
      <div className="col s4">
        <SpecForm forms={{
          heading: 'Orientation',
          li1: 'Forward',
          li2: 'Backward',
          li3: 'Left',
          li4: 'Right',
          group: props.group,
          id: props.group + 'col2'
        }} clickHandler={props.clickHandlers[1]}/>
      </div>
    </div>
  </div>
)

module.exports = FormRow


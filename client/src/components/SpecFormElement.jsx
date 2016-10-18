var React = require('react');

var SpecFormElement = (props) => (
  <p>
    <input onClick={props.clickHandler} name={props.group} type="radio" id={props.id}/>
    <label htmlFor={props.id}>{props.label}</label>
  </p>
);

module.exports = SpecFormElement;
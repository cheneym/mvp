var React = require('react');
var SpecFormElement = require('./SpecFormElement.jsx');

var SpecForm = (props) => (
  <form action="#">
    <p>{props.forms.heading}</p>
    <SpecFormElement group={props.forms.group}
      id={props.forms.id + '1'} 
      label={props.forms.li1}
      clickHandler={props.clickHandler}/>
    <SpecFormElement group={props.forms.group} 
      id={props.forms.id + '2'}
      label={props.forms.li2}
      clickHandler={props.clickHandler}/>
    <SpecFormElement group={props.forms.group}
      id={props.forms.id + '3'}
      label={props.forms.li3}
      clickHandler={props.clickHandler}/>
    <SpecFormElement group={props.forms.group} 
      id={props.forms.id + '4'}
      label={props.forms.li4}
      clickHandler={props.clickHandler}/>
  </form>
);

module.exports = SpecForm;
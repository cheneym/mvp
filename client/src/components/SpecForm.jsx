var React = require('react');

var SpecForm = (props) => (
  <form action="#">
    <p>{props.forms[0].heading}</p>
    <p>
      <input name={props.forms[0].group} type="radio" id={props.forms[0].id + '1'} />
      <label htmlFor={props.forms[0].id + '1'}>{props.forms[0].li1}</label>
    </p>
    <p>
      <input name={props.forms[0].group} type="radio" id={props.forms[0].id + '2'} />
      <label htmlFor={props.forms[0].id + '2'}>{props.forms[0].li2}</label>
    </p>
    <p>
      <input name={props.forms[0].group} type="radio" id={props.forms[0].id + '3'}  />
      <label htmlFor={props.forms[0].id + '3'}>{props.forms[0].li3}</label>
    </p>
      <p>
        <input name={props.forms[0].group} type="radio" id={props.forms[0].id + '4'} />
        <label htmlFor={props.forms[0].id + '4'}>{props.forms[0].li4}</label>
    </p>
  </form>
);

module.exports = SpecForm;
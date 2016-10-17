var React = require('react');

var SpecForm = (props) => (
  <form className="specform col s12">
    <div className="row">
      <div className="input-field col s4">
        <input placeholder="a" id="timecol" type="text" className="validate"/>
      </div>
      <div className="input-field col s4">
        <input placeholder="b" id="sensorcol" type="text" className="validate"/>
      </div>
      <div className="input-field col s4">
        <input placeholder="c" id="positioncol" type="text" className="validate"/>
      </div>
    </div>
  </form>
);

module.exports = SpecForm;
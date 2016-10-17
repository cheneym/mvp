var React = require('react');
var Nav = require('./Nav.jsx');
var SpecForm = require('./SpecForm.jsx');

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <Nav />
        <SpecForm />
      </div>
    )
  }
}

module.exports = App;
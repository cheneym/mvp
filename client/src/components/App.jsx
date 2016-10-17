var React = require('react');
var Nav = require('./Nav.jsx');

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <Nav />
        <h1>Yolo World</h1>
      </div>
    )
  }
}

module.exports = App;
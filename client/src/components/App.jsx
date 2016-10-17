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

        <div className="col s12">
          <div className="row">
            <div className="col s4">
              <h3>Sensor 1</h3>
            </div>
            <div className="col s4">
              <SpecForm forms={[{
                heading: 'Position on Robot',
                li1: 'Left',
                li2: 'Right',
                li3: 'Front',
                li4: 'Back',
                group: 'group1',
                id: 'col1'
              }]}/>
            </div>
            <div className="col s4">
              <SpecForm forms={[{
                heading: 'Orientation',
                li1: 'Forward',
                li2: 'Backward',
                li3: 'Left',
                li4: 'Right',
                group: 'group2',
                id: 'col2'
              }]}/>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

module.exports = App;
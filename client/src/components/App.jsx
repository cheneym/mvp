var React = require('react');
var Nav = require('./Nav.jsx');
var SpecForm = require('./SpecForm.jsx');
var $ = require('jQuery');
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      s1position: null,
      s1orientation :null
    }
  }

  col1ClickHandler(e) {
    var group = e.target.getAttribute('name');
    var position = e.target.nextSibling.textContent;
    if (group === 'group1') {
      this.setState({
        s1position: position
      });
    }
  }

  col2ClickHandler(e) {
    var group = e.target.getAttribute('name');
    var orientation = e.target.nextSibling.textContent;
    if (group === 'group1') {
      this.setState({
        s1orientation: orientation
      });
    }
  }

  simHandler(e) {
    $.ajax({
      type: 'POST',
      url: 'http://localhost:8000/configs',
      data: JSON.stringify(this.state),
      contentType: 'application/json'
    })
    .done(function(data) {
      console.log('successfully posted data');
    })
    .fail(function(jqXhr) {
      console.log('failed to post data');
    });
  }

  render() {
    return (
      <div className="container">
        <Nav simHandler={this.simHandler.bind(this)} />
        <div className="col s12">
          <div className="row">
            <div className="col s4">
              <h3>Sensor 1</h3>
            </div>
            <div className="col s4">
              <SpecForm forms={{
                heading: 'Position on Robot',
                li1: 'Left',
                li2: 'Right',
                li3: 'Front',
                li4: 'Back',
                group: 'group1',
                id: 'col1'
              }} clickHandler={this.col1ClickHandler.bind(this)}/>
            </div>
            <div className="col s4">
              <SpecForm forms={{
                heading: 'Orientation',
                li1: 'Forward',
                li2: 'Backward',
                li3: 'Left',
                li4: 'Right',
                group: 'group1',
                id: 'col2'
              }} clickHandler={this.col2ClickHandler.bind(this)}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = App;
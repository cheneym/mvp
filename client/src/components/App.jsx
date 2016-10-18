var React = require('react');
var Nav = require('./Nav.jsx');
var FormRow = require('./FormRow.jsx');
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
    var index = group[group.length - 1];
    var newState = {};
    newState['s' + index + 'position'] = position;
    this.setState(newState);
  }

  col2ClickHandler(e) {
    var group = e.target.getAttribute('name');
    var orientation = e.target.nextSibling.textContent;
    var index = group[group.length - 1];
    var newState = {};
    newState['s' + index + 'orientation'] = orientation;
    this.setState(newState);
  }

  fileUploadHandler(e) {
    console.log(e.target.files[0]);
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onloadend = function(e) {
      if (e.target.readyState == FileReader.DONE) { // DONE == 2
        var textContent = e.target.result;
        $.ajax({
          type: 'POST',
          url: 'http://localhost:8000/data',
          data: textContent,
          contentType: 'application/json'
        })
        .done(function(data) {
          console.log('successfully posted data');
        })
        .fail(function(jqXhr) {
          console.log('failed to post data');
        });
      }
    }
    reader.readAsText(file);
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
        
        <form action="#">
          <div className="file-field input-field">
            <div className="btn">
              <span>File</span>
              <input onChange={this.fileUploadHandler} type="file"></input>
            </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" type="text"></input>
            </div>
          </div>
        </form>

        <FormRow group={'group1'} 
          heading={'Sensor 1'}
          clickHandlers={[
            this.col1ClickHandler.bind(this), 
            this.col2ClickHandler.bind(this)
          ]}
        />
        <FormRow group={'group2'} 
          heading={'Sensor 2'}
          clickHandlers={[
            this.col1ClickHandler.bind(this), 
            this.col2ClickHandler.bind(this)
          ]}
        />
        <FormRow group={'group3'} 
          heading={'Sensor 3'}
          clickHandlers={[
            this.col1ClickHandler.bind(this), 
            this.col2ClickHandler.bind(this)
          ]}
        />        
      </div>
    )
  }
}

module.exports = App;
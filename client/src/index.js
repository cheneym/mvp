var React = require('react');
var ReactDOM = require('react-dom');
var App = require('./components/App.jsx');

$(document).ready(function() {
  ReactDOM.render(
    <App />,
    document.getElementById('content')
  );  
})
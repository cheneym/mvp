var React = require('react');

var Nav = (props) => (
  <nav className="navbar">
    <div className="col s12">
      <ul>
        <li><a href='/simulate' className='simulate'>Simulate</a></li>
        <li><a href='/history' className='history'>Show Full Path</a></li>
        <li><a href='/clear'>Clear History</a></li>
      </ul>
    </div>
  </nav>
);

module.exports = Nav;
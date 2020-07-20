import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
    // Fix all this, currently its a mockup place holder
    return (
        <nav className="green">
        <div className="nav-wrapper" style={{paddingLeft: '10px'}}>
          <a href="#" className="brand-logo">DiscXchange</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><a href="#">Search</a></li>
            <li><a href="#">Marketplace</a></li>
            <li><a href="#">Browse Bags</a></li>
          </ul>
        </div>
      </nav>
        );
}

Navbar.defaultProps = {
    title:'Disc Bag Dev',
};

export default Navbar
import React from 'react';
import { Link } from 'react-router-dom';

function NavbarItem({ render, ...props }) {
  if (render) {
    return (
      <li className='nav-item'>
        <Link onClick={props.onClick} className='nav-link' to={props.href}>
          {props.label}
        </Link>
      </li>
    );
  } else {
    return null;
  }
}

export default NavbarItem;

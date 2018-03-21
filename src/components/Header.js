import React from 'react';
import { Link, NavLink } from 'react-router-dom';


const Header = () => (
        <header>
            <h1>Expensify</h1>
            <div>
                <nav>
                <li><NavLink to="/" activeClassName="is-active" exact={true}>Home</NavLink></li>
                <li><NavLink to="/create" activeClassName="is-active">Add Expense</NavLink></li>
                <li><NavLink to="/help" activeClassName="is-active">Help</NavLink></li>
                </nav>
            </div>
        </header>
)

export default Header;
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

export const Header = ({ startLogout }) => (
        <header>
            <h1>Expensify</h1>
            <div>
                <nav>
                <li><NavLink to="/dashboard" activeClassName="is-active" exact={true}>Home</NavLink></li>
                <li><NavLink to="/create" activeClassName="is-active">Add Expense</NavLink></li>
                <li><button onClick={startLogout}>Logout</button></li>
                </nav>
            </div>
        </header>
);

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);
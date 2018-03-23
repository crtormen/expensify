import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

const ExpenseListItem = ({ id, description, amount, createdAt }) => ( //Destructuring out of the props
    <div className="list-item">
        <h3><Link to={`/edit/${id}`}>{description}</Link></h3> 
        <p>Amount: {numeral(amount/100).format('$0,0.00')} - Date: {moment(createdAt).format('DD/MM/YY')}</p>
    </div>
);


export default ExpenseListItem; //With no mapping to state, connect still provides access to dispatch
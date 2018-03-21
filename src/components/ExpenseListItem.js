import React from 'react';
import { Link } from 'react-router-dom';

const ExpenseListItem = ({ id, description, amount, createdAt }) => ( //Destructuring out of the props
    <div className="list-item">
        <h3><Link to={`/edit/${id}`}>{description}</Link></h3> 
        <p>Amount: {amount}, Date: {createdAt}</p>
    </div>
);


export default ExpenseListItem; //With no mapping to state, connect still provides access to dispatch
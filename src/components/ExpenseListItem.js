import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

const ExpenseListItem = ({ id, description, amount, createdAt }) => ( //Destructuring out of the props
        <Link className="list-item" to={`/edit/${id}`}>
            <div>
                <h3 className="list-item__title">{description}</h3>
                <span className="list-item__subtitle">{moment(createdAt).format('DD/MM/YY')}</span>
            </div>
            <h3 className="list-item__data">{numeral(amount/100).format('$0,0.00')}</h3>
        </Link> 
);


export default ExpenseListItem; //With no mapping to state, connect still provides access to dispatch
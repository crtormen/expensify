import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses'

const onCheckboxChange = () => {
    console.log("CHECKBOX CHANGE");
};

export const ExpenseList = (props) => (
    <div>
    <h2>Expense List</h2>    
    {
        props.expenses.length === 0 ? (
            <p>No expenses</p>
        ) : (
            props.expenses.map((expense) => {
                return (
                        <ExpenseListItem
                            key={expense.id} 
                            {...expense} 
                        />
                )
            })
        )
    }
    </div>
);

const mapStateToProps = (state) => {
    return {
        expenses: selectExpenses(state.expenses, state.filters)
    };
};

export default connect(mapStateToProps)(ExpenseList); //connect to store to receive and show always the most updated list of expenses 

// const ConnectedExpenseList = connect((state) => {
//     return {
//         name: 'Claudio'
//     };

// })(ExpenseList);

// export default ConnectedExpenseList;
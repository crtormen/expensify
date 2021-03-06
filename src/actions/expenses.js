import uuid from 'uuid';
import database from '../firebase/firebase';


// Actions ate constants where are defined the arguments and their respectives default states, 
// for the object returned, where those args are applied to be executed in the reducers when dispatched by redux-store


//Action generator ADD_EXPENSE
export const addExpense = (expense) => ({ 
    type: 'ADD_EXPENSE',
    expense
});

// Pass a function instead of a object  
export const startAddExpense = (expenseData = {}) => {
    return (dispatch, getState) => { 
        const uid = getState().auth.uid;
        const { //default values
            description = '', 
            note = '', 
            amount = 0, 
            createdAt = 0
        } = expenseData;
        const expense = { description, note, amount, createdAt };

        return database.ref(`users/${uid}/expenses`).push(expense).then((ref) => { 
            dispatch(addExpense({
                id: ref.key,
                ...expense
            }));
        });
    };
};

//Action Generator REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

export const startRemoveExpense = ({ id } = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/expenses/${id}`).remove().then(() => {
            dispatch(removeExpense({ id }));
        });
    };
};


//Action Generator EDIT_EXPENSE
export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

export const startEditExpense = (id, updates) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/expenses/${id}`).update(updates).then(() => {
            dispatch(editExpense(id, updates));
        })
    };
};

//Action Generator SET_EXPENSES
export const setExpenses = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses
});

//Action Generator START_SET_EXPENSES
export const startSetExpenses = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        //returns a promises, so that when using startSetExpenses, we can use "then"
        return database.ref(`users/${uid}/expenses`).once('value').then((snapshot) => {
            let expenses = [];
            snapshot.forEach((childSnapshot) => {
                expenses.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                })
            });

            dispatch(setExpenses(expenses));
        });        
    };
};


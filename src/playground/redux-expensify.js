import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

//Action generator ADD_EXPENSE
const addExpense = (
    { //default values
        description = '', 
        note = '', 
        amount = 0, 
        createdAt = 0
    } = {} //in undefined case
) => ({ 
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
});


//Action Generator REMOVE_EXPENSE
const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

//Action Generator EDIT_EXPENSE
const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
})


//Expenses Reducer
const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            //return state.concat(action.expense); //Return a new array, instead of change the state, like push
            return [...state, action.expense]; //Does the same 
        case 'REMOVE_EXPENSE':
            return state.filter(({ id }) => id !== action.id );
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if (expense.id === action.id) {
                    return {
                        ...expense,
                        ...action.updates
                    }
                }
                return expense; //do nothing
            });
        default: 
            return state;
    }
};


// SET_TEXT_FILTER Action Generator
const setTextFilter = ( text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
});

// SORT_BY_AMOUNT Action Generator
const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
});

// SORT_BY_DATE Action Generator
const sortByDate = () => ({
    type: 'SORT_BY_DATE'
});

//SET_START_DATE
const setStartDate = ( startDate ) => ({
    type: 'SET_START_DATE',
    startDate
});

//SET_END_DATE
const setEndDate = ( endDate ) => ({
    type: 'SET_END_DATE',
    endDate
});


// Filters Reducer
const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER': 
            return {
                ...state,
                text: action.text
            };
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            };
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            };
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            };
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            };
        default: 
            return state;
    }
};

// Get visible expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {  //highest first
        if (sortBy === 'date')
            return a.createdAt < b.createdAt ? 1 : -1;
        if (sortBy === 'amount')
            return a.amount < b.amount ? 1 : -1;

    });
};

// Create Store
const store = createStore(
    combineReducers({  //Create only one reducer
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

store.subscribe(() => { //subscribe to listen to changes
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
});


//ACTIONS

 const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 100, createdAt: 125}));
// console.log(expenseOne);
 const expenseTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 300, createdAt: 1200}));
 const expenseThree = store.dispatch(addExpense({ description: 'Donuts', amount: 400, createdAt: 1150}));
// store.dispatch(removeExpense({ id: expenseOne.expense.id }));

// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));

//store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter());

 store.dispatch(sortByAmount());
 store.dispatch(sortByDate());

//store.dispatch(setStartDate(125));
//store.dispatch(setStartDate());
//store.dispatch(setEndDate(1250));


const demoState = {
    expenses: [{
        id: 'auhdauhda',
        description: 'January rent',
        note: 'This was the final payment for that address',
        amount: 54500,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount', //date or amount
        startDate: undefined,
        endDate: undefined
    }
};
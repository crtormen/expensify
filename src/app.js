import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import getVisibleExpenses from './selectors/expenses';
import {addExpense, editExpense, removeExpense} from './actions/expenses';
import {setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate} from './actions/filters';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';


const store = configureStore();

//store.subscribe(() => { //subscribe to listen to changes
const state = store.getState();
const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
console.log(visibleExpenses);

//});

const expenseOne = store.dispatch(addExpense({description: 'Water Bill', amount: 4500}));
const expenseTwo = store.dispatch(addExpense({description: 'Gas Bill', createdAt: 1000}));
const expenseThree = store.dispatch(addExpense({description: 'Rent', amount: 109500}));


// store.dispatch(setTextFilter('bill'));
//store.dispatch(setTextFilter('water'));

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
)
//Bootstrap
ReactDOM.render(jsx, document.getElementById('app'));


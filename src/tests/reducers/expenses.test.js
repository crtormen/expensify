import expensesReducer from '../../reducers/expenses';
import {expenses, expense} from '../fixtures/expenses';

 // DEFAULT
test("should set default state", () => {
    const state = expensesReducer(undefined, '@@INIT');
    expect(state).toEqual([]);
});

 //REMOVE_EXPENSE
 test("should remove an expense from state by id value", () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[0], expenses[2]]);
 });

test("should not remove an expense if id not found", () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: '-1'
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
 });

//ADD_EXPENSE
test("should add an expense", () => {

    const action = {
        type: 'ADD_EXPENSE',
        expense
    };

    const state = expensesReducer(expenses, action);
    expect(state).toEqual([...expenses, expense]);
});

//EDIT_EXPENSE
test("should edit an existing expense", () => {
    const action = {
        type: 'EDIT_EXPENSE',
        id: expenses[0].id,
        updates: expense
    };

    const state = expensesReducer(expenses, action);
    expect(state[0]).toEqual({...expense, id: '1'});
});


// EDIT EXPENSE ID NOT FOUND
test("should edit an existing expense", () => {
    const action = {
        type: 'EDIT_EXPENSE',
        id: '-1',
        updates: expense
    };

    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});

test("should set expenses", () => {
    const action = {
        type: 'SET_EXPENSES',
        expenses: [expenses[1]]
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[1]]);
});


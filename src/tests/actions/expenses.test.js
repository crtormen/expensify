import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { 
    addExpense, 
    startAddExpense, 
    editExpense, 
    removeExpense,
    startRemoveExpense,
    setExpenses,
    startSetExpenses } from '../../actions/expenses';
import { expenses } from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk])
const store = createMockStore({});

store.dispatch(startSetExpenses()).then(() => {
    const state = store.getState();
    console.log('STATE:', state);
});

beforeEach((done) => {
    const expensesData = {};
    expenses.forEach(({ id, description, note, amount, createdAt}) => {
        expensesData[id] = {description, note, amount, createdAt};
    });
    database.ref('expenses').set(expensesData).then(() => done()); //set dummy data on firebase
});

test("should setup remove expense action object", () => {
    const action = removeExpense({ id: '123abc' });
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    });
});

test("should remove expenses from firebase", (done) => {
    const store = createMockStore({});
    const id = expenses[2].id;

    store.dispatch(startRemoveExpense({ id: id })).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id
        });

        return database.ref(`expenses/${id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toBeFalsy();
        done();
    });
});

test("should edit an existing expense", () => {
    const action = editExpense('123abc', {
        description: 'iptu',
        amount: '1400.00',
        createdAt: '1521323883918'
    });

    expect(action).toEqual({
        id: '123abc',        
        type: 'EDIT_EXPENSE',
        updates: {
            description: 'iptu',
            amount: '1400.00',
            createdAt: '1521323883918'
        }
    });
});

test("should set up add expenses action object with provided values", () => {
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    });
});

test("should add expense to database and store", (done) => {
    const store = createMockStore({});
    const expenseData = {
        description: 'Mouse',
        note: '',
        amount: 3000,
        createdAt: 1000
    };

    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });
        return database.ref(`expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
});


test("should set up add expenses action object with default values", (done) => {
    const store = createMockStore({});
    const defaultExpense = {
        description: '',
        amount: 0,
        createdAt: 0,
        note: ''
    };
    store.dispatch(startAddExpense()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...defaultExpense
            }
        });
        return database.ref(`expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(defaultExpense);
        done();
    });
});

test("should setup set expenses action object with data", () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses        
    });
});

test("should fetch the expenses from firebase", (done) => {
    const store = createMockStore({});
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
        done();
    });
});
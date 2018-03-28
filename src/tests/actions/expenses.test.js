import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { 
    addExpense, 
    startAddExpense, 
    editExpense,
    startEditExpense, 
    removeExpense,
    startRemoveExpense,
    setExpenses,
    startSetExpenses } from '../../actions/expenses';
import { expenses } from '../fixtures/expenses';
import database from '../../firebase/firebase';

const uid = "testuid";
const defaultAuthState = { auth: { uid }};
const createMockStore = configureMockStore([thunk])

beforeEach((done) => {
    const expensesData = {};
    expenses.forEach(({ id, description, note, amount, createdAt}) => {
        expensesData[id] = {description, note, amount, createdAt};
    });
    database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done()); //set dummy data on firebase
});

test("should setup remove expense action object", () => {
    const action = removeExpense({ id: '123abc' });
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    });
});

test("should remove expenses from firebase", (done) => {
    const store = createMockStore(defaultAuthState);
    const id = expenses[2].id;

    store.dispatch(startRemoveExpense({ id: id })).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id
        });

        return database.ref(`users/${uid}/expenses/${id}`).once('value');
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

test("should edit expenses from firebase", (done) => {
    const store = createMockStore(defaultAuthState);
    const id = expenses[0].id;
    const updates = {
        description: 'blablabla'
    };
    store.dispatch(startEditExpense(id, updates)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id,
            updates
        });

        return database.ref(`users/${uid}/expenses/${id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val().description).toBe(updates.description);
        done();
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
    const store = createMockStore(defaultAuthState);
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
        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
});


test("should set up add expenses action object with default values", (done) => {
    const store = createMockStore(defaultAuthState);
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
        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
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
    const store = createMockStore(defaultAuthState);
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
        done();
    });
});
import { addExpense, editExpense, removeExpense } from '../../actions/expenses';


test("should setup remove expense action object", () => {
    const action = removeExpense({ id: '123abc' });
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
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
    const expenseData = {
        description: 'rent',
        amount: '3400.00',
        createdAt: '1521323883918',
        note: 'last rent value'
    };
    const action = addExpense(expenseData);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            id: expect.any(String),
            ...expenseData
        }
    });
});

test("should set up add expenses action object with default values", () => {
    const action = addExpense();
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            id: expect.any(String),
            'description': '',
            amount: 0,
            createdAt: 0,
            note: ''
        }
    })
})
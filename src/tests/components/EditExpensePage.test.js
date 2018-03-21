import React from 'react';
import { shallow } from 'enzyme';
import ExpenseForm from '../../components/ExpenseForm';
import { EditExpensePage } from '../../components/EditExpensePage';
import { expenses } from '../fixtures/expenses';

let editExpense, removeExpense, wrapper, history;

beforeEach(() => {
    editExpense = jest.fn(); //simula função;
    removeExpense = jest.fn();
    history = { push: jest.fn() };
    wrapper = shallow(
        <EditExpensePage 
            editExpense={editExpense} 
            removeExpense={removeExpense} 
            history={history} 
            expense={expenses[2]} 
        />
    );
});

test('should render EditExpensePage correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should handle editExpense', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[2]);     
    expect(history.push).lastCalledWith('/');
    expect(editExpense).lastCalledWith(expenses[2].id, expenses[2]);
});

test('should handle removeExpense', () => {
    //executa button click com param, espera que parametros sejam passados corretamente
    wrapper.find('button').simulate('click');
    expect(history.push).lastCalledWith('/');
    expect(removeExpense).lastCalledWith({ id: expenses[2].id });
});
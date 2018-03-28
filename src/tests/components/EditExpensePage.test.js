import React from 'react';
import { shallow } from 'enzyme';
import ExpenseForm from '../../components/ExpenseForm';
import { EditExpensePage } from '../../components/EditExpensePage';
import { expenses } from '../fixtures/expenses';

let startEditExpense, startRemoveExpense, wrapper, history;

beforeEach(() => {
    startEditExpense = jest.fn(); //simula função;
    startRemoveExpense = jest.fn();
    history = { push: jest.fn() };
    wrapper = shallow(
        <EditExpensePage 
            startEditExpense={startEditExpense} 
            startRemoveExpense={startRemoveExpense} 
            history={history} 
            expense={expenses[2]} 
        />
    );
});

test('should render EditExpensePage correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should handle startEditExpense', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[2]);     
    expect(history.push).lastCalledWith('/dashboard');
    expect(startEditExpense).lastCalledWith(expenses[2].id, expenses[2]);
});

test('should handle startRemoveExpense', () => {
    //executa button click com param, espera que parametros sejam passados corretamente
    wrapper.find('button').simulate('click');
    expect(history.push).lastCalledWith('/dashboard');
    expect(startRemoveExpense).lastCalledWith({ id: expenses[2].id });
});
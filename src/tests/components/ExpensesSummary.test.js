import React from 'react';
import { shallow } from 'enzyme';
import {ExpensesSummary} from '../../components/ExpensesSummary';
import { expenses } from '../fixtures/expenses';


test("should render ExpensesSummary with expenses", () => {
    const total = expenses.reduce((total, expense) => total + expense.amount);
    const wrapper = shallow(<ExpensesSummary expenseCount={expenses.length} expensesTotal={total} />);

    expect(wrapper).toMatchSnapshot();
});

test("should render ExpensesSummary with 1 expense", () => {
    const wrapper = shallow(<ExpensesSummary expenses={[expenses[0]]} />);

    expect(wrapper).toMatchSnapshot();    
})
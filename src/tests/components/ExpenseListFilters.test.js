import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { filters, altFilters } from '../fixtures/filters';

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
    setTextFilter = jest.fn();
    sortByDate = jest.fn();
    sortByAmount = jest.fn();
    setStartDate = jest.fn();
    setEndDate = jest.fn();
    wrapper = shallow(
        <ExpenseListFilters 
            filters={filters}
            setTextFilter = {setTextFilter}
            sortByDate = {sortByDate}
            sortByAmount = {sortByAmount}
            setStartDate = {setStartDate}
            setEndDate = {setEndDate}
        />
    );
})

test("should render ExpenseListFilters correctly", () => {
    expect(wrapper).toMatchSnapshot();
});

test("should render ExpenseListFilters with alt data correctly", () => {
    wrapper.setProps({
        filters: altFilters
    });
    expect(wrapper).toMatchSnapshot();
});

test("should handle text change", () => {
    const value = "rent";
    wrapper.find('input').simulate('change',{
        target: { value }
    });

    expect(setTextFilter).lastCalledWith(value);
});

test('should sort by date', () => {
    wrapper.setProps({
        filters: altFilters
    });
    wrapper.find('select').simulate('change', {
        target: { value: 'date' }
    } )
    expect(sortByDate).toBeCalled();
});

test('should sort by amount', () => {
    wrapper.find('select').simulate('change', {
        target: { value: 'amount' }
    } )
    expect(sortByAmount).toBeCalled();
});

test('should handle date changes', () => {
    const startDate = moment(0).add(4, 'days');
    const endDate = moment(0).add(8, 'days');

    wrapper.find('withStyles(DateRangePicker)')
        .prop('onDatesChange')({startDate, endDate});

    expect(setStartDate).lastCalledWith(startDate);
    expect(setEndDate).lastCalledWith(endDate);
});

test('should handle date focus change', () => {
    const focused = 'startDate';
    wrapper.find('withStyles(DateRangePicker)')
        .prop('onFocusChange')(focused);
    expect(wrapper.state('calendarFocused')).toBe(focused);
})
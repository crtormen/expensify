import moment from 'moment';

// Place to define the selectors used by filters or limited sections.

// Get visible expenses, filtering by text, period of time, and allows to sort by date and amount
export default (expenses, { text, sortBy, startDate, endDate }) => { 
    return expenses.filter((expense) => {
        const startDateMatch = startDate ? startDate.isSameOrBefore(moment(expense.createdAt), 'day') : true;
        const endDateMatch = endDate ? endDate.isSameOrAfter(moment(expense.createdAt), 'day') : true;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {  //highest first
        if (sortBy === 'date')
            return a.createdAt < b.createdAt ? 1 : -1;
        if (sortBy === 'amount')
            return a.amount < b.amount ? 1 : -1;

    });
};

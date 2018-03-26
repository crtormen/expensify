//Expenses Reducer

//Place to define default state, and the function that execute the actions related to expenses.

const expensesReducerDefaultState = [];

export default (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            //return state.concat(action.expense); //Return a new array, instead of change the state, like push
            return [...state, action.expense]; //Does the same (create a new a array)
        case 'REMOVE_EXPENSE':
            return state.filter(({ id }) => id !== action.id ); //return all in a new array, except that one where filter not match (id == action.id)
        case 'EDIT_EXPENSE':
            return state.map((expense) => {  //looks to expense list in state 
                if (expense.id === action.id) { //trying to find the expense defined in action.id
                    return { 
                        ...expense,
                        ...action.updates //Object spread operator (create new object based ond the previous, with updates and concatenations)
                    }
                }
                return expense; //do nothing if not found
            });
        case 'SET_EXPENSES':
            return action.expenses;
        default: 
            return state;
    }
};

//export default expensesReducer;
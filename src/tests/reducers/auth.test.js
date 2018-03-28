import authReducer from '../../reducers/auth';

test("should setup uid for login", () => {
    const uid = "blabla01"
    const action = {
        type: 'LOGIN',
        uid
    };
    const state = authReducer({}, action);
    expect(state.uid).toBe(uid);
});

test("should clear uid for logout", () => {
    const action = {
        type: 'LOGOUT'
    };

    const state = authReducer({ uid: 'uid2929' }, action);
    expect(state).toEqual({});
});
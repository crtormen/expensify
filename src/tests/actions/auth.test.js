import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { 
    login,
    startLogin,
    logout,
    startLogout
} from '../../actions/auth';
import database from '../../firebase/firebase';


const createMockStore = configureMockStore([thunk]);

test("should setup login action object", () => {
    const uid = '192318djakjd';
    const action = login(uid);
    expect(action).toEqual({
        type: 'LOGIN',
        uid
    });
});

// test("should login user to firebase", (done) => {
//     const store = createMockStore({});
//     const uid = '19832971jdak';
//     store.dispatch(startLogin(uid)).then(() => {
//         const actions = store.getActions();
//         expect(actions[0]).toEqual({
//             type: 'LOGIN',
//             uid
//         });
//         done();
//         //database.auth.uid
//     })
// });

test("should setup logout action object", () => {
    const action = logout();
    expect(action).toEqual({
        type: 'LOGOUT'
    });
});

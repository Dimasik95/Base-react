import React, {useContext} from 'react';
import MyButton from '../components/UI/button/myButton';
import MyInput from '../components/UI/input/myInput';
import { AuthContext } from '../context';

const Login = () => {
    // eslint-disable-next-line no-unused-vars
    const {isAuth, setIsAuth} = useContext(AuthContext);
    
    const login = event => {
        event.preventDefault();
        setIsAuth(true);
        localStorage.setItem('auth', 'true')
    }

    return (
        <div>
            <h1>Login page</h1>
            <form onSubmit={login}>
                <MyInput type="text" placeholder="Write you login" />
                <MyInput type="password" placeholder="Write you password" />
                <MyButton>Enter</MyButton>
            </form>
        </div>
    );
};

export default Login;
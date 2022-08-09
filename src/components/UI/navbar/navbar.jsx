import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import MyButton from '../button/myButton';
import { AuthContext } from '../../../context';

const Navbar = () => {
    // eslint-disable-next-line no-unused-vars
    const {isAuth, setIsAuth} = useContext(AuthContext);

    const logout = () => {
        setIsAuth(false);
        localStorage.removeItem('auth')
    }

    return (
        <div className="navbar">
            <MyButton onClick={logout}>Exit</MyButton>
              <div className="navbar__links">
                <Link to="/about">About site </Link>
                <Link to="/posts">Posts</Link>
              </div>
        </div>
    );
};

export default Navbar;
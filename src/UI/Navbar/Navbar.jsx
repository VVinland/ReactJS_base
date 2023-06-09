import { NavLink } from "react-router-dom";
import MyButton from "../button/MyButton";
import { useContext } from "react";
import { AuthContext } from "../../context";

const Navbar = () => {

    const { setIsAuth } = useContext(AuthContext);

    const logout = () => {
        setIsAuth(false);
        localStorage.removeItem('auth');
    }

    return (
        <div className="navbar">
            <div className="navbar_link">
                <MyButton onClick={logout}>Выйти</MyButton>
                <NavLink to='/posts' className={({ isActive }) => isActive ? 'activeLink' : ''}>Посты</NavLink>
                <NavLink to='/about' className={({ isActive }) => isActive ? 'activeLink' : ''}>О нас</NavLink>
            </div>
        </div>
    );
}

export default Navbar;
import { useContext } from "react";
import MyButton from "../UI/button/MyButton";
import MyInput from "../UI/input/MyInput";
import { AuthContext } from "../context";

const Login = () => {

    const {setIsAuth} = useContext(AuthContext);

    const login=(event)=>{
        event.preventDefault();
        setIsAuth(true);
        localStorage.setItem('auth','true');
    }

    return (
        <div>
            <h1>Окно авторизации</h1>
            <form onSubmit={login}>
                <MyInput type='text' placeholder='Введите логин' />
                <MyInput type='password' placeholder='Введите пароль' />
                <MyButton>Авторизоваться</MyButton>
            </form>
        </div>
    );
}

export default Login;
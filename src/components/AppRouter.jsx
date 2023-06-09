import { Navigate, Route, Routes } from "react-router-dom";
import Error from "../pages/Error";
import { privateRoutes, publicRoutes } from "../router/Routes";
import { useContext } from "react";
import { AuthContext } from "../context";
import Loader from "../UI/Loader/Loader";

const AppRouter = () => {
    let { isAuth, isLoading } = useContext(AuthContext);

    if(isLoading){
        return <Loader/>
    }

    return (isAuth
        ? <Routes>
            {
                privateRoutes.map(route => {
                    return <Route key={route.path}
                        path={route.path} element={<route.element />} exact={route.exact} />
                })
            }
            <Route path='*' exact={true} element={<Navigate to='/posts' />} />
        </Routes>
        : <Routes>
            {
                publicRoutes.map(route => {
                    return <Route key={route.path}
                        path={route.path} element={<route.element />} exact={route.exact} />
                })}
            <Route path='*' exact={true} element={<Navigate to='/login' />} />
        </Routes>
    )
}

export default AppRouter;
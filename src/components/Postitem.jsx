import { useNavigate } from "react-router-dom";
import MyButton from "../UI/button/MyButton";

const Postitem = ({ posts, number, remove }) => {

    const navigate = useNavigate();

    return (
        <div className="post">
            <div className="post__content">
                <strong>{posts.id}. {posts.title}</strong>
                <div>{posts.body}</div>
            </div>
            <div className="post__btns">
                <MyButton onClick={()=> navigate('/posts/' + posts.id)} >Открыть</MyButton>
                <MyButton onClick={() => remove(posts)} >Удалить</MyButton>
            </div>
        </div>
    );
}

export default Postitem;
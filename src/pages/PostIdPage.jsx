import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetching } from "../hooks/useFetching";
import PostService from "../API/PostService";
import Loader from "../UI/Loader/Loader";

const PostIdPage = () => {

    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [fetchingPost, isLoading, postError] = useFetching(async (id) => {
        const response = await PostService.getById(id);
        setPost(response.data);
    })
    const [fetchingComments, isComLoading, comError] = useFetching(async (id) => {
        const response = await PostService.getCommentsById(id);
        setComments(response.data);
    })
    const params = useParams();

    useEffect(() => {
        fetchingPost(params.id)
        fetchingComments(params.id)
    }, [])

    return (
        <div>
            <h1>Вы открыли пост с id = {params.id} </h1>
            {isLoading
                ? <Loader />
                : <div>{post.id}. {post.title}</div>
            }
            <h1>Комментарии</h1>
            {isComLoading
                ? <Loader />
                : <div>
                    {comments.map(com => {
                        return <div style={{ marginTop: '15px' }}
                            key={com.id}
                        >
                            <h5>{com.email}</h5>
                            <div>{com.body}</div>
                        </div>
                    })}
                </div>
            }
        </div>

    );
}

export default PostIdPage;
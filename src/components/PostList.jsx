import { CSSTransition, TransitionGroup } from "react-transition-group";
import Postitem from "./Postitem";
const PostList = ({ posts, title, remove }) => {

    if (!posts.length) {
        return (
            <h1 style={{ textAlign: 'center' }}>
                Посты не найдены!
            </h1>
        )
    }

    return (
        <>
            <h1 style={{ textAlign: "center" }}>{title}</h1>
            <TransitionGroup>
                {posts.map((el, index) => {
                    return <CSSTransition
                        key={el.id}
                        timeout={500}
                        classNames="post"
                    >
                        <Postitem remove={remove} number={index + 1} posts={el} />
                    </CSSTransition>
                }
                )}

            </TransitionGroup >
        </>
    );
}

export default PostList;
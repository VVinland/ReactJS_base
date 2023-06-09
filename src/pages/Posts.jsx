import { useEffect, useRef, useState } from "react";
import { usePosts } from "../hooks/usePosts";
import { useFetching } from "../hooks/useFetching";
import { getPageTotal } from "../utils/pages";
import MyButton from "../UI/button/MyButton";
import Pagination from "../UI/pagination/Pagination";
import PostList from "../components/PostList";
import PostFilter from "../components/PostFilter";
import Loader from "../UI/Loader/Loader";
import MyModal from "../UI/modal/MyModal";
import PostForm from "../components/PostForm";
import PostService from "../API/PostService";
import { useObserver } from "../hooks/useObserver";
import MySelect from "../UI/select/MySelect";



function Posts() {

  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const lastElement = useRef();

  const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
    const response = await PostService.getAll(limit, page);
    setPosts([...posts, ...response.data]);
    const totalCount = response.headers['x-total-count'];
    setTotalPages(getPageTotal(totalCount, limit));
  })

  useObserver(lastElement, page < totalPages, ()=>setPage(page + 1), isPostsLoading)

  useEffect(() => {
    fetchPosts(limit, page);
  }, [page, limit])

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false)
  }

  const removePost = (post) => {
    setPosts(posts.filter(item => item.id !== post.id));
  }

  const changePage = (page) => {
    setPage(page);
  }

  return (
    <div className="App">
      <MyButton
        style={{ marginTop: '30px' }}
        onClick={() => setModal(true)}>
        Добавить пост
      </MyButton>
      <MyModal
        visible={modal}
        setVisible={setModal}>
        <PostForm
          create={createPost}
        />
      </MyModal>
      <hr style={{ margin: '10px 5px' }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      <MySelect
        defaultValue='Кол-во элементов на странице'
        value={limit}
        onChange={event=>setLimit(event)}
        options={[
          {value:5, name:'5'},
          {value:10, name:'10'},
          {value:25, name:'25'},
          {value:-1, name:'Все'}
        ]}
      />
      {postError && <h1>Произошла ошибка: {postError}</h1>}
      <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Посты про JS" />
      <div ref={lastElement} style={{ height: 20, background: 'red' }} />
      {isPostsLoading &&
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}><Loader /></div>
      }

      <Pagination
        page={page}
        changePage={changePage}
        totalPages={totalPages} />
    </div>
  );
}

export default Posts;

import React, {useEffect, useState, useRef} from "react";
import PostList from "../components/postList";
import PostForm from "../components/postForm";
import PostFilter from "../components/postFilter";
import MyModal from "../components/UI/MyModal/myModal";
import MyButton from "../components/UI/button/myButton";
import { usePosts } from "../hooks/usePosts";
import PostService from "../api/postService";
import Loader from "../components/UI/loader/loader";
import { useFetching } from "../hooks/useFetching"; 
import { getPageCount } from "../utils/pages";
import Paginatnation from "../components/UI/pagination/Pagination";
import { useObserver } from "../hooks/useObserver";
import MySelect from "../components/UI/select/mySelect";


function Posts() {
  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({sort: '', query: ''})
  const [modal, setModal] = useState(false);
  const [totalPages, settotalPages] = useState(0);
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const lastElement = useRef();

  const [fetchPosts, isPostLoading, postError] = useFetching(async(limit, page) => {
    const response = await PostService.getAll(limit, page);
    setPosts([...posts, ...response.data])
    const totalCount = response.headers['x-total-count']
    settotalPages(getPageCount(totalCount, limit))
  })

  useObserver(lastElement, page < totalPages, isPostLoading, () => {
    setPage(page + 1);
  })

  useEffect(() => {
    fetchPosts(limit, page);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const changePage = (page) => {
    setPage(page)
  }

  return (
    <div className="App">
        <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
        Create new post
        </MyButton>
        <MyModal visible={modal} setVisible={setModal} >
            <PostForm create={createPost} />
        </MyModal>
        <hr style={{margin: '15px 0'}} />
        <PostFilter filter={filter} setFilter={setFilter} />
        <MySelect 
            value={limit} 
            onChange={ value => setLimit(value)}
            defaultValue='Amount of elements on page'
            options={[
                {value: 5, name: '5'},
                {value: 10, name: '10'},
                {value: 25, name: '25'},
                {value: -1, name: 'all'},
            ]} 
        />
        {postError && 
        <h1>Error ${postError}</h1>
        }
        <PostList 
            remove={removePost} 
            posts={sortedAndSearchedPosts} 
            title={"Post about JS:"}
        />
        <div ref={lastElement} style={{height:20, background: 'red'}} />
        {isPostLoading &&
        <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><Loader /></div>
        }
        <Paginatnation 
            page={page} 
            changePage={changePage} 
            totalPages={totalPages} 
        />
    </div>
  );
}

export default Posts;

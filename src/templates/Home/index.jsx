import { useCallback, useEffect, useState } from "react";

import "./styles.css";

import { Posts } from "../../components/Posts";
import { loadPosts } from "../../utils/load-posts";
import { Button } from "../../components/Button";
import { TextInput } from "../../components/TextInput";

export const Home = () => {

  const [posts, setPosts] = useState([])
  const [allPosts, setAllPosts] = useState([])
  const [page, setPage] = useState([0])
  const [postsPerPage] = useState([10])
  const [searchValue, setSearchValue] = useState('')

  const noMorePosts = page + postsPerPage >= allPosts.length;

  const filteredPosts = !!searchValue ?
  allPosts.filter(post => {
    return post.title.toLowerCase().includes(
      searchValue.toLocaleLowerCase()
    )
  })
  : posts

  const handleLoadPosts = useCallback(async (page, postsPerPage) => {

    const postsAndPhotos = await loadPosts();

    setPosts(postsAndPhotos.slice(page, postsPerPage))
    setAllPosts(postsAndPhotos)
  }, [])

  useEffect(() => {
    handleLoadPosts(0, postsPerPage)
  }, [handleLoadPosts, postsPerPage])

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    setPosts(posts)
    setPage(nextPage)
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchValue(value)
  };

  return (
    <section className="container">
      <div className="search-container">
        {!!searchValue && (
          <h2>Searh value: {searchValue}</h2>
        )}

        <TextInput
          searchValue={searchValue}
          handleChange={handleChange}
        />
      </div>

      {filteredPosts.length > 0 && (
        <Posts posts={filteredPosts} />
      )}

      {filteredPosts.length === 0 && (
        <>
          <h2>Ops...</h2>
          <p>Não existem posts relacionados a sua pesquisa! =( </p>
        </>
      )}

      <div className="button-container">
        {!searchValue && (
          <Button
            text="Load More Posts"
            onClick={loadMorePosts}
            disabled={noMorePosts}
          />
        )}
      </div>
    </section>
  );

}

// import "./styles.css"

// import { Component } from "react"

// export class Home extends Component {
//   state = {
//     counter: 0
//   }

//   handleClick = () => {

//     this.setState(
//       (prevState, prevProps) => {
//         return { counter: prevState.counter + 1 }
//       },
//       () => {
//         console.log(this.state.counter);
//       }
//     )
//   }

//   render() {
//     return (
//       <div className="container">
//         <h1>{this.state.counter}</h1>
//         <button onClick={this.handleClick}>Increment</button>
//       </div>
//     )
//   }

// }

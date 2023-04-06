import React from "react";
import { Link } from "react-router-dom";
import Feed from "./Feed";

export default function Sanja({search, setSearch, posts}) {
  return (
    <div className="main">
      <nav className="navMladen">
        <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="search">Search Posts</label>
          <input
            id='search'
            type='text'
            placeholder="Search Feedbacks"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
        <ul>
          {/* <li><Link to='/'>Home</Link></li> */}
          <li><Link to='/post'>New Feedback</Link></li>
          
        </ul>
      </nav>
      <main>
        {posts.length ? (
          <Feed posts={posts} />
        ) : (
          <p style={{marginTop: '2rem'}}>No posts to display</p>
        )
        }
      </main>
    </div>
  )
}
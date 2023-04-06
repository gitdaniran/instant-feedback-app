import React from "react";


export default function NewFb({handleSubmit, postTitle, setPostTitle,
 postBody, setPostBody, postAction, setPostAction, postTask, setPostTask,
  postResult, setPostResult}) {
    return (
    <main className="NewPost">
      <h2>New Post</h2>
      <form className="newPostForm" onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Title:</label>
        <input 
          id="postTitle"
          type='text'
          required 
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <label htmlFor="postBody">Situation:</label>
        <textarea
          id="postBody"
          required
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
        />
        <label htmlFor="postTask">Task:</label>
        <textarea
          id="postTask"
          required
          value={postTask}
          onChange={(e) => setPostTask(e.target.value)}
        />
        <label htmlFor="postAction">Action:</label>
        <textarea
          id="postAction"
          required
          value={postAction}
          onChange={(e) => setPostAction(e.target.value)}
        />
        <label htmlFor="postResult">Result:</label>
        <textarea
          id="postRessult"
          required
          value={postResult}
          onChange={(e) => setPostResult(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </main>
    )
}
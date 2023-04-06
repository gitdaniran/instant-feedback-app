import React from "react";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export default function EditFb({editBody, setEditBody, editTitle, 
  setEditTitle, handleEdit, posts, editTask, setEditTask, editAction, 
  setEditAction, editResult, setEditResult}) {
  const { id } = useParams()
  const post = posts.find(post => (post.id).toString() === id)  

  useEffect(() => {
    if (post) {
      setEditTitle(post.title)
      setEditBody(post.body)
      setEditTask(post.task)
      setEditAction(post.action)
      setEditResult(post.result)
    }
  }, [post, setEditTitle, setEditBody])

  return (
    <main className="NewPost">
      {(editTitle || editBody) ?
        <>
          <h2>Edit Feedback</h2>
          <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="postTitle">Title:</label>
            <input 
              id="postTitle"
              type='text'
              required 
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <label htmlFor="postBody">Situation:</label>
            <textarea
              id="postBody"
              required
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
            />
            <label htmlFor="postBody">Task:</label>
            <textarea
              id="postTask"
              required
              value={editTask}
              onChange={(e) => setEditTask(e.target.value)}
            />
            <label htmlFor="postBody">Action:</label>
            <textarea
              id="postAction"
              required
              value={editAction}
              onChange={(e) => setEditAction(e.target.value)}
            />
            <label htmlFor="postBody">Result:</label>
            <textarea
              id="postResult"
              required
              value={editResult}
              onChange={(e) => setEditResult(e.target.value)}
            />
            <button type="submit" onClick={() => handleEdit(post.id)}>Submit</button>
          </form>
        </>
      
      :
            <>
              <h2>Post Not Found</h2>
              <p>Well, that's disappointing</p>
              <p>
                <Link to='/'>Visit Our Homepage</Link>
              </p>
            </>}
    </main>
  )
}
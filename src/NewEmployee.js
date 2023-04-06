import React from "react";

export default function NewEmployee({postName, setPostName, handleNameSubmit}) {
    return (
        <main className="NewPost">
      <h2>New Employee</h2>
      <form className="newPostForm" onSubmit={handleNameSubmit}>
        <label htmlFor="postName">Title:</label>
        <input 
          id="postName"
          type='text'
          required 
          value={postName}
          onChange={(e) => setPostName(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </main>
    )
}
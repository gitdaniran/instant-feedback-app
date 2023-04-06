import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom'
import Header from './Header';
import Nav from './Nav';
import Mladen from './Mladen';
import About from './About'
import Footer from './Footer';
import Home from './Home';
import { useState, useEffect } from 'react';
import NewFb from './NewFb';
import PostPage from './PostPage';
import { format } from 'date-fns';
import EditFb from './EditFb';
import api from './api/feedbacks';
import { useParams } from 'react-router-dom';




function App() {
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState('')
  const [serachResults, setSearchResults] = useState([])
  const navigate = useNavigate()
  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('')
  const [postAction, setPostAction] = useState('')
  const [postTask, setPostTask] = useState('')
  const [postResult, setPostResult] = useState('')
  const [editTitle, setEditTitle] = useState('')
  const [editBody, setEditBody] = useState('')
  const [editTask, setEditTask] = useState('')
  const [editAction, setEditAction] = useState('')
  const [editResult, setEditResult] = useState('')
  const [items, setItems] = useState([
    { id: 1, ime: 'Mladen Ivanovic'},
    { id: 2, ime: 'Sanja Doljanica'},
    { id: 3, ime: 'Sladjana Stojanovic'},
    { id: 4, ime: 'Matea Maslovar'},
    { id: 5, ime: 'Suzana Savovic'},
    { id: 6, ime: 'Tamara Miladinovic'},
    { id: 7, ime: 'Tina Amidovic'},
    { id: 8, ime: 'Danijela Radevic'},
    { id: 9, ime: 'Nevenka Vilotijevic'},
    { id: 10, ime: 'Elena Bjelakovic'},
    { id: 11, ime: 'Jasmina Ratkovic'},
    { id: 12, ime: 'Danka Milovanovic'}
  ])
  const [postName, setPostName] = useState('')
  const [name, setName] = useState(items[0].ime)
  



  function handleNameChange(event) {
    const itemId = parseInt(event.target.value)
    const selectedItem = items.find(item =>item.id === itemId)
    setName(selectedItem.ime.replace(/\s+/g, '')) //uklanja razmak
    setPostName(selectedItem.ime)
    navigate('/mladen')
    /* const itemIndex = event.target.value
    const newItem = items[itemIndex].ime
    setName(newItem) */
  }

  function handleHome(event) {
    setPostName('')
  }
  function handleAbout(event) {
    setPostName('about')
  }
  
  

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        /* const response = await api.get('/sanja') */
        const response = await api.get(`/${name}`)
        setPosts(response.data)
      } catch (err) {
        if (err.response) {
        console.log(err.response.data)
        console.log(err.response.status)
        console.log(err.response.headers)
        } else {
          console.log(`Error: ${err.message}`)
        }
      }
    }
    fetchPosts()
  }, [name])

  useEffect(() => {
    const filteredResults = posts.filter(post => 
      ((post.body).toLowerCase()).includes(search.toLocaleLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLocaleLowerCase())
      )
      setSearchResults(filteredResults.reverse())
  }, [posts, search])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMM dd, yyyy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody, 
    task: postTask, action: postAction, result: postResult }
    try {
      const response = await api.post(`/${name}`, newPost)
      const allPosts = [ ...posts, response.data ]
      setPosts(allPosts)
      setPostTitle('')
      setPostBody('')
      setPostTask('')
      setPostAction('')
      setPostResult('')
      navigate('/mladen')
    } catch (err) {
      console.log(`Error: ${err.message}`)
    }
  }

  /* const handleNameSubmit = async (e) => {
    e.preventDefault()
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const newItem = {id, ime: postName}
    const newName = { name: postName, values: []}
    
    try {
      const response = await api.post()
      const allPosts = [...posts, response.data]
      const allItems = [...items, newItem]
      setPosts(allPosts)
      setItems(allItems)
      setPostName('')
      navigate('/')
    } catch (err) {
      console.log(`Error: ${err.message}`)
    }
  } */

  const handleDelete = async (id) => {
    try {
      await api.delete(`/${name}/${id}`)
      const postsList = posts.filter(post => post.id !== id)
      setPosts(postsList)
      navigate('/mladen')
      
    } catch (err) {
      console.log(`Error: ${err.message}`)
    }
    
  }

  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'MMM dd, yyyy pp');
    const updatedPost = { id, title: editTitle, datetime, body: editBody,
    task: editTask, action: editAction, result: editResult }
    try {
      const response = await api.put(`/${name}/${id}`, updatedPost)
      setPosts(posts.map(post => post.id === id ? {...response.data} : post))
      setEditTitle('')
      setEditBody('')
      navigate('/mladen')
    } catch (err) {
      console.log(`Error: ${err.message}`)
    }
    
  }


  return (
    <div className="App">
      <Header />
      <Nav 
        handleNameChange={handleNameChange}
        items={items}
        setItems={setItems}
        postName={postName}
        handleHome={handleHome}
        handleAbout={handleAbout}
      />
      <Routes>
        {/* <Route path='/' element={<Home/>}/> */}
        <Route path='/mladen' element={<Mladen
          search={search}
          setSearch={setSearch}
          posts={serachResults}
        />}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/post' element={<NewFb
          handleSubmit={handleSubmit}
          postTitle={postTitle}
          setPostTitle={setPostTitle}
          postBody={postBody}
          setPostBody={setPostBody}
          postAction={postAction}
          setPostAction={setPostAction}
          postTask={postTask}
          setPostTask={setPostTask}
          postResult={postResult}
          setPostResult={setPostResult}
        />}/>
        <Route path='/post/:id' element={<PostPage
          posts={posts}
          handleDelete={handleDelete}
        />}/>
        <Route path='/edit/:id' element={<EditFb
          editBody={editBody}
          setEditBody={setEditBody}
          editTitle={editTitle}
          setEditTitle={setEditTitle}
          handleEdit={handleEdit}
          posts={posts}
          editAction={editAction}
          setEditAction={setEditAction}
          editTask={editTask}
          setEditTask={setEditTask}
          editResult={editResult}
          setEditResult={setEditResult}
        />}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
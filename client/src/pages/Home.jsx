import React from 'react'
import {Helmet} from "react-helmet";

const Home = () => {
  return (
    <>
    <Helmet>
      <title>Home Page</title>
    </Helmet>
    <h1 style={{textAlign:'center'}}>This is Home Page</h1>
    <div style={{textAlign:'center'}}>
      <img style={{width:'100%', height:'85vh' }} src="https://ideas.ted.com/wp-content/uploads/sites/3/2020/06/final_booklist_black-writers.jpg" alt='homePage'/>
    </div>
    </>
    
  )
}

export default Home
import React, { useEffect, useState } from 'react'
import { useAuthorContext } from '../context/AuthorContext'
import { useNavigate, useParams } from 'react-router-dom';
import { editAuthor, getAuthorByID } from '../api/requests';
import { useFormik } from 'formik';
import { Button, TextField, Typography } from '@mui/material';

const EditAuthor = () => {
  const [authors,setAuthors ] = useAuthorContext();
  console.log('author context:', authors)
  const {id} = useParams();
  const navigate = useNavigate();
  const [author, setAuthor]=useState({});

  useEffect(()=>{
    getAuthorByID(id).then((res)=>{
      setAuthor(res);
      formik.values.name = res.name;
      formik.values.genre = res.genre;
      formik.values.birthyear = res.birthyear;
      formik.values.isDead = res.isDead;
      formik.values.isMale = res.isMale;
      formik.values.imageURL = res.imageURL;
    })
  },[id]);

  const handleEdit = async(values, actions) => {
    setAuthors(values);
    await editAuthor(id,values);
    navigate('/authors');
    actions.resetForm();
  };
  const formik = useFormik({
    initialValues: {
      name: author.name,
      genre: author.genre,
      imageURL: author.imageURL,
      isDead:author.isDead,
      isMale:author.isMale,
      birthyear:author.birthyear
    },
    onSubmit: handleEdit,
  });
  return (
    <>
     <Typography
          style={{ textAlign: "center", marginTop: "40px", fontSize: "30px" }}
        >
          {author.name} Edit
        </Typography>

        <form style={{width:'60%',margin:'0 auto'}} onSubmit={formik.handleSubmit}>
          <div style={{display:'flex',justifyContent:'center'}}>
          <TextField
            type="text"
            placeholder="author name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
           <TextField
            type="number"
            placeholder="artist birthyear"
            name="birthyear"
            value={formik.values.birthyear}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
           <TextField
            type="text"
            placeholder="author genre"
            name="genre"
            value={formik.values.genre}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
           <TextField
            type="text"
            placeholder="author image"
            name="imageURL"
            value={formik.values.imageURL}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
           <TextField
            type="text"
            placeholder="author isDead"
            name="isDead"
            value={formik.values.isDead}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
           <TextField
            type="text"
            placeholder="author isMale"
            name="isMale"
            value={formik.values.isMale}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          </div>
          <Button style={{margin:'0 auto',display:'block',marginTop:'20px'}} variant="contained" color="primary" type="submit">Edit</Button>
        </form>
    </>
  )
}

export default EditAuthor
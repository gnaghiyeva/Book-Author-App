import React from 'react'
import { useNavigate } from 'react-router-dom';
import { postAuthor } from '../api/requests';
import Swal from 'sweetalert2';
import { useFormik } from "formik";
import {AuthorValidation} from "../validation/AuthorSchema"
import { Button, TextField } from '@mui/material';
import {Helmet} from "react-helmet";


const AddAuthor = () => {
  const navigate = useNavigate();
  const handleSubmit = async(values, actions) => {
    await postAuthor(values);
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: `${values.name} posted successfully!`,
      showConfirmButton: false,
      timer: 1500
    })
    actions.resetForm();
    navigate('/authors');
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      birthyear: "",
      imageURL: "",
      genre:"",
      isMale:"",
      isDead:""
    },
    validationSchema: AuthorValidation,
    onSubmit: handleSubmit,
  });
  return (
    <>
    <Helmet>
      <title>Add Author</title>
    </Helmet>
    <form onSubmit={formik.handleSubmit} style={{textAlign:'center', marginTop:'100px'}}>
        <TextField
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          placeholder="enter name"
          type="text"
          name="name"
        /> <br/>
        {formik.errors.name && formik.touched.name && (
          <span>{formik.errors.name}</span>
        )}
        <TextField
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.birthyear}
          placeholder="enter birthyear"
          type="number"
          name="birthyear"
        /><br/>
        {formik.errors.birthyear && formik.touched.birthyear && (
          <span>{formik.errors.birthyear}</span>
        )}
        <TextField
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.imageURL}
          placeholder="enter image"
          type="url"
          name="imageURL"
        /><br/>
        {formik.errors.imageURL && formik.touched.imageURL && (
          <span>{formik.errors.imageURL}</span>
        )}

          <TextField 
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.genre}
          placeholder="enter genre"
          type="text"
          name="genre"
        /><br/>
        {formik.errors.genre && formik.touched.genre && (
          <span>{formik.errors.genre}</span>
        )}

          <TextField
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.isDead}
          placeholder="enter isDead"
          type="text"
          name="isDead"
        /><br/>
        <TextField
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.isMale}
          placeholder="enter isMale"
          type="text"
          name="isMale"
        /><br/>
         
        <Button variant='contained' color='error'
          disabled={Object.keys(formik.errors).length !== 0 ? true : false}
          type="submit"
        >
          Add New Author
        </Button>
      </form>
      </>
  )
}

export default AddAuthor
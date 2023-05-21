import React, { useEffect, useState } from 'react'
import { deleteAuthorByID, getAllAuthors } from '../api/requests'
import { Col, Row } from 'antd';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Swal from "sweetalert2";
import { Link } from 'react-router-dom';
import {Helmet} from "react-helmet";
const Authors = () => {
  const [authors, setAuthors] = useState([])
  useEffect(() => {
    getAllAuthors().then((res) => {
      setAuthors(res)
    })
  }, [])

  function handleSearch(e) {
    getAllAuthors(e.target.value).then((res) => {
      setAuthors(res)
    })
  }

  function handleChange(e) {
    getAllAuthors(e.target.value).then((res) => {
      if (Select.value === 'male') {
        setAuthors(res.filter((item) => item.value === 'male'))

      }
      else {
        setAuthors(res.filter((item) => item.value === 'female'))
      }
    })
  }
  return (
    <>
    <Helmet>
      <title>Authors Page</title>
    </Helmet>
      <div>
        <TextField

          onChange={(e) => handleSearch(e)}
          style={{ marginBottom: "30px", marginTop: '40px' }}
          id="outlined-basic"
          label="Search Author"
          variant="outlined"

        />

        <Box sx={{ minWidth: 120 }}>
          <FormControl style={{ width: '20%' }}>
            <InputLabel id="demo-simple-select-label">Cins</InputLabel>
            <Select onChange={handleChange}
              labelId="demo-simple-select-label"
              id="demo-simple-select"

              label="Age"

            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>

            </Select>
          </FormControl>
        </Box>
      </div>

      <Row>
        {authors && authors.map((author) => {
          return (
            <Col key={author.id} className="gutter-row" span={6}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  sx={{ height: 300 }}
                  image={author.imageURL}
                  title="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    <p style={{ color: author.isDead ? "red" : "false" }}><Link to={`/author/${author._id}`} style={{ color: author.isDead ? "red" : "false" }}>{author.name}</Link></p>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {author.genre}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {author.birthyear}
                  </Typography>

                </CardContent>
                <CardActions>
                  <Button size="small">isDead:{author.isDead ? "Dead" : "Alive"}</Button>
                  <Button size="small">isMale:{author.isMale ? "Male" : "Female"}</Button>
                </CardActions>
                <div style={{display:'flex', justifyContent:'center', gap:'20px'}}>
                <Button onClick={() => {

                  Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                  }).then((result) => {
                    if (result.isConfirmed) {
                      deleteAuthorByID(author._id).then((res) => {
                        Swal.fire(
                          'Deleted!',
                          'Your file has been deleted.',
                          'success'
                        )

                      });
                      setAuthors(authors.filter((x) => x._id !== author._id))
                    }
                  })
                }} variant='contained' color='success'>Delete</Button>
                <Button variant='contained' color='error'><Link to={`/author/edit/${author._id}`} style={{ color: 'white', textDecoration: 'none' }}>Edit</Link></Button>
                </div>
              </Card>
            </Col>
          )

        })}


      </Row>
    </>
  )
}

export default Authors
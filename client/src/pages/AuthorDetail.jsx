import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getAuthorByID } from '../api/requests';
import { Button } from '@mui/material';
import { Col, Row } from 'antd';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {Helmet} from "react-helmet";

const AuthorDetail = () => {
  const {id} = useParams();
  const[author,setAuthor]=useState({})
  const navigate = useNavigate();
  useEffect(()=>{
    getAuthorByID(id).then(res=>{
      setAuthor(res)
    })
  },[id])

  function handleClick(){
    navigate("/authors")
  }
  return (
    <>
    <Helmet>
      <title>Author's Details</title>
    </Helmet>
    <Row  style={{ width: "80%", margin: "80px auto",display:'flex',justifyContent:'center' }}>
       
        
            <Col key={author.id} className="gutter-row" span={6}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  sx={{ height: 300 }}
                  image={author.imageURL}
                  title="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    <p style={{ color: author.isDead ? "red" : "false" }}>{author.name}</p>
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
                <Button variant='outlined' color='primary' onClick={handleClick}> Go Back</Button>
              </Card>
            </Col>
        
      </Row>
      </>
  )
}

export default AuthorDetail
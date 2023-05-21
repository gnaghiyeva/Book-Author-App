import { BASE_URL } from "./base_url";
import axios from "axios"

//get all authors
export const getAllAuthors = async(name)=>{
    let globalData;
    let URL;
    if(!name){
        URL=BASE_URL+"/authors";
    }
    else{
        URL = BASE_URL+"/authors" + `?name=${name}`;
    }
    await axios.get(URL).then((res)=>{
        globalData = res.data.data;
    })
    return globalData;
};
// export const getAllAuthors = async () => {
//     let globalData;
//     await axios.get(`${BASE_URL}/authors`).then((res) => {
//       globalData = res.data;
//       });
//       return globalData
  
//   };

//get author by id
export const getAuthorByID = async(ID)=>{
    let globalData;
    await axios.get(`${BASE_URL}/authors/${ID}`).then((res)=>{
        globalData=res.data.data;
    });
    return globalData;
}

//delete author
export const deleteAuthorByID = async(ID)=>{
 let deletedAuthor;
 await axios.delete(`${BASE_URL}/authors/${ID}`).then((res)=>{
    deletedAuthor = res.data.data;
 })
 return deletedAuthor;
}

//post author
export const postAuthor = (newAuthor)=>{
    axios.post(`${BASE_URL}/authors`, newAuthor);
}

//edit author
export const editAuthor= (id, updatedAuthor)=>{
    axios.put(`${BASE_URL}/authors/${id}`, updatedAuthor);
}
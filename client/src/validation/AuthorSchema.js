import * as yup from "yup";

export const AuthorValidation = yup.object().shape({
  name: yup.string().required("name is required"),
  birthyear: yup.number().integer("birthyear must be an integer").positive("age cannot be negative number").required("age is required"),
  imageURL: yup.string().required("image is required"),
  genre:yup.string().required("genre is required"),
});
import { buildSchema } from 'graphql';
const schema = buildSchema(`
  
  type User{
    username:String,
    imageUrl:String,
    dob:String,
    gender:String,
    address:String,
    city:String,
    state:String,
    country:String,
    about:String,
    email:String,
    phoneNo:String
    password:String
  }

  input UserInput{
    username:String,
    imageUrl:String,
    dob:String,
    gender:String,
    address:String,
    city:String,
    state:String,
    country:String,
    about:String,
    email:String,
    phoneNo:String,
    userId:String
  }

  type Query {
    getProfileDetails(userId:String):User
  }

  type Mutation{
    updateProfileDetails(userInput:UserInput):String
  }

`);

export default schema;


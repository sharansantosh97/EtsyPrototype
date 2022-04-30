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

  type Query {
    getProfileDetails(userId:String):User
  }


`);

export default schema;


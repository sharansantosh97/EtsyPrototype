
import { gql } from 'apollo-boost';

const signUp = gql`
    mutation ($username: String, $email: String, $password: ID){
        signUp(username: $name, email: $email, password: $password){
            username,
            email
        }
    }
`;

export {signUp};
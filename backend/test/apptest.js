
import axios from "axios";
import assert from "assert";
import { log } from "console";

const url = "https://f204-2600-1700-65aa-d910-72fe-e6c-a33-e08f.ngrok.io";

let JWTTOKEN ="";
let userID="u-be49480a-686f-487a-a434-821948f4f1c0";


// describe("POST /signUp", () => {
//   it("It should SignUp the User", async () => {
//      try
//      {
      
//       const response = await axios.post(url+"/signUp",{ username:"mocha test user", email: "mochatestuser@gmail.com", password: "12345" })
//       if(response)
//       {
//         assert.equal(response.status, 200);
//       }
//       else{
//         console.log("Error Signing Up the User");
//       }
//     }catch(e)
//     {
//       console.log(e);
//     }
//   });
// });

describe("POST /login", () => {
  it("It should Login the User", async () => {
     try
     {
      
      const response = await axios.post(url+"/login",{ email: "mochatestuser@gmail.com", password: "12345" })
      if(response)
      {
        
        JWTTOKEN = response.data.token;
        assert.equal(response.status, 200);
      }
      else{
        console.log("Error Loggin In User");
      }
    }catch(e)
    {
      console.log(e);
    }
  });
});

// describe("POST /users/:userId/shops", () => {
//   it("It should create a shop for the user", async () => {
//      try
//      {
      
//       const response = await axios.post(url+"/users/"+userID+"/shops",{ name: "mocha test store", imageUrl: "https://getyess.com/wp-content/uploads/elementor/thumbs/image-store-placeholder-logo-otvjzfjc3ejvns87twki2x32mhcrzdj70dmj1pghjk.png" }, {headers:{'Authorization':JWTTOKEN}})

//       if(response)
//       {
//         assert.equal(response.status, 200);
//       }
//       else{
//         console.log("Error Creating shop for the User");
//       }
//     }catch(e)
//     {
//       console.log(e);
//     }
//   });
// });


describe("POST /users/:userId/products", () => {
  it("It should get the Products of the User", async () => {
     try
     {
      
      const obj = {
        priceRange: [0,250],
        categoryIds: [],
        shopIds: [],
        excludeOutOfStock: true
      }
      const response = await axios.post(url+"/users/"+userID+"/products",obj, {headers:{'Authorization':JWTTOKEN}})
      if(response)
      {
        assert.equal(response.status, 200);
      }
      else{
        console.log("Error Getting Products In User");
      }
    }catch(e)
    {
      console.log(e);
    }
  });
});


describe("GET /users/:userId/favorites?search=", () => {
  it("It should Login the User", async () => {
     try
     {
      const response = await axios.get(url+"/users/"+userID+"/favorites?search=", {headers:{'Authorization':JWTTOKEN}})
      if(response)
      {
        assert.equal(response.status, 200);
      }
      else{
        console.log("Error Getting Favorites of User");
      }
    }catch(e)
    {
      console.log(e);
    }
  });
});

describe("GET /users/:userId/orders", () => {
  it("It should get the orders of the User", async () => {
     try
     {
      const response = await axios.get(url+"/users/"+userID+"/orders", {headers:{'Authorization':JWTTOKEN}})
      if(response)
      {
        assert.equal(response.status, 200);
      }
      else{
        console.log("Error Getting Orders of User");
      }
    }catch(e)
    {
      console.log(e);
    }
  });
});

describe("GET /users/:userId/cart", () => {
  it("It should get the cart of the User", async () => {
     try
     {
      const response = await axios.get(url+"/users/"+userID+"/cart", {headers:{'Authorization':JWTTOKEN}})
      if(response)
      {
        assert.equal(response.status, 200);
      }
      else{
        console.log("Error Getting cart of User");
      }
    }catch(e)
    {
      console.log(e);
    }
  });
});


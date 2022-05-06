import graphql from 'graphql';
import { ShopDetailsType, CreateShopType, CheckShopNameAvailableType} from '../types/shop.js'
import { CreateProductType } from '../types/product.js'
import {getProfile, updateProfile} from '../Rest/apisgraphql/profile.restApi.js';
import {signUp} from '../Rest/apisgraphql/signup.restApi.js';
import {checkShopNameAvailability, createShop, getShopByUserId, getShopById, updateShopById} from '../Rest/apisgraphql/shops.restApi.js';
import {createNewProduct,  getProductById, updateProductById} from '../Rest/apisgraphql/products.restApi.js';
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean
} = graphql;



const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    userEdited: { type: GraphQLBoolean },
    msg: { type: GraphQLString }
  })
});

const SignUpType = new GraphQLObjectType({
  name: 'SignUp',
  fields: () => ({
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    msg: { type: GraphQLString }
  })
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Root Query',
    fields: 
    {
        user: 
        {
          type: UserType,
          args: { id: { type: GraphQLString } },
          resolve(parent, args) 
          {
              return getProfile(args.id);
          }
        }, 
        checkshopnameavailable: {
          type: CheckShopNameAvailableType,
          args: {
            shopname: { type: GraphQLString }
          },
          resolve(parent, args) 
          {
              return checkShopNameAvailability(args);
          }
      },
      getShopByUserId: {
        type: ShopDetailsType,
        args: {
          userId: { type: GraphQLString }
        },
        resolve(parent, args) 
        {
            return getShopByUserId(args);
        }
    },
    getShopById: {
      type: ShopDetailsType,
      args: {
        shopId: { type: GraphQLString }
      },
      resolve(parent, args) 
      {
          return getShopById(args);
      }
    },
    getProductById: {
      type: CreateProductType,
      args: {
        userId: { type: GraphQLString },
        productId: { type: GraphQLString }
      },
      resolve(parent, args) 
      {
          return getProductById(args);
      }
    }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
            signUp: {
              type: SignUpType,
              args: {
                username: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString }
              },
              async resolve(parent, args) 
              {
                  return signUp(args);
              }
          },
          updateProfile: {
            type: UserType,
            args: {
              username: { type: GraphQLString },
              imageUrl: { type: GraphQLString },
              dob: { type: GraphQLString },
              gender: { type: GraphQLString },
              address: { type: GraphQLString },
              city: { type: GraphQLString },
              state: { type: GraphQLString },
              country: { type: GraphQLString },
              about: { type: GraphQLString },
              email: { type: GraphQLString },
              phoneNo: { type: GraphQLString },
              userId:{ type: GraphQLString }
            },
            async resolve(parent, args) 
            {
                let a = await updateProfile(args);
                return a;
            }
        },
      createShop: {
        type: CreateShopType,
        args: {
          name: { type: GraphQLString },
          userId: { type: GraphQLString },
          imageUrl: { type: GraphQLString },
        },
        async resolve(parent, args) 
        {
            return createShop(args);
        }
    },
    updateShopById: {
      type: ShopDetailsType,
      args: {
        shopId: { type: GraphQLString },
        imageUrl: { type: GraphQLString }
      },
      async resolve(parent, args) 
      {
          return updateShopById(args);
      }
    },
    createProduct: {
      type: CreateProductType,
      args: {
        categoryId: { type: GraphQLString },
        imageUrl: { type: GraphQLString },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        price: { type: GraphQLInt },
        quantity: { type: GraphQLInt },
        shopId: { type: GraphQLString },
        userId: { type: GraphQLString }
      },
      async resolve(parent, args) 
      {
          return createNewProduct(args);
      }
    },
    updateProductById: {
      type: CreateProductType,
      args: {
        productId: { type: GraphQLString },
        name: { type: GraphQLString },
        imageUrl: { type: GraphQLString },
        description: { type: GraphQLString },
        price: { type: GraphQLInt },
        quantity: { type: GraphQLInt }
      },
      resolve(parent, args) 
      {
          return updateProductById(args);
      }
    }

    }
});

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});

export default schema;
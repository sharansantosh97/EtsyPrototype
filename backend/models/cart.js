import mongoose from 'mongoose';

const cartSchema = mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId, ref: 'products'
    },
    quantity:{
        type:Number
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId, ref: 'users'
    }
},
{
    versionKey: false
})


const cartModel = mongoose.model('cart', cartSchema);
export default cartModel;
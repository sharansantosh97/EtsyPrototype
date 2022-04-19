import mongoose from 'mongoose';

const cartSchema = mongoose.Schema({
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'users'
    },
    productId: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'products'
    },    
    quantity: {
        type: Number
    },
    giftWrapDescription: {
        type: String
    },
},
{
    versionKey: false
})


const cartModel = mongoose.model('cart', cartSchema);
export default cartModel;
import mongoose from 'mongoose';

const categorySchema = mongoose.Schema({
    name:{
        type:String
    },
    shopId:{
        type:mongoose.Schema.Types.ObjectId, ref: 'shops'
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId, ref: 'users'
    },
    isSystem:{
<<<<<<< HEAD
        type:Boolean
=======
        type:Number
>>>>>>> b8ae70d35a253ff0a93fc4277d8dc193ab40b46b
    }
},
{
    versionKey: false
})


const categoryModel = mongoose.model('category', categorySchema);
export default categoryModel;
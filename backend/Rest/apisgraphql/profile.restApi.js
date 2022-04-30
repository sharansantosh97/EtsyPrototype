const log = console.log;
import _ from 'lodash';
import  UserClass from '../../services/user.js';
async function updateProfile(req, res) {
    
    try {
        let userId = req.params.userId;
        let profileData = {
            "username":req.body.username ? req.body.username : null,
            "imageUrl":req.body.imageUrl ? req.body.imageUrl : null,
            "dob":req.body.dob ? req.body.dob : null,
            "gender":req.body.gender ? req.body.gender : null,
            "address":req.body.address ? req.body.address : null,
            "city":req.body.city ? req.body.city : null,
            "state":req.body.state ? req.body.state : null,
            "country":req.body.country ? req.body.country : null,
            "about":req.body.about ? req.body.about : null,
            "email":req.body.email ? req.body.email:null,
            "phoneNo":req.body.phoneNo ? req.body.phoneNo:null 
        };
        let exists = await UserClass.editUser(profileData,userId);
        if(exists && exists.userEdited == true)
        {
            res.status(200).json(exists);
        }else
        {
            res.status(400).json({msg:"Could not update User data"});
        }
    } catch (err) {
        log("Err", err);
        res.status(400).json({ msg: "Error in updating User profile data" });
    }
};

async function getProfile(userId) 
{
    try {
        let exists = await UserClass.getUserProfile(userId);
        //user = _.get(user, '0');
        if(exists && exists.userFound==false) 
        {
            return {
                msg: 'User Does not exists'
            }
        }
        exists.user.password = undefined;
        return exists.user;
    } 
    catch(err) 
    {
        console.trace("Err", err);
        return {msg: 'Failed to get user profile'};
    }
}

export { getProfile, updateProfile };
import  UserClass from '../mongoservices/user.js';
async function handle_request(msg, callback){
    //console.log("IN SERVICE");
    let userId = "6246932a505fb1ba175c4e52";
    try {
        let exists = await UserClass.getUserProfile(userId);
        if(exists && exists.userFound==false) {
            callback(null, 'User Does not exists');
        }
        exists.user.password = undefined;
        callback(null, exists.user);
    } catch(err) {
        callback(err, null);
    }
};

export {handle_request};



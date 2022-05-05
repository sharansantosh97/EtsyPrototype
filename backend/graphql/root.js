import { getProfile, updateProfile } from '../Rest/apisgraphql/profile.restApi.js';
const root = {
    getProfileDetails: ({ userId }) =>
    getProfile(userId),

    updateProfileDetails: ({ userInput }) =>
    updateProfile(userInput),
  };

  export default root;
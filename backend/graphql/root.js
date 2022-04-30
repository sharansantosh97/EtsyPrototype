import { getProfile } from '../Rest/apisgraphql/profile.restApi.js';
const root = {
    getProfileDetails: ({ userId }) =>
    getProfile(userId)
  };

  export default root;
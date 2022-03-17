const log = console.log;

async function updateProfile(req, res) {
    try {
        let profileData = [
            req.body.username ? req.body.username : null,
            req.body.imageUrl ? req.body.imageUrl : null,
            req.body.dob ? req.body.dob : null,
            req.body.gender ? req.body.gender : null,
            req.body.address ? req.body.address : null,
            req.body.city ? req.body.city : null,
            req.body.state ? req.body.state : null,
            req.body.country ? req.body.country : null,
            req.body.about ? req.body.about : null,
        ];

        let results = await query(
            `update users set username='${req.body.username}', imageUrl='${req.body.imageUrl}', dob='${req.body.dob}', gender= '${req.body.gender}', address='${req.body.address}', city= '${req.body.city}', state='${req.body.state}', country='${req.body.country}', about= '${req.body.about}' where _id='${req.params.userId}'`,
            profileData
        );
        res.status(200).json(results);
    } catch (err) {
        log("err ===>", err);
        res.status(400).json({ msg: "Error in updating profile data" });
        return;
    }
};

async function getProfile(req, res) {
    let userId = req.params.userId;
    try {
        let user = await query(`select * from users where _id='${userId}'`);
        user = user[0];
        delete user.password;
        res.status(200).json(user)
    } catch(err) {
        console.trace("#### err", err);
        res.status(400).json({msg: 'Failed to get user profile'})
    }
}

let endpoints = {
    "/users/:userId/profile": [{
        method: "PUT",
        callbacks: [updateProfile],
    },
    {
        method: "GET",
        callbacks: [getProfile],
    }
 ],
};

export { endpoints };
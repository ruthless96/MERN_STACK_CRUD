const router = require('express').Router();

let User = require('../../models/User');
let UserSession = require('../../models/UserSession');

router.route('/userfind').get((req, res) => {
    const { query } = req;
    const { token } = query;

    UserSession.find()
        .then(lists => {
            for (var i = 0; i < lists.length; i++) {
                if (lists[i]._id == token) {
                    const userid = lists[i].UserId
                    User.find({
                        _id: userid
                    }).then(list => {
                            return res.json(list[0])
                        })
                }
            }
        })

})

module.exports = router;
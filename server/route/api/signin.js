const router = require('express').Router();

const User = require('../../models/User');
const UserSession = require('../../models/UserSession')
router.route('/signin').post((req, res) => {
    const { body } = req;
    const User_Id = body.params.UserId;
    const User_Pw = body.params.UserPw;

    if(!User_Id) {
        return res.send({
            success: false,
            message: "Error: ID cannot be blank (signin)"
        })
    }
    if(!User_Pw) {
        return res.send({
            success: false,
            message: "Error: Password cannot be blank. (signin)"
        })
    }
    
    User.find({
        UserId: User_Id
    }, (err, users) => {
        if(err) {
            return res.send({
                success: false,
                message: users + 'Error: Server Error (signin)'
            });
        }
        if(users.length != 1) {
            return res.send({
                success: false,
                message: 'ERror: Invalid legnth (signin)'
            });
        }

        const user = users[0];
        
        if(!user.validPassword(User_Pw)) {
            return res.send({
                success: false,
                message: 'Error: Invalid Password Invalid (signin)'
            });
        }

        const userSession = new UserSession();
        userSession.UserId = user._id;
        userSession.UserName = user.UserId;
        userSession.save((err, doc) => {
            if(err) {
                return res.send({
                    success: false,
                    message: "Error: Server Error (session)"
                });
            }
            return res.send({
                success: true,
                message: 'Vaild sign in',
                UserName: doc.UserName,
                token: doc._id,
            });
        });
    });
});

module.exports = router;
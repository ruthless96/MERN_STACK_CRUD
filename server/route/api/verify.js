const router = require('express').Router();

let UserSession = require('../../models/UserSession');

router.route('/verify').get((req, res, next) => {
  const { query } = req;
  const { token } = query;

  UserSession.find({
      _id: token,
      isDeleted: false,
  }, (err, sessions) => {
    //   console.log(sessions)
    if(err) {
        return res.send({
            success: false,
            message: 'Error: Server error (verify)'
        })
    }

    if(sessions.length != 1) {
        return res.send({
            success: false,
            message: sessions.length + ' : Error : Invalid (verify)',
        });
    } else {
        return res.send({
            success: true,
            message: sessions[0].UserName
        });
    }
  });
})

module.exports = router;
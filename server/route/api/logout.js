const router = require('express').Router();

let UserSession = require('../../models/UserSession');

router.route('/logout').get((req, res, next) => {
  const { query } = req;
  const { token } = query;

  UserSession.findOneAndUpdate({
      _id: token,
      isDeleted: false,
  }, {
    $set: {isDeleted: true}
  }, null, 
  (err, sessions) => {
    if(err) {
        return res.send({
            success: false,
            message: 'Error: Server error (logout)'
        })
    }

    return res.send({
        success: true,
        message: 'Good'
    });
  });
})

module.exports = router;
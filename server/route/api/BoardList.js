const router = require('express').Router();

let Todo = require('../../models/todo');

router.route('/todo/list').get((req, res) => {

    Todo.find((err, board)=> {
        if(err) {
            return res.send({
                success: false,
                message: 'Failed (board)'
            })
        }
        res.json(board);
    }).sort({"_id": -1})
})

module.exports = router;
const router = require('express').Router();

let User = require('../../models/User');
let Todo = require('../../models/todo');

router.route('/todo/detail/:id').get((req, res) => {

    const { params } = req;
    const { id } = params;
    
    Todo.findById({
        _id: id
    }, (err, todo) => {
        if(err) {
            return res.send({
                success: false,
                message: "Error: Server error (todo find)"
            })
        }

        res.json(todo);
    })
})

module.exports = router;
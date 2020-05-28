const router = require('express').Router();

const User = require('../../models/User');
const Todo = require('../../models/todo');

router.route('/todo/update/:id').post((req, res) => {

    console.log(req, " : req")

    const { params } = req;
    const { id } = params;
    const { body } = req;
    const { BoardContent } = body;

    if(!id) {
        return res.send({
            success: false,
            message: 'Error : Board ID is blank (update)'
        })
    }

    if(!BoardContent) {
        return res.send({
            success: false,
            message: 'Error : Content is blank (update)'
        })
    }

    Todo.findOneAndUpdate({
        _id: id
    }, {
        $set: {BoardContent: BoardContent}
    }, null, (err, update) => {
        if(err) {
            return res.send({
                success: false,
                message: 'Error : Server error (update)'
            })
        }

        return res.send({
            success: true,
            message: 'Update completed'
        })
    })

})

module.exports = router
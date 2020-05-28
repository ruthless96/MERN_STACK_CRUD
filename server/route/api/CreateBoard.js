const router = require('express').Router();

let User = require('../../models/User');
let Todo = require('../../models/todo');

router.route('/todo/add').post((req, res) => {

    const { body } = req;

    const {
        BoardTitle,
        BoardContent,
        UserId,
    } = body;

    console.log(body)

    if (!BoardTitle) {
        return res.send({
            success: false,
            message: 'Error: Title cannot blank. (add)'
        })
    }

    if (!BoardContent) {
        return res.send({
            success: false,
            message: 'Error: Content cannot blank. (add)'
        })
    }

    if (!UserId) {
        return res.send({
            success: false,
            message: 'Error: Id is empty. (add)'
        })
    }

    User.find({
        UserId: UserId
    }, (err, user) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: User not found id (board user not find)'
            })
        }

        console.log(user[0].UserName);

        const User_Name = user[0].UserName;

        const newTodo = new Todo();

        newTodo.BoardTitle = BoardTitle;
        newTodo.BoardContent = BoardContent;
        newTodo.UserName = User_Name;

        newTodo.save((err, board) => {
            console.log(err, 'err')
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server error (add)',
                })
            }

            return res.send({
                success: true,
                message: 'Create Board'
            })
        })
    })
})

module.exports = router;
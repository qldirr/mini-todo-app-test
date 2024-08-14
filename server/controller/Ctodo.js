const { Todo } = require('../models')

// todo 목록 조회
exports.readTodos = async (_, res) => {
    try {
        let todos = await Todo.findAll({raw:true})
        res.send(todos)
    } catch (error) {
        res.send(error)
    }
}

// todo 생성
exports.createTodo = async (req, res) => {
    const { title } = req.body
    try {
        let newTodo = await Todo.create({
            title
            // todoItem 추가 시 false 가 기본값
        })
        console.log('newTodo----', newTodo);
        res.send(newTodo)
    } catch (error) {
        res.send(error)
    }
}

// todo 수정
exports.updateTodo = async (req, res) => {
    const { title, done } = req.body
    const { id } = req.params
    try {
        // 배열 구조 분해
        let [idUpdated] = await Todo.update(
            {
                title, done
            },
            {
                where: {
                    id
                }
            }
        )
        if (idUpdated === 0) {
            return res.send(false)
        }
        res.send(true)
    } catch (error) {
        res.send(error)

    }
}

// todo 삭제
exports.deleteTodo = async (req, res) => {
    const { id } = req.params
    try {
        let isDeleted = await Todo.destroy({
            where: { id }
        })

        if (!isDeleted) {
            return res.send(false)
        }
        res.send(true)
    } catch (error) {
        res.send(error)

    }
}
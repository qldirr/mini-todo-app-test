const express = require('express')
const router = express.Router()
const controller = require('../controller/Ctodo')

// todo 목록 조회
router.get('/todos', controller.readTodos)

// todo 생성
router.post('/todo', controller.createTodo)

// todo 수정
router.patch('/todo/:id', controller.updateTodo)

// todo 삭제
router.delete('/todo/:id', controller.deleteTodo)

module.exports = router
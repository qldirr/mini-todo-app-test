import React, { useState } from 'react'

export default function AddTodo({ addItem }) {   // 함수를 props로 받음
    const [todoItem, setTodoItem] = useState({
        title: ''
    })   // 사용자 입력을 저장할 객체

    const onBtnClick = () => {
        addItem(todoItem)   // add 함수 사용
        setTodoItem({  // 입력 후 초기화
            title: ''
        })
    }

    // enter 키 눌렀을때 추가
    const enterAdd = (e) => {
        if (e.key === 'Enter') {
            onBtnClick()
        }
    }

    return (
        <div className='AddTodo'>
            <input
                type="text"
                placeholder='Add your new Todo'
                value={todoItem.title}
                onChange={(e) => setTodoItem({ title: e.target.value })}
                onKeyDown={enterAdd}
            />
            <button onClick={onBtnClick}>ADD</button>
        </div>
    )
}

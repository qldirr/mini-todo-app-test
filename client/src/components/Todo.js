import React, { useState, useCallback } from 'react'
import '../styles/Todo.scss'

export default function Todo({ item, deleteItem, updateItem }) {
    const [todoItem, setTodoItem] = useState(item)
    const [readOnly, setReadOnly] = useState(true)

    const onDeleteBtnClick = useCallback(() => {
        deleteItem(todoItem)
    }, [deleteItem])

    // title 클릭 시 실행되는 함수 : readOnly를 false 로 변경
    const offReadOnlyMode =  useCallback(() => {
        setReadOnly(false)
    }, [])

    // readOnly true : enter 키 누르면 readOnly를 true로 변경
    const enterKeyEventHandler = (e) => {
        if (e.key === 'Enter') {
            setReadOnly(true)
            updateItem(todoItem)    // 엔터 누르면 저장
        }
    }

    // 커서가 깜빡인다고 수정 가능한 것은 아님
    // 사용자가 키보드 입력할 때마다 item 새 값으로 변경
    const editEventHandler = (e) => {
        // rest: id, done 정보(title 제외)
        const { title, ...rest } = todoItem
        setTodoItem({
            title: e.target.value,
            ...rest
        })
    }

    // checkbox 업데이트
    const checkboxEventHandler = (e) => {
        // rest : id, title 정보
        const { done, ...rest } = todoItem

        const updatedItem = {
            done:e.target.checked,
            ...rest
        }
        setTodoItem(updateItem)
        updateItem(updatedItem)   // 수정 API, checkbox 변경 시 저장
    }
    return (
        <div className='Todo'>
            <input
                type="checkbox"
                id={`todo${todoItem.id}`}
                name={`todo${todoItem.id}`}
                value={`todo${todoItem.id}`}
                defaultChecked={todoItem.done}
                onChange={checkboxEventHandler}
            />
            <input
                type="text"
                value={todoItem.title}
                readOnly={readOnly}
                onClick={offReadOnlyMode}
                onChange={editEventHandler}
                onKeyDown={enterKeyEventHandler}
            />
            {/* <label htmlFor="todo0">{item.title}</label> */}
            <button onClick={onDeleteBtnClick}>DELETE</button>
        </div>
    )
}

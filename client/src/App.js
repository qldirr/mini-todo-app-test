import AddTodo from './components/AddTodo';
import Todo from './components/Todo';
import { useState, useEffect } from 'react';
import './styles/App.scss'
import axios from 'axios'
import { API_BASE_URL } from './app-config'

function App() {
  const [todoItems, setTodoItems] = useState([])

  // env 버전
  // const dbHost = process.env.REACT_APP_DB_HOST

  // app-config.js 버전
  console.log(`${API_BASE_URL}`);


  // api 연결(Todo 목록 조회)
  useEffect(() => {
    console.log('first rendering!!');


    const todoList = async () => {
      // env 버전
      // let res = await axios.get(`${dbHost}/api/todos`)

      // app-config.js 버전
      let res = await axios.get(`${API_BASE_URL}/api/todos`)

      setTodoItems(res.data)
    }
    todoList()
  }, [])

  // AddTodo 컴포넌트는 상위 컴포넌트 items에 접근 불가
  // 상위 컴포넌트인 App 은 AddTodo에 접근 가능
  // -> App 컴포넌트에 add() 함수를 추가하고 해당 함수를 AddTodo 프로퍼티로 넘겨 AddTodo 이용
  const addItem = async (newItem) => {
    // newItem.id = todoItems.length + 1   // key를 위한 id 추가
    // newItem.done = false   // done 초기화

    let res = await axios({
      method: 'post',
      // env 버전
      // url: `${dbHost}/api/todo`,
      // app-config.js 버전
      url: `${API_BASE_URL}/api/todo`,
      data: { title: newItem.title }
    })

    // 현재 API 호출 후 응답을 기다리지 않고 바로 상태 업데이트를 진행하면
    // 네트워크 지연 등으로 인해 예상치 못한 문제 발생 가능
    // 따라서 비동기 작업 처리를 제대로 작성해줘야함
    if (res.status === 200) {
      setTodoItems([...todoItems, res.data])
    } else {
      console.error('Failed to add item')
    }
  }


  // Todo 삭제
  const deleteItem = async (targetItem) => {
    console.log('target===', targetItem);

    // env 버전
    // await axios.delete(`${dbHost}/api/todo/${targetItem.id}`)

    // app-config.js 버전
    let res = await axios.delete(`${API_BASE_URL}/api/todo/${targetItem.id}`)
    if (res.status === 200) {
      const newTodoItems = todoItems.filter((e) =>
        e.id !== targetItem.id
      )
      setTodoItems(newTodoItems)
    } else {
      console.error('Failed to add item')
    }
  }

  // API 이용해 update하려면
  // 1. server API를 이용해 서버 데이터를 업데이트 한 후 
  // 2. 변경된 내용을 화면에 다시 출력하는 두가지 작업 필요
  const updateItem = async (targetItem) => {
    console.log('target===', targetItem);

    // env 버전
    // await axios.patch(`${dbHost}/api/todo/${targetItem.id}`, 
    //   targetItem
    // )

    // app-config.js 버전
    await axios.patch(`${API_BASE_URL}/api/todo/${targetItem.id}`,
      targetItem
    )
  }


  return (
    <div className="App">
      <AddTodo addItem={addItem} />
      <div className='left-todos'>🗒{todoItems.length} TODOS</div>
      {todoItems.length > 0 ? (
        todoItems.map((item) => {
        return <Todo key={item.id} item={item} deleteItem={deleteItem} updateItem={updateItem} />

      })
      ) : (<p className='empty-todos'>🎯Todo를 추가해주세요</p>)}
    </div>
  );
}

export default App;

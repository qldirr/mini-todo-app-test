import AddTodo from './components/AddTodo';
import Todo from './components/Todo';
import { useState } from 'react';

function App() {
  const [todoItems, setTodoItems] = useState([
    {
      id: 1,
      title: 'myTodo1',
      done: false
    },
    {
      id: 2,
      title: 'myTodo2',
      done: false
    },
    {
      id: 3,
      title: 'myTodo3',
      done: true
    },
  ])

  // AddTodo 컴포넌트는 상위 컴포넌트 items에 접근 불가
  // 상위 컴포넌트인 App 은 AddTodo에 접근 가능
  // -> App 컴포넌트에 add() 함수를 추가하고 해당 함수를 AddTodo 프로퍼티로 넘겨 AddTodo 이용
  const addItem = (newItem) =>{
    newItem.id = todoItems.length + 1   // key를 위한 id 추가
    newItem.done = false   // done 초기화

    setTodoItems([...todoItems, newItem])
    
  }

  const deleteItem = (targetItem) => {
    console.log('target===', targetItem);
    
    const newTodoItems = todoItems.filter((e) => 
      e.id !== targetItem.id
    )
    setTodoItems(newTodoItems)
  }
  return (
    <div className="App">
      <AddTodo addItem={addItem}/>
      {todoItems.map((item) => {
        return <Todo key={item.id} item={item} deleteItem={deleteItem}/>
        
      })}
    </div>
  );
}

export default App;

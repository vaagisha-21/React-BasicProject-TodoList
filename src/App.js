import { useState, useEffect } from 'react';
import './App.css';


function ToDoList() {

    const [taskName,setTaskName] = useState("");
    const [todoList,setTodoList] = useState([]);
    const [count, setCount] = useState(0);
    const[strike, setStrike] = useState([]);
    const[data,setData] = useState([]);

    //Updating todoList when any new task is added
    const handleChange = () => {
        const id = todoList?.length + 1;
        setTodoList((prevState)=>{
            return [...prevState, 
                {
                    id:id,
                    title:taskName
                }
            ]
        })
    }

    /* To add strike-through on the tasks that are done 
    and to keep count of the done and undone tasks */
    const handleChecked = (e) =>{
        const {id, checked} = e.target;

        if(checked){
            strike[id] = "line-through";
            setCount((prev) => prev + 1);
        }

        else{
            strike[id] = "no-underline";
            setCount((prev) => prev - 1);
        }
      }

    //To fetch data to use an already made todo (here Saved Todo)
    useEffect(()=>{
        const fetchData = async ()=>{
            const result = await fetch("https://jsonplaceholder.typicode.com/todos");
            const dataApi = await result.json();
            setData(dataApi);
        }
          
        if(Array.isArray(data) && data?.length === 0)   //to run fetchData() only once
            fetchData();

    })

    //Setting todoList with data from the saved todo
    const handleSavedList = () =>{
        setCount(0);
        setTodoList(data.filter((element,index)=>index<10));
    }

    //Setting todoList empty for the new todo list
    const handleNewList = () =>{
        setTodoList([]);
        setCount(0);
    }
      

    return (  
        <div className='px-1 py-8 lg:p-10 w-screen flex justify-between'>
            <div className='flex flex-col items-center justify-center text-xl w-3/4 p-0 m-0'>
                <p className='text-4xl font-serif text-yellow-500'>My ToDo List</p>
                <div className='flex flex-wrap lg:flex-nowrap p-4'>
                    <input type="text" value={taskName} onChange={(event) => setTaskName(event?.target?.value)} className="shadow shadow-yellow-700 appearance-none rounded w-full px-3 mr-1 mb-1 text-black leading-tight focus:outline-none focus:shadow-outline"/>
                    <button onClick={handleChange} 
                            className="m-1 bg-yellow-500 hover:bg-white font-semibold text-white hover:text-yellow-500 py-1 px-4 rounded shadow shadow-yellow-700 leading-tight focus:outline-none focus:shadow-outline">
                            Add</button>
                    <button onClick={handleSavedList} 
                            className="m-1 bg-yellow-500 hover:bg-white font-semibold text-white hover:text-yellow-500 py-1 px-3 rounded shadow shadow-yellow-700 leading-tight focus:outline-none focus:shadow-outline">
                            Saved Todo</button>                
                    <button onClick={handleNewList} 
                            className="m-1 bg-yellow-500 hover:bg-white font-semibold text-white hover:text-yellow-500 py-1 px-3 rounded shadow shadow-yellow-700 leading-tight focus:outline-none focus:shadow-outline">
                            New Todo</button>                
                </div>
                <div className='w-3/4'>
                <ul>
                    {
                        todoList.map((todo, index)=>{
                            const variable = strike[index];                        
                            return (
                                <li key={index} className="py-4 px-2 my-3 flex shadow-sm shadow-yellow-700 appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white">                               
                                    <input type="checkbox" value={todo.title} id={index} onChange={handleChecked} className="mx-2 mr-3 w-6 accent-yellow-500" />    
                                    <label className={variable +" decoration-yellow-500"}>{todo.title}</label>
                                </li>
                            )    
                        })               
                    }
                </ul>
                </div>
            </div>
            <div className='w-1/4 h-1/2 text-center font-serif shadow shadow-yellow-700 appearance-none rounded container border-2 border-stone-900'>
                <div className='flex py-4 justify-around '>
                    <p className='lg:text-3xl text-amber-50'>Total Tasks </p>
                    <p className="text-yellow-500 font-sans lg:text-2xl font-semibold bg-white py-2 px-2 lg:px-4 rounded leading-tight focus:outline-none focus:shadow-outline shadow-sm shadow-yellow-700">{todoList.length}</p>
                </div><hr className='h-px bg-stone-900 border-0 dark:bg-yellow-700' />
                <div className='flex flex-col px-4 py-4 items-center'>  
                    <p className='lg:text-2xl text-amber-50 mb-2'>Task Done </p>
                    <p className="text-yellow-500 lg:text-xl font-sans font-semibold bg-white py-2 px-4 mx-16 lg:mx-24 rounded leading-tight focus:outline-none focus:shadow-outline shadow-sm shadow-yellow-700">{count}</p>
                </div>
                <div className='flex flex-col px-4 py-4 pt-4 items-center'>
                    <p className='lg:text-2xl text-amber-50 mb-2'>Task to be Done </p>
                    <p className="text-yellow-500 lg:text-xl font-sans font-semibold bg-white py-2 px-4 mx-16 lg:mx-24 rounded leading-tight focus:outline-none focus:shadow-outline shadow-sm shadow-yellow-700  border-yellow-500">{todoList.length - count}</p>
                </div>
            </div>
        </div>
    );
}

export default ToDoList ;




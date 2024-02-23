
import './App.css';
import React,{ useEffect, useState } from 'react';
import {AiOutlineDelete} from 'react-icons/ai';
import {BsCheckLg} from 'react-icons/bs';


function App() {
  const [iscompletescreen,setiscompletescreen] =useState(false);
  const [alltodos,setodos] = useState([]);
  const [newtitle,setnewtitle] =useState("");
  const [newdescription,setnewdescription]= useState("");
  const [completedtodos,setcompletedtodos]=useState([]);
 const handleaddtodo=()=>{
  let newtodoitem={
    title:newtitle,
    description:newdescription
  }
  let updatedtodoarr =[...alltodos];
  updatedtodoarr.push(newtodoitem);
  setodos(updatedtodoarr);
  localStorage.setItem('todolist',JSON.stringify(updatedtodoarr))
 }
 const handledeletetodo= (index)=>{
  let reducedtodo=[...alltodos];
  reducedtodo.splice(index);
  localStorage.setItem('todolist',JSON.stringify(reducedtodo));
  setodos(reducedtodo)
 };
 const handlecomplete =(index)=>{
  let now = new Date();
  let dd = now.getDate();
  let mm = now.getMonth();
  let yyyy = now.getFullYear();
  let h = now.getHours();
  let m = now.getMinutes();
  let s = now.getSeconds();
  let completedon = dd + '-' + mm + '-' + yyyy + 'at' + h + ':' + m + ';' +s;

  let filtereditem ={
    ...alltodos[index],
    completedon:completedon
  }
  let updatedcompletedtodoarr =[...completedtodos];
  updatedcompletedtodoarr.push(filtereditem);
  setcompletedtodos(updatedcompletedtodoarr);
  localStorage.setItem('completedtodolist',JSON.stringify (updatedcompletedtodoarr))
}
useEffect(()=>{
let savedtodo = JSON.parse(localStorage.getItem('todolist'));
let savecompletedtodo = JSON.parse(localStorage.getItem('completedtodolist'));
if(savedtodo){
  setodos(savedtodo);
}
},[])
  return (
    <div className="App">
      <div className='btns'>
       <a id='loginbtn'>Login</a>
       <a id='regbtn'>Register</a>
      </div>
    {/* <div className='myform'>
      <form >
    
      </form>
    </div> */}
      <title>MyTodo</title>
      <h1>My Wishlist</h1>
      <div className='todo-wrapper'>
        <div className='todo-input'>
          <div className='todo-input-item'>
            <label>Title</label>
            <input type='text' value={newtitle} onChange={(e) =>setnewtitle(e.target.value)} placeholder='Enter a task' />
          </div>    
          <div className='todo-input-item'>
            <label>Description</label>
            <input type='text' value={newdescription} onChange={(e) =>setnewdescription(e.target.value)} placeholder='Enter a  description' />
          </div> 
          <div className='todo-input-item'>            
            <button type='button' onClick={handleaddtodo} className='primarybtn'>Add</button>
          </div>
        </div>         
        <div className='btn-area'>
          <button className={`secondarybtn ${iscompletescreen===false && 'active'}`} 
          onClick={()=>setiscompletescreen(false)} >Todo
          </button>
          <button className={`secondarybtn ${iscompletescreen===true && 'active'}`} 
          onClick={()=>setiscompletescreen(true)} >Completed
          </button>
        </div>
        <div className="todo-list">
          {iscompletescreen===false && alltodos.map((item,index)=>{
            return(
              <div className="todo-list-item" key={index}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <div>
           <AiOutlineDelete className="icon" onClick={()=>handledeletetodo(index)} title='delete'/>
           <BsCheckLg className="check-icon" onClick={()=>handlecomplete(index)} title='completed'/>
          </div>
          </div>
            )
          })}
          {iscompletescreen===true && completedtodos.map((item,index)=>{
            return(
              <div className="todo-list-item" key={index}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p><small>Completed on: {item.description}</small></p>
            <div>
              
           <AiOutlineDelete className="icon" onClick={()=>handledeletetodo(index)} title='delete'/>
          </div>
          </div>
            )
          })}
        </div>
      </div>
    </div>

  );
}
export default App;

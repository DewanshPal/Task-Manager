import React,{useEffect,useState} from 'react'
import styles from '../../styles/tasks.module.css'
import ServerURL from '../../ServerUrl'
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import { Button,TextField } from '@mui/material';

const Tasks = () => {
  const [tasks,setTasks]=useState([]);
  const [newTask,setNewTask]=useState("");
  const [isCreating,setIsCreating]=useState(false);
  const getTasks=async()=>{
    const res=await fetch(`${ServerURL}/auth/getTasks`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({id:JSON.parse(localStorage.getItem('userData'))._id}),
      mode: 'cors',
    })
    const data=await res.json();
    setTasks(data.tasks);
    console.log(data);
  }
  const createTask=async()=>{
    setIsCreating(false);
    const res=await fetch(`${ServerURL}/auth/addTask`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({id:JSON.parse(localStorage.getItem('userData'))._id,task:newTask}),
      mode: 'cors',
    })
    // const data=await res.json();
    getTasks();
    // console.log(data);
  }

  const updateTask=async(taskId,task)=>{
    const res=await fetch(`${ServerURL}/auth/updateTask`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({id:taskId,completed:true,task}),
      mode: 'cors',
    })
    // const data=await res.json();
    getTasks();
    // console.log(data);
  }

  const createNewTask=()=>{
    setIsCreating(true);
    setNewTask("");
  }
  const deleteTask=async(id)=>{
    const res=await fetch(`${ServerURL}/auth/deleteTask`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({userId:JSON.parse(localStorage.getItem('userData'))._id,taskId:id}),
      mode: 'cors',
    })
    getTasks();
  }
  useEffect(()=>{
    getTasks();
  },[])
  return (
    <div className={styles.container}>
      <h1>TASKS</h1>
      <div className={styles.tasks}>
        {tasks.map((task)=>{
          return <div style={{
            border: (task.completed)?'2px solid green':'2px solid gray',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            margin:'5px',
            padding: '0px 5px',
          }}>
            <span style={{textDecorationLine:(task.completed)?'line-through':'none'}}>{task.task}</span>
            <div className={styles.buttons}>
            <Checkbox checked={task.completed} disabled={task.completed} onClick={()=>updateTask(task._id)} />
            <DeleteIcon sx={{cursor:'pointer'}} onClick={()=>deleteTask(task._id)}/>
            </div>
            
            
          </div>
        })}
        {(tasks.length==0)?<h2>No Tasks to complete</h2>:null}
        {(isCreating)?
        <div className={styles.newTask}>
          <TextField
          label="Task"
          maxRows={4}
          multiline
          name="username"
          size="small"
          sx={{width:'72%'}}
          value={newTask}
          onChange={(e)=>setNewTask(e.target.value)}
        />
        <Button sx={{margin:'0px 5px'}} variant="outlined" onClick={()=>createTask()}>
              Create
        </Button>
        <DeleteIcon sx={{cursor:'pointer'}} onClick={()=>setIsCreating(false)}/>
        </div>:null}
        <Button sx={{margin:'0px 5px'}} variant="outlined" onClick={()=>createNewTask()}>
              Create Task
        </Button>
      </div>
    </div>
  )
}

export default Tasks
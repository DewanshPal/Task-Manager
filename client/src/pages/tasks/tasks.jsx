import React,{useEffect,useState} from 'react'
import styles from '../../styles/tasks.module.css'
import ServerURL from '../../ServerUrl'
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import EditIcon from '@mui/icons-material/Edit';
import { Button,TextField } from '@mui/material';

const Tasks = () => {
  const [tasks,setTasks]=useState([]);
  const [newTask,setNewTask]=useState("");
  const [isCreating,setIsCreating]=useState(false);
  const [isEditing,setIsEditing]=useState(false);
  const [editedTaskId,setEditedTaskId]=useState("");
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
    if(isEditing){updateTask(editedTaskId,newTask);return;}
    const res=await fetch(`${ServerURL}/auth/addTask`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({id:JSON.parse(localStorage.getItem('userData'))._id,task:newTask}),
      mode: 'cors',
    })
    getTasks();
  }

  const updateTask=async(taskId,task)=>{
    let isCompleted=true;
    if(isEditing){
      tasks.map((t)=>{
        if(t._id==taskId){
          isCompleted=t.completed;
          return;
        }
      })
    }
    const res=await fetch(`${ServerURL}/auth/updateTask`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({id:taskId,completed:isCompleted,task}),
      mode: 'cors',
    })
    setIsEditing(false);
    getTasks();
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

  const createNewTask=()=>{
    setIsCreating(true);
    setNewTask("");
  }
  const editTask=(index,id)=>{
    if(tasks[index].completed)return;
    setIsCreating(true);
    setIsEditing(true);
    setEditedTaskId(id);
    setNewTask(tasks[index].task);
  }
  
  useEffect(()=>{
    getTasks();
  },[])
  return (
    <div className={styles.container}>
      <h1 style={{textTransform:"capitalize"}}>Hi {JSON.parse(localStorage.getItem('userData')).username}</h1>
      <h1>TASKS</h1>
      <div className={styles.tasks}>
        {tasks.map((task,index)=>{
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
            <EditIcon sx={{cursor:'pointer',margin:'0px 5px'}} onClick={()=>editTask(index,task._id)}/>
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
        <Button sx={{margin:'0px 5px'}} disabled={(newTask)?false:true} variant="contained" color="success"onClick={()=>createTask()}>
              {(isEditing)?'Update':'Create'}
        </Button>
        <DeleteIcon sx={{cursor:'pointer',color:'rgb(138,14,14)'}} onClick={()=>setIsCreating(false)}/>
        </div>:null}
        <Button sx={{margin:'0px 5px'}} variant="contained" onClick={()=>createNewTask()}>
              Create Task
        </Button>
      </div>
    </div>
  )
}

export default Tasks
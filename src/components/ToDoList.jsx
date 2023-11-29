import { useState, useRef, useEffect } from 'react';
import { Toast } from 'primereact/toast';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Checkbox } from "primereact/checkbox";
import { InputTextarea } from 'primereact/inputtextarea';
import "./ToDoList.css"

const ToDoList = () => {

    const [taskList, setTaskList] = useState(() => {
        let tasksLocalValue = localStorage.getItem("To-Do-Task");
        if(tasksLocalValue !== null) {
            return JSON.parse(tasksLocalValue);
        } else {
            return [];
        }
    });
    const [taskId, setTaskId] = useState();
    const [taskDescription, setTaskDescription] = useState("");
    const [updateId, setUpdateId] = useState();
    const [isUpdate, setIsUpdate] = useState(false);
    const toast = useRef(null);

    useEffect(()=> {
        localStorage.setItem("To-Do-Task", JSON.stringify(taskList));
    }, [taskList])

    const addTask = () => {
        if(taskDescription) {
            setTaskList([
                ...taskList, {id: crypto.randomUUID(), taskDesc: taskDescription, completed: false}
            ])
            setTaskId(taskId+1);
            setTaskDescription("");
        } else {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please enter your task first.' });
        }
    }

    const handleCompletedTask = (e, id) => {
        const completed = e.checked;

        setTaskList(
            taskList.map(task => {
                if(task.id === id) {
                    return {...task, completed}
                } else{
                    return task;
                }
            })
        )
    }

    const updateTask = () => {
        const taskDesc = taskDescription;

        setTaskList(
            taskList.map(task => {
                if(task.id === updateId) {
                    return {...task, taskDesc}
                } else {
                    return task;
                }
            })
        )
        
        setUpdateId();
        setTaskDescription("");
        setIsUpdate(false);
    }

    const handleUpdate = (id, taskDesc) => {
        setUpdateId(id);
        setTaskDescription(taskDesc);
    }

    const deleteTask = (taskId) => {
        setTaskList(
          taskList.filter(task => task.id !== taskId)
        );
    }

    return (
        <>
            <Toast ref={toast} />
            <div className="flex flex-column align-items-center justify-content-center">
                <div>
                    <Card className="title">Quick Task</Card>
                </div>
                <div className='flex-col align-items-center justify-content-center mt-6 px-5 py-5' style={{backgroundColor: "#fcd581"}}>
                    <div className='flex align-items-center justify-content-center mb-6'>
                        <InputTextarea 
                            value={taskDescription} 
                            onChange={(e) => setTaskDescription(e.target.value)} 
                            placeholder="Write your task here..." 
                            rows={3} 
                            cols={30}
                        /> 

                        {(isUpdate === true) ? (
                            <Button icon="pi pi-pencil" label="Update" className='ml-3' onClick={updateTask} />
                        ) : (
                            <Button icon="pi pi-plus" label="Add" className='ml-3' onClick={addTask} />
                        )}
                        
                    </div>

                    <div className='flex-col align-items-center justify-content-center px-8' style={{maxHeight: "50dvh", overflow: "scroll"}}>
                        {taskList.length === 0 && (
                            <Card className="task-card justify-content-center">
                                <span style={{fontSize: "1.5rem", fontFamily: "cursive"}}>No Tasks</span>
                            </Card>
                        )}

                        {taskList.slice().reverse().map(task => (
                            <div className='flex align-items-center justify-content-center todo-list-div' key={task.id}>
                                <Checkbox 
                                    inputId={task.id} 
                                    name="task" 
                                    value={taskList} 
                                    onChange={(e) => handleCompletedTask(e, task.id)} 
                                    checked={task.completed === true}
                                    className='mr-2'
                                />

                                { (task.completed === true) ? (
                                    <Card className='task-card-completed' style={{overflow: "auto"}}>{task.taskDesc}</Card> 
                                ) : (
                                    <Card className='task-card' style={{overflow: "auto"}}>{task.taskDesc}</Card> 
                                ) }

                                <Button 
                                    icon="pi pi-pencil" 
                                    rounded 
                                    severity="secondary" 
                                    aria-label="Update" 
                                    className='ml-2' 
                                    onClick={() => {
                                        setIsUpdate(true)
                                        handleUpdate(task.id, task.taskDesc)
                                    }}
                                />

                                <Button 
                                    icon="pi pi-times" 
                                    rounded 
                                    severity="danger" 
                                    aria-label="Cancel" 
                                    className='ml-2' 
                                    onClick={() => {
                                        deleteTask(task.id)
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ToDoList;
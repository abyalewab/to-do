import { useState, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import "./ToDoList.css"

const ToDoList = () => {

    const [taskDescription, setTaskDescription] = useState("");
    const [taskList, setTaskList] = useState([]);
    const [taskindex, setTaskIndex] = useState(0);
    const toast = useRef(null);

    const addTask = () => {
        if(taskDescription) {
            setTaskList([
                ...taskList, {id: taskindex, taskDesc: taskDescription}
            ])
            setTaskIndex(taskindex+1);
            setTaskDescription("");
        } else {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please enter your todo first.' });
        }
    }

    const deleteTask = (taskId) => {
        setTaskList(
          taskList.filter(taskList => taskList.id !== taskId)
        );
    }

    return (
        <>
            <Toast ref={toast} />
            <div className="flex flex-column align-items-center justify-content-center">
                <div>
                    <Card className="title">To Do List</Card>
                </div>
                <div className='flex-col align-items-center justify-content-center mt-6 px-5 py-5' style={{backgroundColor: "#fcd581"}}>
                    <div className='flex align-items-center justify-content-center mb-6'>
                        <InputTextarea 
                            value={taskDescription} 
                            onChange={(e) => setTaskDescription(e.target.value)} 
                            placeholder="Write todo task..." 
                            rows={5} 
                            cols={30}
                        /> 

                        <Button icon="pi pi-plus" label="Add" className='ml-3' onClick={addTask}/>
                        
                    </div>

                    <div className='flex-col align-items-center justify-content-center px-8' style={{maxHeight: "50dvh", overflow: "scroll"}}>
                        {taskList.map(task => (
                            <div className='flex align-items-center justify-content-center' key={task.id}>
                                <Card className='task-card'>{task.taskDesc}</Card> 

                                <Button 
                                    icon="pi pi-times" 
                                    rounded 
                                    severity="danger" 
                                    aria-label="Cancel" 
                                    className='ml-2' 
                                    onClick={() => {
                                        deleteTask(task.id)
                                    }}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ToDoList;
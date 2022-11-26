import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

// CUSTOM COMPONENTS
import TaskModal from '../components/TaskModal'
import ChecklistItem from '../components/ChecklistItem'
import httpRequest from '../utils/httpRequest'
import LoadingSpinner from '../components/Spinner'
import AppSwipeableList from '../components/AppSwipeableList'
import moment from 'moment'
import Remainder from '../components/Remainder'

const Container = styled.div`
    display: ${props => props.display};
    flex: 1;
    flex-direction: column;
`

const Text = styled.div`
  font-weight: 700;
  font-size: 16px;
  line-height: 18px;
  color: #575767;
  margin-bottom: 10px;
`

const Section = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 48px;
  margin-bottom: 16px;
`

const Button = styled.div`
  cursor: pointer;
  width: fit-content;
`

const sortTaskByTime = (sortData) => sortData.sort((task_a, task_b) => {
  return new Date(task_b.due_at) - new Date(task_a.due_at);
});

let intervals = []

function Tasks({display}) {

  // STATE TO STORE TASKS
  const [completedTasks, setCompletedTasks] = useState([])
  const [incompleteTasks, setIncompleteTasks] = useState([])

  // STATE FOR SHOW HIDE TASK MODAL
  const [showTaskModal, setShowTaskModal] = useState (false);

  const [showRemainder, setShowRemainder] = useState ({task: null, display: false})

  // STATE FOR SHOW HIDE LOADER
  const [loading, setLoading] = useState(false);

  const [selectedTask, setSelectedTask] = useState(null)

  useEffect(() => {
    
    getTasks();

  }, [])

  const getTasks = async (loadSilently = false) => 
  {

    // IF LOAD SILENTLY
    if (!loadSilently)
    {
      setLoading (true);
    }

    // SEND THE HTTP REQUEST
    const response = await httpRequest ("/tasks", "GET");

    // IF RESPONSE IS SUCCESSFULL
    if (response.code === 200)
    {
      // KEY FOR GROUP
      const key = "status";

      // GROUP TASKS BASED ON STATUS OF TASKS
      const groupedTasks = response.tasks.reduce(
        (acc, curr) => 
        {

          // IF ACCUMULATOR CONTAIN THE STATUS THEN PUSH THE CURRENT TASK WITH THE STATUS IN ACCUMULATOR
          (acc[curr[key]] = acc[curr[key]] || []).push(curr);

          // RETURN THE ACCUMULATOR
          return acc;
        }, {}
      );

      // IF WE HAVE COMPLETED TASKS
      if (groupedTasks["completed"] && groupedTasks["completed"].length > 0)
      {
        const sorted = sortTaskByTime (groupedTasks["completed"])
        setCompletedTasks (sorted)
      }

      // IF WE HAVE UNCOMPLETE TASKS
      if (groupedTasks["incomplete"] && groupedTasks["incomplete"].length > 0)
      {
        const sorted = sortTaskByTime (groupedTasks["incomplete"])

      
        for (let i = sorted.length - 1; i >= 0; i--)
        {
            const task = sorted[i];

            const timeout = setTimeout (() => setShowRemainder ({task , display: true}), moment(task.due_at).toDate().getSeconds())
            
            intervals.push({[task.id]: timeout});
        }

        setIncompleteTasks (sorted)
      }
    }

    // IF LOAD SILENTLY
    if (!loadSilently)
    {
      setLoading (false);
    }
  }
  
  // FUCTION FOR UPDATING THE TASK STATUS
  const updateTask = async (task, status) => 
  {
    setLoading (true);

    // BUILD THE OBJECT
    const tempTask = {...task, status: status};

    // SEND THE HTTP REQUEST
    const response = await httpRequest (`/tasks/${task.id}`, "PUT", tempTask);

    // IF RESPONSE IS SUCCESSFULL
    if (response.code === 201)
    {
      // IF STATUS IS COMPLETED
      if (status === "completed")
      {
          removeTaskFromIncomplete (task);

          const newCompletedTasks = sortTaskByTime ([...completedTasks, task])

          intervals = intervals.map(i => {

            if (i.id === task.id)
            {
              clearInterval (i.id)
            }
            else return i;
          })

          setCompletedTasks (newCompletedTasks)
      }
      else 
      {
          removeTaskFromCompleted (task)

          const newIncompletedTasks = sortTaskByTime ([...incompleteTasks, task])

          const timeout = setTimeout (() => setShowRemainder ({task , display: true}), moment(task.due_at).toDate().getSeconds())
            
          intervals.push({[task.id]: timeout});

          setIncompleteTasks (newIncompletedTasks)
      }
    }

    setLoading (false);

  }


  // FUNCTION FOR DELETING THE TASK
  const handleDelete = async (task) => 
  {
      setLoading (true);

      // SEND THE HTTP REQUEST
      const response = await httpRequest (`/tasks/${task.id}`, "DELETE")

      // IF TASK IS SUCCESSFULLY DELETED
      if (response.code === 204)
      {
        if (task.status === "incomplete")
        {
          removeTaskFromIncomplete (task)

          intervals = intervals.map(i => {

            if (i.id === task.id)
            {
              clearInterval (i.id)
            }
            else return i;
          });
          
        }
        else 
        {
          removeTaskFromCompleted (task)
        }
      }

      setLoading (false)
  }

  // FUNCTION FOR HANDLING EDIT TASK
  const handleEdit = (task) => 
  {
      // SET THE SELECTED TASK
      setSelectedTask (task);

      // SHOW THE MODAL
      setShowTaskModal (true)
  }

  // FUNCTION FOR REMOVING THE TASK FROM INCOMPLETE STATE
  const removeTaskFromIncomplete = (task) => 
  {
    // REMOVE THE TASK FROM INCOMPLETED ARRAY 
    const filteredIncompletedTasks = incompleteTasks.filter(i => i.id !== task.id)

    // UPDATE THE TASKS
    setIncompleteTasks (filteredIncompletedTasks);
  }

  // FUNCTION FOR REMOVING THE TASK FROM INCOMPLETE STATE
  const removeTaskFromCompleted = (task) => 
  {
    // REMOVE THE TASK FROM INCOMPLETED ARRAY 
    const filteredCompletedTasks = completedTasks.filter(i => i.id !== task.id)

    // UPDATE THE TASKS
    setCompletedTasks (filteredCompletedTasks);
  }

  // IF LOADING IS TRUE
  if (loading && display) 
  {
    return <LoadingSpinner />
  }

  return (
    <Container display={display ? "flex" : "none"}>
      <Button onClick={() => setShowTaskModal (true)}>
        <Text>+ Add new task</Text>
      </Button>
      <Section>
        <Text>Incomplete</Text>
        <AppSwipeableList
          data={incompleteTasks}
          handleDelete={(task) => handleDelete(task)}
          handleEdit={(task) => handleEdit(task)}
          renderItem=
          {
            (task) => 
            <ChecklistItem
              onClick={() => updateTask(task, "completed")} 
              key={task.id} 
              checked={false} 
              dueDate={task.due_at} 
              title={task.title} 
            />
          }
        />
      </Section>
      <Section>
        <Text>Completed</Text>
        <AppSwipeableList
          data={completedTasks}
          handleDelete={(task) => handleDelete(task)}
          handleEdit={(task) => handleEdit(task)}
          renderItem=
          {
            (task) => 
            <ChecklistItem 
              key={task.id} 
              checked={true} 
              onClick={() => updateTask(task, "incomplete")}
              dueDate={task.due_at} 
              title={task.title} 
            />
          }
        />
      </Section>

      <TaskModal 
        visible={showTaskModal} 
        selectedTask={selectedTask}
        onTaskSave={() => getTasks(true)}
        setVisible={() => setShowTaskModal(!showTaskModal)} 
      />
      {showRemainder.display && <Remainder onPress={(type) => setShowRemainder((prev) => ({...prev, display: false}))}  task={showRemainder.task} />}
    </Container>
  )
}

export default Tasks
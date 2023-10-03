import { handaleLongDate } from "../../dateHandle.js"
import { Link } from "react-router-dom";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Task = ({ taskData }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const deleteTask = () => {

        axios.delete(`http://localhost:4000/api/tasks/${taskData._id}`).then(resp => {

            if (resp.status === 200) {
                dispatch({ type: "DELETE_TASK", payload: taskData._id });
                alert(resp.data.message);
                navigate("/");

            }

        }).catch(err => {
            alert(err.response.data.message);

        })
    }

    const changeStatusTask = () => {
        axios.post(`http://localhost:4000/api/tasks/${taskData._id}`).then(resp => {
        if (resp.status === 200) {
                dispatch({ type: "CHANGE_STATUS_TASK", payload: resp.data.taskafterchange });
            }

        }).catch(err => {
            alert(err.response.data.message);
        })
    }


    return (
        <div className="task-container" style={{ backgroundColor: taskData.completed && "beige"}}>
            <input type="checkbox" onChange={changeStatusTask} checked={taskData.completed}/>
            <h3>תאור המשימה:</h3>
            <p>{taskData.title}</p>
            <h3>תאריך יצירת/שינוי המשימה:</h3>
            <p>{handaleLongDate(taskData.updatedAt)}</p>
            <Link to={`/edit-task/${taskData._id}`}>עריכת משימה</Link>
            <button onClick={deleteTask}>מחיקת משימה</button>
            <hr />
        </div>
    )
}

export default Task;
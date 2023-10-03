import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

const EditTask = () => {

    const tasks = useSelector(state => state.tasks);
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [task, setTask] = useState({})

    useEffect(() => {
        const taskToEdit = tasks && tasks.find(t => t._id === params.id);
        setTask(taskToEdit);

    }, [tasks, params.id])


    const editTask = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:4000/api/tasks/${params.id}`, task).then(resp => {
            if (resp.status === 200) {
                dispatch({ type: "UPDATE_TASK", payload: task });
                alert(resp.data.message);
                navigate("/"); 
            }

        }).catch(err => {
            alert(err.response.data.message);
        })
    }

    return (
        <>
            <h2>עריכת משימה</h2>
            <form>
                <label htmlFor="title-field">הזן את המשימה שלך</label>
                <br />
                <textarea id="title-field" type="textarea" value={task?.title} onChange={e => setTask({ ...task, title: e.target.value })} />
                <button type="submit" onClick={editTask}>ערוך משימה</button>
            </form>
        </>
    )
}

export default EditTask;
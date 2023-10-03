import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Task from './../Task/Task';
import axios from "axios";
import { useEffect } from "react";


const Tasks = () => {

    const tasks = useSelector(state => state.tasks);
    const dispatch = useDispatch();

    useEffect(() => {
        const getData = async () => {
            const resp = await axios.get("http://localhost:4000/api/tasks");
            dispatch({ type: "LOAD_TASKS", payload: resp.data.tasks });
        }
        getData();
    }, [dispatch])

    return (
        <>
            <h2>רשימת משימות</h2>
            <Link to="/add-task">הוספת משימה חדשה</Link>

            {
                tasks.length ?
                    tasks.map(task => {
                        return <Task key={task._id} taskData={task} />
                    })
                    :
                    <p>אין משימות בלוח</p>
            }
        </>
    )
}

export default Tasks;
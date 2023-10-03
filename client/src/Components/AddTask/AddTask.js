import { useRef } from 'react';
import './AddTask.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const AddTask = () => {

    const titleRef = useRef("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const addTask = (e) => {
        e.preventDefault();
        const newtask = { title: titleRef.current.value };
        axios.post("http://localhost:4000/api/tasks", newtask).then(resp => {
            if (resp.status === 201) {
                dispatch({ type: "ADD_TASK", payload: resp.data.newTask });
                alert(resp.data.message);
                navigate("/");
            }

        }).catch(err => {
            alert(err.response.data.message);
        })

    }

    return (
        <>
            <h2>הוספת משימה חדשה</h2>
            <form>
                <label htmlFor="title-field">הזן את המשימה שלך</label>
                <br />
                <textarea id="title-field" type="textarea" ref={titleRef} />
                <button type="submit" onClick={addTask}>הוסף משימה</button>
            </form>
        </>
    )
}

export default AddTask;
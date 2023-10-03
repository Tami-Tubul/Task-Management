import './App.css';
import { Routes, Route } from "react-router-dom"
import Tasks from './Components/Tasks/Tasks';
import EditTask from './Components/EditTask/EditTask';
import AddTask from './Components/AddTask/AddTask';
import { useNavigate, Navigate } from "react-router-dom"
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function App() {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {

    const getData = async () => {
      const resp = await axios.get("http://localhost:4000/api/tasks");
      dispatch({ type: "LOAD_TASKS", payload: resp.data.tasks });
    }
    getData();

  }, [dispatch])

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <div className="App">

      <header className="App-header">
        <h1>ניהול המשימות שלי</h1>
        <button onClick={handleBack}>חזור</button>
      </header>


      <main className='App-main'>
        <Routes>
          <Route index element={<Navigate to="/tasks" />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/add-task" element={<AddTask />} />
          <Route path="/edit-task/:id" element={<EditTask />} />
        </Routes>
      </main>


      <footer className='App-footer'>
        כל הזכויות שמורות
      </footer>


    </div>
  );
}

export default App;

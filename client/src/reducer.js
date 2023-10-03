const appReducer = (state = { tasks: [] }, action) => {
    switch (action.type) {

        case "LOAD_TASKS":
            return { ...state, tasks: action.payload }

        case "ADD_TASK":
            return { ...state, tasks: [...state.tasks, action.payload] }

        case "UPDATE_TASK":
            const taskid = action.payload._id;
            let alltasks = [...state.tasks];
            let index = alltasks.findIndex(t => t._id === taskid);
            if (index > -1) {
                alltasks[index] = action.payload;
            }
            return { ...state, tasks: alltasks }

        case "DELETE_TASK":
            const d_taskid = action.payload;
            let d_alltasks = [...state.tasks];
            let d_index = d_alltasks.findIndex(t => t._id === d_taskid);
            if (d_index > -1) {
                d_alltasks.splice(d_index, 1)
            }
            return { ...state, tasks: d_alltasks }


        case "CHANGE_STATUS_TASK":
            const c_taskid = action.payload._id;
            let c_alltasks = [...state.tasks];
            let tasktochange_index = c_alltasks.findIndex(t => t._id === c_taskid);
            if (tasktochange_index > -1) {
                c_alltasks[tasktochange_index] = action.payload;
            }
            return { ...state, tasks: c_alltasks }

        default:
            return state;
    }

}

export default appReducer;


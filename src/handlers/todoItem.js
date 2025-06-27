import axios from 'axios'

export const handleTaskDelete = async (id) => {
    try {
        const res = await axios.delete(`/API/todos/${id}`);
        
    } catch (error) {
        console.error('Delete failed', error);
    } 
};

export const handleTaskUpdate = async (id, taskName, taskDesc) => {
    try {
        const res = await axios.patch(`/API/todos/${id}`, {
            task_name: taskName,
            task_desc: taskDesc,
        });
    } catch (error) {
        console.error('Update failed', error);
    }
}

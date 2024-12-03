const express = require('express');
const { pool, createTasksTable } = require('./db');
const app = express();
const PORT = 3000;

app.use(express.json());

createTasksTable();

// GET /tasks - Get all tasks
app.get('/tasks', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tasks');
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching tasks:', err);
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});

// POST /tasks - Add a new task
app.post('/tasks', async (req, res) => {
    const { id, description, status } = req.body;
    if (!id || !description || !status) {
        return res.status(400).json({ error: 'All fields (id, description, status) are required' });
    }

    try {
        await pool.query(
            'INSERT INTO tasks (id, description, status) VALUES ($1, $2, $3)',
            [id, description, status]
        );
        res.status(201).json({ message: 'Task added successfully' });
    } catch (err) {
        console.error('Error adding task:', err);
        res.status(500).json({ error: 'Failed to add task' });
    }
});

// PUT /tasks/:id - Update a task's status
app.put('/tasks/:id', async (req, res) => {
    const taskId = parseInt(req.params.id, 10);
    const { status } = req.body;

    try {
        const result = await pool.query(
            'UPDATE tasks SET status = $1 WHERE id = $2',
            [status, taskId]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.json({ message: 'Task updated successfully' });
    } catch (err) {
        console.error('Error updating task:', err);
        res.status(500).json({ error: 'Failed to update task' });
    }
});

// DELETE /tasks/:id - Delete a task
app.delete('/tasks/:id', async (req, res) => {
    const taskId = parseInt(req.params.id, 10);

    try {
        const result = await pool.query('DELETE FROM tasks WHERE id = $1', [taskId]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.json({ message: 'Task deleted successfully' });
    } catch (err) {
        console.error('Error deleting task:', err);
        res.status(500).json({ error: 'Failed to delete task' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Test Cases:

// curl http://localhost:3000/tasks

// curl -X POST http://localhost:3000/tasks \
//      -H "Content-Type: application/json" \
//      -d '{"id": 1, "description": "Test task", "status": "incomplete"}'

// curl -X PUT http://localhost:3000/tasks/1 \
//      -H "Content-Type: application/json" \
//      -d '{"status": "complete"}'

// curl -X DELETE http://localhost:3000/tasks/1


import express from 'express';
import cors from 'cors';
import userRoutes from './routes/users.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors())

app.use("/", userRoutes)

// Routes
// app.post('/api/users', (req, res) => {
//     const { name, email } = req.body;

//     // Insert a new user into the database
//     connection.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (err, result) => {
//         if (err) {
//             console.error('Error creating user:', err);
//             res.status(500).json({ error: 'Failed to create user' });
//             return;
//         }
//         res.json({ id: result.insertId, name, email });
//     });
// });

// app.put('/api/users/:id', (req, res) => {
//     const { id } = req.params;
//     const { name, email } = req.body;

//     // Update a user in the database
//     connection.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id], (err, result) => {
//         if (err) {
//             console.error('Error updating user:', err);
//             res.status(500).json({ error: 'Failed to update user' });
//             return;
//         }
//         res.json({ id, name, email });
//     });
// });

// app.delete('/api/users/:id', (req, res) => {
//     const { id } = req.params;

//     // Delete a user from the database
//     connection.query('DELETE FROM users WHERE id = ?', [id], (err, result) => {
//         if (err) {
//             console.error('Error deleting user:', err);
//             res.status(500).json({ error: 'Failed to delete user' });
//             return;
//         }
//         res.json({ message: 'User deleted successfully' });
//     });
// });

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
import connection from '../db.js';

// Retrieve all users
export const getUsers = (req, res) => {
    // Retrieve all users from the database
    connection.query('SELECT * FROM users', (err, results) => {
        if (err) {
            console.error('Error retrieving users:', err);
            res.status(500).json({ error: 'Failed to retrieve users' });
            return;
        }
        res.json(results);
    });
};

export const addUsers = (req, res) => {
  const q =
    "INSERT INTO users(`nome`, `email`, `telefone`, `data_nascimento`) VALUES(?)";

  const values = [
    req.body.nome,
    req.body.email,
    req.body.telefone,
    req.body.data_nascimento,
  ];

  connection.query(q, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário criado com sucesso.");
  });
};


export const updateUsers = (req, res) => {
    const { id } = req.params;
    const { nome, email, telefone, data_nascimento } = req.body;

    // Update a user in the database
    connection.query('UPDATE users SET nome = ?, email = ?, telefone = ?, data_nascimento = ? WHERE id = ?', 
    [nome, email, telefone, data_nascimento, id], 
    (err, result) => {
        if (err) {
            console.error('Error updating user:', err);
            res.status(500).json({ error: 'Failed to update user' });
            return;
        }
        res.json('Usuário Atualizado!');
    });
};

export const deleteUser = (req, res) => {
    const { id } = req.params;

    // Delete a user from the database
    connection.query('DELETE FROM users WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error('Error deleting user:', err);
            res.status(500).json({ error: 'Failed to delete user' });
            return;
        }
        res.json('Usuário Deletado!');
    });
};
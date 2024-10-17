const express = require('express');

function createRouter(pool) {
	const router = express.Router();

	router.get('/all', async (req, res) => {
		try {
			const [rows] = await pool.query('SELECT * FROM all_transactions ORDER BY date_added DESC');
			res.json(rows);
		} catch (error) {
			console.error('Error fetching all transactions:', error);
			res.status(500).json({ error: 'Internal server error', details: error.message });
		}
	});

	router.post('/add', async (req, res) => {
		const { transaction_hash, address, date_added, type } = req.body;
		try {	
			const [rows] = await pool.query('INSERT INTO all_transactions (transaction_hash, address, date_added, type) VALUES (?, ?, ?, ?)', [transaction_hash, address, date_added, type]);
			res.json(rows);
		} catch (error) {
			console.error('Error adding transaction:', error);
			res.status(500).json({ error: 'Internal server error', details: error.message });
		}
	});

	router.delete('/delete', async (req, res) => {
		try {
			const [rows] = await pool.query('DELETE FROM all_transactions WHERE transaction_hash = ""');
			res.json(rows);
		}
		catch (error) {
			console.error('Error deleting transaction:', error);
			res.status(500).json({ error: 'Internal server error', details: error.message });
		}
	});


	return router;
}

module.exports = createRouter;
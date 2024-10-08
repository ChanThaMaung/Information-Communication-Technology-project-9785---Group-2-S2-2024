const express = require('express');

function createRouter(pool) {
	const router = express.Router();

	// GET - Fetch all emitters with optional filtering
	router.get('/all', async (req, res) => {
		const { project_name, date_bought, credit_amount } = req.query; // Change to req.query
		console.log("Received filters:", { project_name, date_bought, credit_amount });
		let query = 'SELECT * FROM emitter WHERE 1=1';
		const params = [];

		if (project_name) {
			query += ' AND project_name LIKE ?';
			params.push(`%${project_name}%`);
		}
		if (date_bought) { // Ensure date is formatted
			query += ' AND date_bought = ?';
			params.push(date_bought);
		}
		if (credit_amount) {
			query += ' AND credit_amount = ?';
			params.push(credit_amount);
		}

		try {
			const [rows] = await pool.query(query, params);
			res.json(rows);
		} catch (error) {
			console.error('Error fetching emitters:', error);
			res.status(500).json({ error: 'Internal server error', details: error.message });
		}
	});

	// GET - Fetch the number of all emitter transactions
	router.get('/count', async (req, res) => {
		try {
			const [rows] = await pool.query('SELECT COUNT(*) AS transaction_count FROM emitter');
			res.json(rows);
		} catch (error) {
			console.error('Error fetching emitter count:', error);
			res.status(500).json({ error: 'Internal server error', details: error.message });
		}
	});

	// GET - Fetch the number of unique emitter addresses 
	router.get('/addresses', async (req, res) => {
		try {
			const [rows] = await pool.query('SELECT COUNT(DISTINCT emitter_address) AS address_count FROM emitter');
			res.json(rows);
		} catch (error) {
			console.error('Error fetching unique emitter addresses:', error);
			res.status(500).json({ error: 'Internal server error', details: error.message });
		}
	});

	// GET - Fetch the total amount of verified credits bought
	router.get('/total', async (req, res) => {
		try {
			const [rows] = await pool.query('SELECT SUM(credit_amount) AS credit_count FROM emitter WHERE verification_status = "1"');
			res.json(rows);
		} catch (error) {
			console.error('Error fetching total verified credits:', error);
			res.status(500).json({ error: 'Internal server error', details: error.message });
		}
	});

	router.get('/credits-data', async (req, res) => {
		try {
			const [rows] = await pool.query('SELECT credit_amount, date_bought FROM emitter');
			res.json(rows);
		} catch (error) {
			console.error('Error fetching credits data:', error);
			res.status(500).json({ error: 'Internal server error', details: error.message });
		}
	});
	// GET - Fetch all unverified emitters
	router.get('/unverified', async (req, res) => {
		try {
			const [rows] = await pool.query('SELECT * FROM emitter WHERE verification_status = "0"');
			res.json(rows);
		} catch (error) {
			console.error('Error fetching emitters:', error);
			res.status(500).json({ error: 'Internal server error', details: error.message });
		}
	});

	// GET - Fetch a specific emitter by transaction hash
	router.get('/:txHash', async (req, res) => {
		const { txHash } = req.params;
		try {
			const [rows] = await pool.query('SELECT * FROM emitter WHERE transaction_hash = ?', [txHash]);
			res.json(rows);
		} catch (error) {
			console.error('Error fetching emitter:', error);
			res.status(500).json({ error: 'Internal server error', details: error.message });
		}
	});
	// POST - Create a new emitter
	router.post('/create', async (req, res) => {
		const { emitterAddress, project_name, credit_amount, date_bought, verification_status, prev_tx, transaction_hash } = req.body;
		try {
			await pool.query(
				'INSERT INTO emitter (emitter_address, project_name, credit_amount, date_bought, verification_status, prev_tx, transaction_hash) VALUES (?, ?, ?, ?, ?, ?, ?)',
				[emitterAddress, project_name, credit_amount, date_bought, verification_status, prev_tx, transaction_hash]
			);
			res.status(201).json({ emitterAddress, project_name, credit_amount, date_bought, verification_status, prev_tx, transaction_hash });
		} catch (error) {
			console.error('Error creating emitter:', error);
			res.status(500).json({ error: 'Internal server error', details: error.message });
		}
	});

	// PUT - Update an emitter
	router.put('/update/:txHash', async (req, res) => {
		const { txHash } = req.params;
		const { credit_amount, date_bought, verification_status, prev_tx, transaction_hash } = req.body;
		try {
			await pool.query(
				'UPDATE emitter SET credit_amount = ?, date_bought = ?, verification_status = ?, prev_tx = ?, transaction_hash = ? WHERE transaction_hash = ?',
				[credit_amount, date_bought, verification_status, prev_tx, transaction_hash, txHash]

			);
			res.json({ credit_amount, date_bought, verification_status, prev_tx, transaction_hash, txHash });
		} catch (error) {
			console.error('Error updating emitter:', error);
			res.status(500).json({ error: 'Internal server error', details: error.message });
		}
	});

	// DELETE - Remove an emitter
	router.delete('/delete/:txHash', async (req, res) => {
		const { txHash } = req.params;
		try {
			await pool.query('DELETE FROM emitter WHERE transaction_hash = ?', [txHash]);
			res.status(204).end();
		} catch (error) {
			console.error('Error deleting emitter:', error);
			res.status(500).json({ error: 'Internal server error', details: error.message });
		}
	});

	// GET - Fetch the total amount of credit_amount from all emitters
	router.get('/total-credits', async (req, res) => {
		try {
			const [rows] = await pool.query('SELECT SUM(credit_amount) AS total_credits FROM emitter'); // Destructure to get rows
			console.log(rows[0]?.total_credits || 0);
			console.log("success");
			res.status(200).json({rows}); // Access total_credits from the first row
		} catch (error) {
			console.error('Error fetching total credits:', error);
			res.status(500).json({ error: 'Internal server error', details: error.message });
		}
	});

	return router;
}

module.exports = createRouter;
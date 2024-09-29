const express = require('express');

function createRouter(pool) {
	const router = express.Router();


	router.get('/get_address_unverified_credits/:address', async (req, res) => {
		const { address } = req.params;
		try {
			const [rows] = await pool.query('SELECT SUM(credit_amount) AS unverified_credits FROM emitter WHERE emitter_address = ? AND verification_status = "0"', [address]);
			res.json(rows);
		} catch (error) {
			console.error('Error fetching unverified credits by address:', error);
			res.status(500).json({ error: 'Internal server error', details: error.message });
		}
	});
	router.get('/get_total_trans/:address', async (req, res) => {
		const { address } = req.params;
		try {
			const [rows] = await pool.query('SELECT * FROM emitter WHERE emitter_address = ?', [address]);
			res.json(rows);
		} catch (error) {
			console.error('Error fetching total transactions:', error);
			res.status(500).json({ error: 'Internal server error', details: error.message });
		}
	});

	router.get('/get_address_verified_credits/:address', async (req, res) => {
		const { address } = req.params;
		try {
			const [rows] = await pool.query('SELECT SUM(credit_amount) AS verified_credits FROM emitter WHERE emitter_address = ? AND verification_status = "1"', [address]);
			res.json(rows);
		} catch (error) {
			console.error('Error fetching verified credits by address:', error);
			res.status(500).json({ error: 'Internal server error', details: error.message });	
		}
	});
	
	router.get('/get_total_credits/:address', async (req, res) => {
		const { address } = req.params;
		try {
			const [rows] = await pool.query('SELECT SUM(credit_amount) AS total_credits FROM emitter WHERE emitter_address = ?', [address]);
			res.json(rows);
		} catch (error) {
			console.error('Error fetching total credits by address:', error);
			res.status(500).json({ error: 'Internal server error', details: error.message });
		}
	});
	router.get('/yearly_average/:address', async (req, res) => {
		const { address } = req.params;
		try {
			const [rows] = await pool.query('SELECT AVG(credit_amount) AS yearly_average FROM emitter WHERE emitter_address = ?', [address]);
			res.json(rows);
		} catch (error) {
			console.error('Error fetching yearly average:', error);
			res.status(500).json({ error: 'Internal server error', details: error.message });
		}
	});

	router.get('/get_credits_by_year/:address', async (req, res) => {
		const { address } = req.params;
		try {
			const currentYear = new Date().getFullYear();
			const startDate = new Date(`${currentYear}-01-01`);
			const endDate = new Date(`${currentYear}-12-31`);
			
			const [rows] = await pool.query(
				'SELECT SUM(credit_amount) AS total_credits FROM emitter WHERE emitter_address = ? AND date_bought BETWEEN ? AND ?',
				[address, startDate, endDate]
			);
			res.json(rows);
		} catch (error) {
			console.error('Error fetching total credits by address:', error);
			res.status(500).json({ error: 'Internal server error', details: error.message });
		}
	});
		
	router.get('/address/:address', async (req, res) => {
		const { address } = req.params;
		try {	
			const currentYear = new Date().getFullYear();
			const startDate = new Date(`${currentYear}-01-01`);
			const endDate = new Date(`${currentYear}-12-31`);
			
			const [rows] = await pool.query(
				'SELECT * FROM emitter WHERE emitter_address = ? AND date_bought BETWEEN ? AND ? ORDER BY date_bought ASC',
				[address, startDate, endDate]
			);
			res.json(rows);
		} catch (error) {
			console.error('Error fetching emitter:', error);
			res.status(500).json({ error: 'Internal server error', details: error.message });
		}
	});

	router.get('/verified/address/:address', async (req, res) => {
		const { address } = req.params;
		try {
			const [rows] = await pool.query('SELECT * FROM emitter WHERE emitter_address = ?', [address]);
			res.json(rows);
		} catch (error) {
			console.error('Error fetching emitter:', error);
			res.status(500).json({ error: 'Internal server error', details: error.message });
		}
	});
	router.get('/verified-count', async (req, res) => {
		try {
			const [rows] = await pool.query('SELECT COUNT(*) AS verified_count FROM emitter WHERE verification_status = "1"');
			res.json(rows);
		} catch (error) {
			console.error('Error fetching verified emitter:', error);
			res.status(500).json({ error: 'Internal server error', details: error.message });
		}
	});

	router.get('/verified/count', async (req, res) => {
		try {
			const [rows] = await pool.query('SELECT SUM(credit_amount) AS verified_credits FROM emitter WHERE verification_status = "1"');
			res.json(rows);
		} catch (error) {
			console.error('Error fetching verified emitter count:', error);
			res.status(500).json({ error: 'Internal server error', details: error.message });
		}
	});
	// GET - Fetch all emitters
	router.get('/all', async (req, res) => {
		try {
			const [rows] = await pool.query('SELECT * FROM emitter');
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

	return router;
}

module.exports = createRouter;
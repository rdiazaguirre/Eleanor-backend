const mongoose = require('mongoose');

exports.connectMongoDB = (hostname) => {
	const host = hostname;
	const options = {
		useNewUrlParser: true,
		useUnifiedTopology: true
	}
	const conn = mongoose.connect(host, options).then(
		(conn) => {
			console.info(`MongoDB connected: ${conn.connection.host}`.cyan.bold);
		},
		err => {
			console.error(`Error: ${err.message}`.red);
			console.warn(`Retrying to connected ${hostname}`.cyan.bold);
			this.connectMongoDB(hostname);
		}
	)
}
const app = require('./app.js');
const { PORT = 9090 } = process.env;

exports.app.listen(PORT, () => console.log(`Listening on ${PORT}...`));


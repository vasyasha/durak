import { PORT } from './config/config.js';
import app from './app.js';


app.listen(PORT, () => {
	console.log(`Server successfully started at http://localhost:${PORT}`);
});
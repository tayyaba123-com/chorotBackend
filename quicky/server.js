import app from './src/app.js';
import "dotenv/config";
import { connectToDB } from './src/config/database.js';



const PORT = process.env.PORT

const startServer = async () => {

    try {
        await connectToDB();
        
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }

    catch (error) {
        console.log( 'Failed to start server:', error);
        process.exit(1);
    }
}


startServer();
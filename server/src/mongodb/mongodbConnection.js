const mongoose = require('mongoose');
const dotenv = require('dotenv')

dotenv.config()

const uri = `mongodb+srv://${process.env.db_username}:${process.env.db_password}@stepforward.onyrs2l.mongodb.net/?retryWrites=true&w=majority&appName=StepForward`;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

const connectDB = async () => {
    try {
        // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
        await mongoose.connect(uri, clientOptions);
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (error) {
        console.error(`Error connecting to mongodb: ${error.message}`);
        // Ensures that the client will close when you finish/error
        await mongoose.disconnect();
    }
};

module.exports = connectDB;
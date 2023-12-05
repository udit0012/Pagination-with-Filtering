import mongoose from "mongoose"
import dotenv from "dotenv"
import fs from 'fs';
import User from "./User.js";

dotenv.config()

const mongoConnect = () => {
    try {
        
        mongoose.connect(process.env.MONGO_URI).then(() => { console.log("Connected to database successfully") })
    } catch (error) {
        console.log(error);
    }
    const importUsers=async()=> {
        try {
            // Read the JSON file
            fs.readFile('heliverse_mock_data.json', 'utf8',async(err,data)=>{
                const users = JSON.parse(data)
                console.log(users.length);
                for (const user of users) {
                    const userInstance = new User(user);
                    await userInstance.save();
                }
            });

            console.log('Users imported successfully.');
        } catch (error) {
            console.error('Error importing users:', error);
        }
    }

    // Run the import function
    // importUsers();
}



export default mongoConnect
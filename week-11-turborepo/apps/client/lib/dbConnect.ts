import mongoose from "mongoose";
let alreadyDone = false;
console.log("Checking for db connection");
console.log("Hello");

export async function ensureDbConnected() {
    if (alreadyDone) {
        return;
    }
    try{
        await mongoose.connect('mongodb+srv://danishbelals:Capricorn%4012345@cluster1.5sekt6s.mongodb.net/',
    // {   useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //     dbName: "NextJscourses" }
        
    );
    alreadyDone = true;

    }catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error; // Rethrow the error to propagate it to the caller
    }
   
    
    
    
}
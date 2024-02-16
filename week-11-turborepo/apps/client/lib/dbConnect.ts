import mongoose from "mongoose";
let alreadyDone = false;

export async function ensureDbConnected() {
    if (alreadyDone) {
        return;
    }
    alreadyDone = true;
    await mongoose.connect('mongodb+srv://danishbelals:Capricorn%4012345@cluster1.5sekt6s.mongodb.net/');
}
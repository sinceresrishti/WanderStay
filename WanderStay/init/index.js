
const mongoose = require("mongoose");
const { data: sampleListings } = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderStay";

main().then(() => {
    console.log("connected to DB");
}).catch((err) => {
    console.log(err);
})

async function main(){
    await mongoose.connect(MONGO_URL)
}

const initDB = async () => {
    await Listing.deleteMany({});  
    await Listing.insertMany(sampleListings);
    console.log("data was initialized");

}

initDB();
const mongoose= require("mongoose");
const intiData=require("./data.js");
const listing=require("../models/listing.js");

const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";
main()
.then((res)=>{
    console.log("connect to DB");
})
.catch((err)=>{
    console.log(err);
})

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB=async()=>{
    await listing.deleteMany({});
    await listing.insertMany(intiData.data);
    console.log("data was initialized")
};

initDB();
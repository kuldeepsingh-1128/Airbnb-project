const express=require("express");
const app=express();
const listing=require("./models/listing");
const methodOverride=require("method-override");
const ejsmate=require("ejs-mate");

const mongoose=require("mongoose");
const path=require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs',ejsmate);
app.use(express.static(path.join(__dirname,"/public")))

const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";
main().then((res)=>{
    console.log("connect to DB");
}).catch((err)=>{
    console.log(err);
})

async function main() {
    await mongoose.connect(MONGO_URL);
}


app.listen(8080,()=>{
    console.log("server is running");
})

app.get("/",(req,res)=>{
    res.send("hii, i am root");
})

//index route
app.get("/listing",async(req,res)=>{
    const alllisting= await listing.find({});
    res.render("./listing/index.ejs",{alllisting});
})

//new route
app.get("/listing/new",(req,res)=>{
    res.render("listing/new.ejs");
})

//show route
app.get("/listing/:id",async(req,res)=>{
    let {id}=req.params;
    const Listing=await listing.findById(id);

    res.render("listing/show.ejs",{Listing});
})

//create route
app.post("/listing",async(req,res)=>{
    const newlisting=new listing(req.body.listing);
    await newlisting.save();
    res.redirect("/listing");
})

//edit route
app.get("/listing/:id/edit",async(req,res)=>{
    let {id}=req.params;
    const Listing=await listing.findById(id);

    res.render("listing/edit.ejs",{Listing});
})

//update route
app.put("/listing/:id",async(req,res)=>{
    let {id}=req.params;
    await listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listing/${id}`);
})

//delete route
app.delete("/listing/:id",async(req,res)=>{
    let {id}=req.params;
    let deletedlisting = await listing.findByIdAndDelete(id);
    console.log(deletedlisting);
    res.redirect("/listing");
})


// app.get("/testlisting",async (req,res)=>{
//     let samplelisting=new listing({
//         title:"my new house",
//         discription:"low rent",
//         price:1200,
//         location:"jaipur",
//         country:"india"
//     })
//     await samplelisting.save();
//     console.log("sample is saved");
//     res.send("successsful testing..");
// })
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override")
const ejsMate = require("ejs-mate");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderStay";

main().then(() => {
    console.log("connected to DB");
}).catch((err) => {
    console.log(err);
})

async function main(){
    await mongoose.connect(MONGO_URL)
}

app.set("views engine", "ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));
  // ab agr hame styling ko views par apply karna hai to hame ek ek par jake change karne ki jarurat nhi hai, ham boilerplate me kar sakte hai

app.get("/", (req, res) => {
    res.send("Hi, I am root");
});

app.get("/testListing", async (req, res) => {
    let sampleListing = new Listing({
        title: "My New Villa",
        descriptioin: "By the beach",
        price: 1200,
        locaton: "Calangute, Goa",
        country:"India"
    });

    await sampleListing.save();
    console.log("sample was saved");
    res.send("successful testing");
});

// Index Route
app.get("/listings", async (req, res) =>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings});
})

// New Route
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
})

// Show Route
app.get("/listings/:id", async (req, res) => {
    let {id} = req.params; // extracting id
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", {listing});
})

// Create Route
app.post("/listings",async (req, res) => {

    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
    console.log(newListing);
})

// Edit Route
app.get("/listings/:id/edit", async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", {listing});
})

// Update Route
app.put("/listings/:id", async (req, res) => {
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
})

// Delete Route
app.delete("/listings/:id", async (req, res) =>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings")
})

app.listen(8080, () => {
    console.log("server is listening to port 8080")
});
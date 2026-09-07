const mongoose = require("mongoose");
const { type } = require("node:os");
const schema = mongoose.Schema;

const listingSchema = new schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    image: {
        filename: {
            type: String,
            default: "listingimage",
        },
        url: {
            type: String,
            default:"https://static.vecteezy.com/system/resources/thumbnails/049/855/347/small/nature-background-high-resolution-wallpaper-for-a-serene-and-stunning-view-photo.jpg",
            set:
                (v) =>
                    v === ""
                        ? "https://static.vecteezy.com/system/resources/thumbnails/049/855/347/small/nature-background-high-resolution-wallpaper-for-a-serene-and-stunning-view-photo.jpg"
                        : v,
        }
    },
    price: {
        type: Number
    },
    location: {
        type: String
    },
    country: {
        type: String
    }
})

const listing = mongoose.model("listing", listingSchema);
module.exports = listing;

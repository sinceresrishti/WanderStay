const properties = [
    {
        name: "Sunny Beach Villa",
        price: 2000,
        description: "A luxurious villa located near the beach, perfect for a family vacation.",
        image: "https://tap1.fkimg.com/media/vr-splice-j/04/ba/05/01.jpg",
    },
    {
        name: "Mountain Retreat",
        price: 1500,
        description: "A peaceful retreat in the mountains, ideal for nature lovers.",
        image: "https://th.bing.com/th/id/OIP.fVn93i0hhmHGKwfv84aX5QHaET?w=253&h=183&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    },
    {
        name: "City Center Apartment",
        price: 1200,
        description: "A modern apartment located in the heart of the city, close to shops and restaurants.",
        image: "https://th.bing.com/th/id/OIP.UrsvGQmUIQDu9-PmtalhowHaE8?w=269&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    },
    {
        name: "Lakeside Cottage",
        price: 1800,
        description: "A charming cottage by the lake, offering serene views and tranquility.",
        image: "https://newengland.com/wp-content/uploads/moosehead-lake-cabin-rentals-3.jpg",
    },
    {
        name: "Desert Oasis",
        price: 1250,
        description: "A unique oasis in the desert, providing an unforgettable experience.",
        image: "https://th.bing.com/th/id/OIP.Tdl6YSvTjECaGEcwEOvAbwHaEK?w=286&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    },
    {
        name: "Forest Cabin",
        price: 1500,
        description: "A cozy cabin nestled in the forest, perfect for a relaxing getaway.",
        image: "https://th.bing.com/th?id=OIP.cWV0zs-bF2gev1E2mn0L6QHaE8&w=306&h=204&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
    },
    {
        name: "Coastal Condo",
        price: 2200,
        description: "A stylish condo with ocean views, offering a luxurious seaside experience.",
        image: "https://th.bing.com/th?id=OIP.v1jMH-C4bT8Bm2pswwz7HQHaE8&w=305&h=204&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
    },
    {
        name: "Urban Loft",
        price: 2000,
        description: "A chic loft located in the heart of the city with stunning views, perfect for travelers seeking a blend of modern comfort and city life.",
        image: "https://th.bing.com/th?id=OIP.z9HW-i1TW4aYuiFRmait-wHaE8&w=306&h=204&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
    },
    {
        name: "Countryside Bungalow",
        price: 1000,
        description: "A peaceful bungalow in the countryside, surrounded by lush greenery.",
        image: "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
        name: "Luxury Penthouse",
        price: 3500,
        description: "A top-floor penthouse with panoramic city views and luxurious amenities.",
        image: "https://images.pexels.com/photos/1974596/pexels-photo-1974596.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
        name: "Island Getaway",
        price: 2500,
        description: "An exclusive island property with breathtaking ocean views and private beaches.",
        image: "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
        name: "Suburban Home",
        price: 1400,
        description: "A family-friendly home in a quiet suburban neighborhood.",
        image: "https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=1200",
    }


];


const propertyList = document.getElementById("propertyList");
const searchInput = document.getElementById("searchInput");
const priceFilter = document.getElementById("priceFilter");

function displayProperties(data) {
    propertyList.innerHTML = "";
    data.forEach((property) => {
        const col = document.createElement("div");
        col.className = "col-md-4";
        col.innerHTML = `
            <div class="property-card">
                <img src="${property.image}" alt="${property.name}">
                <div class="card-body">
                    <h5>${property.name}</h5>
                    <p class="price">${property.price}₹ per night</p>
                    <button class="btn btn-primary btn-sm" onclick="showDetails('${property.name}')">View Details</button>
                </div>
            </div>
        `;
        propertyList.appendChild(col);
    });
}

function filterProperties() {
    let filtered = properties;

    const searchText = searchInput.value.toLowerCase();
    if (searchText) {
        filtered = filtered.filter((p) => p.name.toLowerCase().includes(searchText));
    }

    const priceRange = priceFilter.value;
    if (priceRange === "low") {
        filtered = filtered.filter((p) => p.price < 1500);
    } else if (priceRange === "mid") {
        filtered = filtered.filter((p) => p.price >= 1500 && p.price <= 2000);
    } else if (priceRange === "high") {
        filtered = filtered.filter((p) => p.price > 2000);
    }

    displayProperties(filtered);
}

function showDetails(name) {
    const property = properties.find((p) => p.name === name);
    if (property) {
        document.getElementById("modalImage").src = property.image;
        document.getElementById("modalName").textContent = property.name;
        document.getElementById("modalDescription").textContent = property.description;
        document.getElementById("modalPrice").textContent = `${property.price}₹ per night`;

        const modal = new bootstrap.Modal(document.getElementById("propertyModal"));
        modal.show();
    }
}

searchInput.addEventListener("input", filterProperties);
priceFilter.addEventListener("change", filterProperties);

displayProperties(properties);

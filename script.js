/* ==========================================
        CARLO RENTAL
        BOOKING SYSTEM
========================================== */

// ==========================================
// FORM ELEMENTS
// ==========================================

const carSelect = document.getElementById("car");
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const flightInput = document.getElementById("flight");

const pickupDate = document.getElementById("pickupDate");
const returnDate = document.getElementById("returnDate");

const pickupTime = document.getElementById("pickupTime");
const returnTime = document.getElementById("returnTime");

const pickupLocation = document.getElementById("pickupLocation");
const returnLocation = document.getElementById("returnLocation");

const pickupOther = document.getElementById("pickupOther");
const returnOther = document.getElementById("returnOther");

const messageInput = document.getElementById("message");

// ==========================================
// SUMMARY
// ==========================================

const summaryCar = document.getElementById("summaryCar");
const summaryDays = document.getElementById("summaryDays");
const summaryRental = document.getElementById("summaryRental");
const summaryPrice = document.getElementById("summaryPrice");

const priceDay = document.getElementById("priceDay");
const carImage = document.getElementById("carImage");

const bookBtn = document.getElementById("bookBtn");

// ==========================================
// RENTAL PRICES
// ==========================================

const prices = {

    "Baleno Automatic":1700,

    "Baleno Manual":1500,

    "Swift Automatic":1600,

    "Swift Manual":1200,

    "Hyundai i20 Automatic":1800,

    "Hyundai i20 Manual":1500,

    "Swift Dzire Automatic":1800,

    "Swift Dzire Manual":1500,

    "Fronx":2200,

    "Thar Automatic":4000,

    "Thar Manual":3500,

    "Innova Crysta":3700

};

// ==========================================
// CAR IMAGES
// ==========================================

const images = {

    "Baleno Automatic":"images/baleno-auto.jpg",

    "Baleno Manual":"images/baleno-manual.jpg",

    "Swift Automatic":"images/swift-auto.jpg",

    "Swift Manual":"images/swift-manual.jpg",

    "Hyundai i20 Automatic":"images/i20-auto.jpg",

    "Hyundai i20 Manual":"images/i20-manual.jpg",

    "Fronx":"images/fronx.jpg",

    "Swift Dzire Automatic":"images/swiftdzire-auto.jpg",

    "Swift Dzire Manual":"images/swiftdzire-manual.jpg",

    "Thar Automatic":"images/thar-automatic.jpg",
    
    "Thar Manual":"images/thar-manual.jpg",
    
    "Innova Crysta":"images/innova-crysta.jpg"

};

// ==========================================
// CONSTANTS
// ==========================================

const PICKUP_DROP_CHARGE = 1000;

// ==========================================
// UPDATE CAR
// ==========================================

function updateCarInfo(){

    const car = carSelect.value;

    summaryCar.textContent = car;

    priceDay.textContent =
        "₹" + prices[car].toLocaleString() + " / Day";

    carImage.src = images[car];

    calculateBooking();

}

// ==========================================
// CALCULATE BOOKING
// ==========================================

function calculateBooking(){

    if(!pickupDate.value || !returnDate.value){

        summaryDays.textContent = "Select Dates";

        summaryRental.textContent = "₹0";

        summaryPrice.textContent = "₹0";

        return;

    }

    let start = new Date(pickupDate.value);

    let end = new Date(returnDate.value);

    let diff = end.getTime() - start.getTime();

    let days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    if(days <= 0){

        days = 1;

    }

    // Extra day after 09:00 

    if(returnTime.value > "09:00"){

        days++;

    }
    // Extra rental day for pickup before 07:00 

    if(pickupTime.value < "07:00"){

    days++;

    }

    const rentalAmount = prices[carSelect.value] * days;

    const total = rentalAmount + PICKUP_DROP_CHARGE;

    summaryDays.textContent =
        days + " Day(s)";

    summaryRental.textContent =
        "₹" + rentalAmount.toLocaleString();

    summaryPrice.textContent =
        "₹" + total.toLocaleString();

}
// ==========================================
// LIVE EVENT LISTENERS
// ==========================================

carSelect.addEventListener("change", updateCarInfo);

pickupDate.addEventListener("change", calculateBooking);

returnDate.addEventListener("change", calculateBooking);

pickupTime.addEventListener("change", calculateBooking);

returnTime.addEventListener("change", calculateBooking);

pickupLocation.addEventListener("change", function(){

    if(this.value === "Other"){
        pickupOther.style.display = "block";
    }else{
        pickupOther.style.display = "none";
        pickupOther.value = "";
    }

});

returnLocation.addEventListener("change", function(){

    if(this.value === "Other"){
        returnOther.style.display = "block";
    }else{
        returnOther.style.display = "none";
        returnOther.value = "";
    }

});

// ==========================================
// BOOK NOW BUTTONS
// ==========================================

document.querySelectorAll(".book-btn").forEach((button)=>{

    button.addEventListener("click",function(){

        carSelect.value = this.dataset.car;

        updateCarInfo();

        document.getElementById("booking").scrollIntoView({

            behavior:"smooth"

        });

    });

});

// ==========================================
// VALIDATE BOOKING
// ==========================================

function validateBooking(){

    if(nameInput.value.trim()===""){

        alert("Please enter your Full Name.");

        nameInput.focus();

        return false;

    }

    if(phoneInput.value.trim()===""){

        alert("Please enter your Mobile Number.");

        phoneInput.focus();

        return false;

    }

    if(!pickupDate.value){

        alert("Please select Pickup Date.");

        pickupDate.focus();

        return false;

    }

    if(!returnDate.value){

        alert("Please select Return Date.");

        returnDate.focus();

        return false;

    }

    return true;

}
// ==========================================
// CHECK AVAILABILITY (WHATSAPP)
// ==========================================

bookBtn.addEventListener("click", function (e) {

    e.preventDefault();

    if (!validateBooking()) return;

    const message =
`🚗 CARLO RENTAL - Booking Enquiry

👤 Name: ${nameInput.value}

📞 Mobile: ${phoneInput.value}

🚘 Car: ${carSelect.value}

📅 Pickup Date: ${pickupDate.value}
🕘 Pickup Time: ${pickupTime.value}

📅 Return Date: ${returnDate.value}
🕘 Return Time: ${returnTime.value}

📍 Pickup Location: ${
    pickupLocation.value === "Other"
    ? pickupOther.value
    : pickupLocation.value
}

📍 Return Location: ${
    returnLocation.value === "Other"
    ? returnOther.value
    : returnLocation.value
}

✈️ Flight Number: ${flightInput.value || "Not Provided"}

📝 Special Request:
${messageInput.value || "None"}

💰 Estimated Total: ${summaryPrice.textContent}

Please check availability.`;

    const whatsappUrl =
        "https://wa.me/919762862683?text=" +
        encodeURIComponent(message);

    window.open(whatsappUrl, "_blank");

});
// ==========================================
// INITIALIZE WEBSITE
// ==========================================

// Set default car details
updateCarInfo();

// Calculate booking if dates already exist
calculateBooking();
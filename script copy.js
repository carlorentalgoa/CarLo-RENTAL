/* ==========================================
        CARLO RENTAL V2
        BOOKING SYSTEM
========================================== */

// ==========================
// FORM ELEMENTS
// ==========================

const carSelect = document.getElementById("car");
const pickupDate = document.getElementById("pickupDate");
const returnDate = document.getElementById("returnDate");
const pickupTime = document.getElementById("pickupTime");
const returnTime = document.getElementById("returnTime");

const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const flightInput = document.getElementById("flight");

const pickupLocation = document.getElementById("pickupLocation");
const returnLocation = document.getElementById("returnLocation");

const messageInput = document.getElementById("message");

// ==========================
// BOOKING SUMMARY
// ==========================

const summaryCar = document.getElementById("summaryCar");
const summaryDays = document.getElementById("summaryDays");
const summaryRental = document.getElementById("summaryRental");
const summaryPrice = document.getElementById("summaryPrice");

const priceDay = document.getElementById("priceDay");
const carImage = document.getElementById("carImage");
const paymentModal = new bootstrap.Modal(document.getElementById("paymentModal"));

const modalBookingId = document.getElementById("modalBookingId");
const modalCar = document.getElementById("modalCar");
const modalDays = document.getElementById("modalDays");
const modalTotal = document.getElementById("modalTotal");
const modalPaymentType = document.getElementById("modalPaymentType");
const modalPayable = document.getElementById("modalPayable");

// ==========================
// PAYMENT
// ==========================

const advancePayment = document.getElementById("advancePayment");
const fullPayment = document.getElementById("fullPayment");

const advanceAmount = document.getElementById("advanceAmount");
const balanceAmount = document.getElementById("balanceAmount");
const fullAmount = document.getElementById("fullAmount");

const bookBtn = document.getElementById("bookBtn");

// ==========================
// RENTAL PRICES
// ==========================

const prices = {

    "Baleno Automatic":1800,

    "Baleno Manual":1700,

    "Swift Automatic":1700,

    "Swift Manual":1600,

    "Fronx":2200,

    "Innova Crysta":3500

};

// ==========================
// CAR IMAGES
// ==========================

const images = {

    "Baleno Automatic":"images/baleno-auto.jpg",

    "Baleno Manual":"images/baleno-manual.jpg",

    "Swift Automatic":"images/swift-auto.jpg",

    "Swift Manual":"images/swift-manual.jpg",

    "Fronx":"images/fronx.jpg",

    "Innova Crysta":"images/innova-crysta.jpg"

};

// ==========================
// FIXED CHARGES
// ==========================

const PICKUP_DROP_CHARGE = 1000;

const ADVANCE_PERCENTAGE = 20;

// ==========================
// PAGE LOAD
// ==========================

updateCarInfo();
/* ==========================================
        UPDATE CAR INFORMATION
========================================== */

function updateCarInfo(){

    const car = carSelect.value;

    summaryCar.textContent = car;

    priceDay.textContent =
        "₹" + prices[car].toLocaleString() + " / Day";

    carImage.src = images[car];

    calculateBooking();

}

/* ==========================================
        CALCULATE BOOKING
========================================== */

function calculateBooking(){

    // No dates selected
    if(!pickupDate.value || !returnDate.value){

        summaryDays.textContent = "Select Dates";

        summaryRental.textContent = "₹0";

        summaryPrice.textContent = "₹0";

        advanceAmount.textContent = "Pay ₹0 Now";

        balanceAmount.textContent = "Remaining ₹0 at Pickup";

        fullAmount.textContent = "Pay ₹0 Now";

        return;

    }

    // Date Difference

    let start = new Date(pickupDate.value);

    let end = new Date(returnDate.value);

    let diff =
        end.getTime() - start.getTime();

    let days =
        Math.ceil(diff / (1000 * 60 * 60 * 24));

    if(days <= 0){

        days = 1;

    }

    // Extra Day Rule

    if(returnTime.value !== "09:00 AM"){

        days++;

    }

    summaryDays.textContent =
        days + " Day(s)";

    // Rental Amount

    const rentalAmount =
        prices[carSelect.value] * days;

    // Total

    const total =
        rentalAmount + PICKUP_DROP_CHARGE;

    // Advance

    const advance =
        Math.round(total * (ADVANCE_PERCENTAGE / 100));

    // Remaining

    const balance =
        total - advance;

    // Update Summary

    summaryRental.textContent =
        "₹" + rentalAmount.toLocaleString();

    summaryPrice.textContent =
        "₹" + total.toLocaleString();

    advanceAmount.textContent =
        "Pay ₹" + advance.toLocaleString() + " Now";

    balanceAmount.textContent =
        "Remaining ₹" + balance.toLocaleString() + " at Pickup";

    fullAmount.textContent =
        "Pay ₹" + total.toLocaleString() + " Now";

}
/* ==========================================
        LIVE EVENT LISTENERS
========================================== */

// Change Car
carSelect.addEventListener("change", updateCarInfo);

// Pickup Date
pickupDate.addEventListener("change", calculateBooking);

// Return Date
returnDate.addEventListener("change", calculateBooking);

// Pickup Time
pickupTime.addEventListener("change", calculateBooking);

// Return Time
returnTime.addEventListener("change", calculateBooking);

/* ==========================================
        BOOK NOW BUTTONS
========================================== */

document.querySelectorAll(".book-btn").forEach((button)=>{

    button.addEventListener("click",function(){

        carSelect.value = this.dataset.car;

        updateCarInfo();

        document.getElementById("booking").scrollIntoView({

            behavior:"smooth"

        });

    });

});

/* ==========================================
        PAYMENT OPTION
========================================== */

advancePayment.addEventListener("change",function(){

    if(this.checked){

        bookBtn.innerHTML =
        '<i class="bi bi-shield-lock-fill"></i> Pay 20% Advance';

    }

});

fullPayment.addEventListener("change",function(){

    if(this.checked){

        bookBtn.innerHTML =
        '<i class="bi bi-credit-card-fill"></i> Pay Full Amount';

    }

});

/* ==========================================
        DEFAULT BUTTON
========================================== */

bookBtn.innerHTML =
'<i class="bi bi-shield-lock-fill"></i> Pay 20% Advance';

/* ==========================================
        INITIAL LOAD
========================================== */

updateCarInfo();
/* ==========================================
        BOOKING VALIDATION
========================================== */

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

/* ==========================================
        CREATE BOOKING OBJECT
========================================== */

function createBooking(){

    const total = Number(

        summaryPrice.innerText.replace(/[₹,]/g,"")

    );

    const advance = Math.round(total * 0.20);

    const balance = total - advance;

    return{

        bookingId:"CR"+Date.now(),

        customer:nameInput.value.trim(),

        phone:phoneInput.value.trim(),

        flight:flightInput.value.trim(),

        car:carSelect.value,

        pickupDate:pickupDate.value,

        returnDate:returnDate.value,

        pickupTime:pickupTime.value,

        returnTime:returnTime.value,

        pickupLocation:pickupLocation.value,

        returnLocation:returnLocation.value,

        rentalDays:summaryDays.innerText,

        rentalAmount:summaryRental.innerText,

        totalAmount:total,

        advanceAmount:advance,

        balanceAmount:balance,

        paymentType:advancePayment.checked
            ? "20% Advance"
            : "Full Payment",

        specialRequest:messageInput.value.trim()

    };

}
/* ==========================================
        PROCEED TO PAYMENT
========================================== */

bookBtn.addEventListener("click", function () {

    if (!validateBooking()) return;

    const booking = createBooking();

    modalBookingId.innerHTML = booking.bookingId;

    modalCar.innerHTML = booking.car;

    modalDays.innerHTML = booking.rentalDays;

    modalTotal.innerHTML =
    "₹" + booking.totalAmount.toLocaleString();

    modalPaymentType.innerHTML =
    booking.paymentType;

    if (booking.paymentType === "20% Advance") {

        modalPayable.innerHTML =
        "₹" + booking.advanceAmount.toLocaleString();

    } else {

        modalPayable.innerHTML =
        "₹" + booking.totalAmount.toLocaleString();

    }

    paymentModal.show();

    document.getElementById("payNowBtn").onclick = async function () {

    const amount =
        booking.paymentType === "20% Advance"
            ? booking.advanceAmount
            : booking.totalAmount;

    try {

    const response = await fetch("http://localhost:5000/create-order", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            amount: amount
        })
    });

    const order = await response.json();

    const options = {
        key: "rzp_test_TCvV4H4dvpb5U7",
        amount: order.amount,
        currency: order.currency,
        name: "CARLO RENTAL",
        description: "Self Drive Car Booking",
        order_id: order.id,

        handler: async function (response) {

            const verify = await fetch("http://localhost:5000/verify-payment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(response)
            });

            const result = await verify.json();

            if (result.success) {
                alert("✅ Payment Successful!");
                paymentModal.hide();
            } else {
                alert("❌ Payment Verification Failed");
            }
        },

        theme: {
            color: "#ffc107"
        }
    };

    const rzp = new Razorpay(options);
    rzp.open();

} catch (err) {

    alert(err.message);
    console.log(err);

}
    const options = {
        key: "rzp_test_TCtIYzBCnA87uV",
        amount: order.amount,
        currency: order.currency,
        name: "CARLO RENTAL",
        description: "Self Drive Car Booking",
        order_id: order.id,

        handler: async function (response) {

            const verify = await fetch("http://localhost:5000/verify-payment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(response)
            });

            const result = await verify.json();

            if (result.success) {
                alert("✅ Payment Successful!");
                paymentModal.hide();
            } else {
                alert("❌ Payment Verification Failed");
            }
        },

        theme: {
            color: "#ffc107"
        }
    };

    const rzp = new Razorpay(options);
    rzp.open();
};

});

/* ==========================================
        START WEBSITE
========================================== */

 updateCarInfo();

calculateBooking();
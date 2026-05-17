// Auto-detect user's own IP location on page load
window.onload = async () => {
    const autoBox = document.getElementById("autoMessage");

    try {
        const response = await axios.get("https://ipapi.co/json/");
        const data = response.data;

        autoBox.style.display = "block";
        autoBox.innerHTML = `Welcome! It looks like you're visiting from 
        <strong>${data.city}, ${data.country_name}</strong>.`;
    } catch (error) {
        autoBox.style.display = "block";
        autoBox.innerHTML = "Could not auto-detect your location.";
    }
};

// Trim whitespace from input on change
document.getElementById("ipInput").addEventListener("input", function () {
    this.value = this.value.trim();
});

//on form submit, prevent default and perform IP lookup
document.getElementById("lookupForm").addEventListener("submit", (e) => {
    e.preventDefault();
    lookupIP();
});


// IP lookup
async function lookupIP() {
    const ip = document.getElementById("ipInput").value.trim();
    const resultBox = document.getElementById("result");

    if (!ip) {
        resultBox.style.display = "block";
        resultBox.innerHTML = "<p>Please enter an IP address.</p>";
        return;
    }

    try {
        const response = await axios.get(`https://ipapi.co/${ip}/json/`);
        const data = response.data;

        // UK warning
        const warningBox = document.getElementById("notInUK");
        if (data.country_code !== "GB") {
            warningBox.style.display = "block";
            warningBox.textContent = "Warning: This IP address is outside the United Kingdom.";
        } else {
            warningBox.style.display = "none";
        }
        resultBox.style.display = "block";
        resultBox.innerHTML = `
            <p><span class="label">IP:</span> ${data.ip}</p>
            <p><span class="label">City:</span> ${data.city}</p>
            <p><span class="label">Region:</span> ${data.region}</p>
            <p><span class="label">Country:</span> ${data.country_name}</p>
            <p><span class="label">Postal Code:</span> ${data.postal}</p>
            <p><span class="label">Latitude:</span> ${data.latitude}</p>
            <p><span class="label">Longitude:</span> ${data.longitude}</p>
            <p><span class="label">Timezone:</span> ${data.timezone}</p>
            <p><span class="label">Currency:</span> ${data.currency_name}</p>
            <p><span class="label">Population:</span> ${data.country_population}</p>
            <p><span class="label">Area:</span> ${data.country_area} km²</p>
            <p><span class="label">Organisation:</span> ${data.org}</p>
        `;
    } catch (error) {
        resultBox.style.display = "block";
        resultBox.innerHTML = "<p>Error fetching data. Check the IP address.</p>";
    }
}

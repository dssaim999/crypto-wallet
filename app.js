// পপ-আপের ফাংশন
function openModal(action) {
    document.getElementById('modalTitle').innerText = action;
    document.getElementById('actionModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('actionModal').style.display = 'none';
}

function confirmAction() {
    let amount = document.getElementById('amountInput').value;
    if(amount > 0) {
        alert("Success! " + amount + " processing.");
        closeModal();
    } else {
        alert("Please enter a valid amount.");
    }
}

// প্রাইস আপডেটের ফাংশন
let previousPrices = {};
async function getPrice(symbol, id) {
    try {
        let res = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}USDT`);
        let data = await res.json();
        let newPrice = parseFloat(data.price);
        let element = document.getElementById(id);
        if (previousPrices[id] !== undefined) {
            if (newPrice > previousPrices[id]) element.className = "price price-up";
            else if (newPrice < previousPrices[id]) element.className = "price price-down";
        }
        element.innerText = '$' + newPrice.toFixed(2);
        previousPrices[id] = newPrice;
    } catch(e) { console.log("Error"); }
}

function updateAll() {
    getPrice('BTC', 'BTC'); getPrice('ETH', 'ETH'); getPrice('BNB', 'BNB');
    getPrice('SOL', 'SOL'); getPrice('AVAX', 'AVAX'); getPrice('LTC', 'LTC');
    getPrice('TON', 'TON'); getPrice('TRX', 'TRX');
}

setInterval(updateAll, 1000);
updateAll();


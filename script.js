
const baseUrl = 'https://finnhub.io/api/v1';
const query = '/stock/recommendation?symbol=AAPL';
const quoteQuery = '/quote?symbol=AAPL';
const token = '&token=c9jdddaad3idg7p58lkg';


         

const entry = document.getElementById('imageCont');
const selectedTicker = document.getElementById('symbol')
entry.addEventListener('click', function onClick(){
var ticker = selectedTicker.value;
ticker = ticker.toUpperCase()
//to remove old canavas and allow for new chart
var oldcanv = document.getElementById('myChart');
removeMe.removeChild(oldcanv)
var newCanv = document.createElement('canvas');
newCanv.id = 'myChart';
removeMe.appendChild(newCanv)
fetchName(ticker)
fetchPrice(ticker)
fetchNews(ticker)
fetchRatings(ticker)
fetchYearlyChart(ticker)

month.style.opacity = '.2'
    annual.style.opacity = '.2'
    daily.style.opacity = '.7'
    weekly.style.opacity = '.2'
})

symbol.addEventListener('keypress', function onkeydown(event){
    if (event.key === "Enter"){
        event.preventDefault();
        entry.click()

    }
})
function fetchName(ticker) {
    console.log('start fetchName');
    fetch(`${baseUrl}/stock/profile2?symbol=${ticker}${token}`).then(response => {
        return response.json();
    }).then(data => {
        console.log(data);
        nameCont.innerHTML = `<h1>${data.name}</h1>`
        logoCont.innerHTML = `<img src="${data.logo}" width=100% height=100%>`

    }).catch( error => {
        console.log(error)
    })
}



function fetchPrice(ticker) {
    console.log('fetchPrice');
    fetch(`${baseUrl}/quote?symbol=${ticker}${token}`).then(response => {
        return response.json();
    }).then(data => {
        console.log(data);
        var current = data.c
        current = +current.toFixed(2)
        priceNow.innerHTML = `$${current}`
        let change = data.d;
        change = +change.toFixed(2)
        let percentChange = data.dp;
        percentChange = +percentChange.toFixed(2);
        if (change > 0){
            dayChange.style.color = 'green';
            dayChange.innerHTML = `+${change} (${percentChange}%)`
        } else if (change < 0) {
            dayChange.style.color = 'red';
            dayChange.innerHTML = `${change} (${percentChange}%)`
        } else {
            dayChange.style.color = 'grey';
            dayChange.innerHTML = `${change} ${percentChange}%`
        }
        
       
        return currPrice = current
    }).catch( error => {
        console.log(error)
    }),
    fetch(`${baseUrl}/stock/metric?symbol=${ticker}&metric=all${token}`).then(response => {
        return response.json();
    }).then(data => {
        console.log(data);
        const diff = data.metric['52WeekHigh'] - data.metric['52WeekLow'];
        const position = currPrice - data.metric['52WeekLow'];
        const placement = 100 * position/diff;
        console.log(placement)
        currentPrice.style.left = `${placement}%`
        low.innerHTML = `$${data.metric['52WeekLow']}`
        high.innerHTML = `$${data.metric['52WeekHigh']}`
        
        currentPrice.innerHTML = `$${currPrice}`
        
    }).catch( error => {
        console.log(error)
    })
}
month.addEventListener('click', function onClick() {
    var ticker = selectedTicker.value;
    ticker = ticker.toUpperCase()
    fetchPrices(ticker, '13WeekPriceReturnDaily')
    daily.style.opacity = '.2'
    annual.style.opacity = '.2'
    weekly.style.opacity = '.2'
    this.style.opacity = '.7'
})
weekly.addEventListener('click', function onClick() {
    var ticker = selectedTicker.value;
    ticker = ticker.toUpperCase()
    fetchPrices(ticker, '5DayPriceReturnDaily')
    daily.style.opacity = '.2'
    annual.style.opacity = '.2'
    month.style.opacity = '.2'
    this.style.opacity = '.7'
})
annual.addEventListener('click', function onClick() {
    var ticker = selectedTicker.value;
    ticker = ticker.toUpperCase()
    fetchPrices(ticker, '52WeekPriceReturnDaily')
    daily.style.opacity = '.2'
    month.style.opacity = '.2'
    this.style.opacity = '.7'
    weekly.style.opacity = '.2'
})
daily.addEventListener('click', function onClick() {
    var ticker = selectedTicker.value;
    ticker = ticker.toUpperCase()
    fetchPrice(ticker)
    month.style.opacity = '.2'
    annual.style.opacity = '.2'
    this.style.opacity = '.7'
    weekly.style.opacity = '.2'
})
function fetchPrices(ticker,period) {
    fetch(`${baseUrl}/stock/metric?symbol=${ticker}&metric=all${token}`).then(response => {
        return response.json();
    }).then(data => {
        var periodReturn = data.metric[period];
        var oldPrice = currPrice/(1+(periodReturn/100))
        var priceDiff = currPrice - oldPrice;
        priceDiff = +priceDiff.toFixed(2)
        periodReturn = +periodReturn.toFixed(2);
        console.log(currPrice)
        console.log(periodReturn)
        console.log(oldPrice)
        console.log(priceDiff)
        if (priceDiff > 0){
            dayChange.style.color = 'green';
            dayChange.innerHTML = `+${priceDiff} (${periodReturn}%)`
        } else if (priceDiff < 0) {
            dayChange.style.color = 'red';
            dayChange.innerHTML = `${priceDiff} (${periodReturn}%)`
        } else {
            dayChange.style.color = 'grey';
            dayChange.innerHTML = `${priceDiff} ${periodReturn}%`
        }
    })
}
function fetchRatings(ticker) {
    console.log('fetchingRatings');
    fetch(`${baseUrl}/stock/recommendation?symbol=${ticker}${token}`).then(response => {
        return response.json();
    }).then(data => {
        console.log(data)
        let currentDenominator = Math.max(data[0].strongBuy,data[0].buy,data[0].hold,data[0].sell,data[0].strongSell)
        currentStrongBuyWidth = data[0].strongBuy/currentDenominator*100
        currentBuyWidth = data[0].buy/currentDenominator*100
        currentHoldWidth = data[0].hold/currentDenominator*100
        currentSellWidth = data[0].sell/currentDenominator*100
        currentStrongSellWidth = data[0].strongSell/currentDenominator*100
        console.log(currentStrongBuyWidth)
        currentStrongBuy.style.width = `${currentStrongBuyWidth}%`
        currentStrongBuy.innerHTML = `<p>${data[0].strongBuy}</p>`
        currentBuy.style.width = `${currentBuyWidth}%`
        currentBuy.innerHTML = `<p>${data[0].buy}</p>`
        currentHold.style.width = `${currentHoldWidth}%`
        currentHold.innerHTML = `<p>${data[0].hold}</p>`
        currentSell.style.width = `${currentSellWidth}%`
        currentSell.innerHTML = `<p>${data[0].sell}</p>`
        currentStrongSell.style.width = `${currentStrongSellWidth}%`
        currentStrongSell.innerHTML = `<p>${data[0].strongSell}</p>`

        let lastDenominator = Math.max(data[3].strongBuy,data[3].buy,data[3].hold,data[3].sell,data[3].strongSell)
        lastStrongBuyWidth = data[3].strongBuy/lastDenominator*100
        lastBuyWidth = data[3].buy/lastDenominator*100
        lastHoldWidth = data[3].hold/lastDenominator*100
        lastSellWidth = data[3].sell/lastDenominator*100
        lastStrongSellWidth = data[3].strongSell/lastDenominator*100
        console.log(lastStrongBuyWidth)
        lastStrongBuy.style.width = `${lastStrongBuyWidth}%`
        lastStrongBuy.innerHTML = `<p>${data[3].strongBuy}</p>`
        lastBuy.style.width = `${lastBuyWidth}%`
        lastBuy.innerHTML = `<p>${data[3].buy}</p>`
        lastHold.style.width = `${lastHoldWidth}%`
        lastHold.innerHTML = `<p>${data[3].hold}</p>`
        lastSell.style.width = `${lastSellWidth}%`
        lastSell.innerHTML = `<p>${data[3].sell}</p>`
        lastStrongSell.style.width = `${lastStrongSellWidth}%`
        lastStrongSell.innerHTML = `<p>${data[3].strongSell}</p>`
    })
}

function fetchNews(ticker) {
    console.log(fetchNews);
    const date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let lastMonth = date.getMonth();
    let day = date.getDate();
    if (month < 10){
        month = `0${month}`
    } else {
        month = month;
    }
    if (lastMonth < 10){
        lastMonth = `0${lastMonth}`
    } else {
        lastMonth = lastMonth;
    }
    if(day <10) {
        day = `0${day}`;
    } else {
        day = day;
    }
console.log(month)
    fetch(`${baseUrl}/company-news?symbol=${ticker}&from=${year}-${lastMonth}-${day}&to=${year}-${month}-${day}&metric=all${token}`).then(response => {
        return response.json();
    }).then(data => {
        console.log(data); 
        newsBox.innerHTML = `<p><a href=${data[0].url}>${data[0].headline}</a></p>
                            <p><a href=${data[1].url}>${data[1].headline}</a></p>
                            <p><a href=${data[2].url}>${data[2].headline}</a></p>
                            <p><a href=${data[3].url}>${data[3].headline}</a></p>
                            <p><a href=${data[4].url}>${data[4].headline}</a></p>
                            <p><a href=${data[5].url}>${data[5].headline}</a></p>`
        
    })
}



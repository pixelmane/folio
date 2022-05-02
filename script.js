const baseUrl = 'https://finnhub.io/api/v1';
const query = '/stock/recommendation?symbol=AAPL';
const quoteQuery = '/quote?symbol=AAPL';
const token = '&token=c9jdddaad3idg7p58lkg';



const entry = document.getElementById('imageCont');
const selectedTicker = document.getElementById('symbol')
entry.addEventListener('click', function onClick(){
var ticker = selectedTicker.value;
ticker = ticker.toUpperCase()
fetchName(ticker)
fetchPrice(ticker)
fetchNews(ticker)
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
        priceNow.innerHTML = `${current}`
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


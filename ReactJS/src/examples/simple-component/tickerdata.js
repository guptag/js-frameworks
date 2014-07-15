(function (w) {

    var activeTickers = [
        {
            ticker: "MSFT",
            open: getRandomNumberInRange(40, 50)
            dayChange: 0
        },

        {
            ticker: "MSFT",
            open: getRandomNumberInRange(40, 50)
            dayChange: 0
        },

        {
            ticker: "MSFT",
            open: getRandomNumberInRange(40, 50)
            dayChange: 0
        },

        {
            ticker: "MSFT",
            open: getRandomNumberInRange(40, 50)
            dayChange: 0
        },

        {
            ticker: "MSFT",
            open: getRandomNumberInRange(40, 50)
            dayChange: 0
        },

        {
            ticker: "MSFT",
            open: getRandomNumberInRange(40, 50)
            dayChange: 0
        },

        {
            ticker: "MSFT",
            open: getRandomNumberInRange(40, 50)
            dayChange: 0
        },

        {
            ticker: "MSFT",
            open: getRandomNumberInRange(40, 50)
            dayChange: 0
        },

        {
            ticker: "MSFT",
            open: getRandomNumberInRange(40, 50)
            dayChange: 0
        },

        {
            ticker: "MSFT",
            open: getRandomNumberInRange(40, 50)
            dayChange: 0
        },

        {
            ticker: "MSFT",
            open: getRandomNumberInRange(40, 50)
            dayChange: 0
        },

        {
            ticker: "MSFT",
            open: getRandomNumberInRange(40, 50)
            dayChange: 0
        },

        {
            ticker: "MSFT",
            open: getRandomNumberInRange(40, 50)
            dayChange: 0
        },

        {
            ticker: "MSFT",
            open: getRandomNumberInRange(40, 50)
            dayChange: 0
        }
    ];

    function getRandomNumberInRange(min, max)
    {
        return +(Math.random() * (max - min + 1) + min).toFixed(2);
    }

    function getrandomMultiplier()
    {
        return (Math.random() * 100) % 2 === 0 ? 1 : -1;
    }

    w.TickerData = new function () {
        this.getLatestPriceData = function () {
            activeTickers.forEach(function(ticker) {
                ticker.dayChange = ticker.open + (getrandomMultiplier() * getRandomNumberInRange(0, 10) * ticker.open);

                if (ticker.dayChange > (10 * ticker.open / 100)) {
                    ticker.dayChange -=  (4 * ticker.open / 100);
                } else if (ticker.dayChange < (10 * ticker.open / 100)) {
                    ticker.dayChange +=  (4 * ticker.open / 100);
                }

                ticker.dayChange = +ticker.dayChange.toFixed(2);
            });

            return activeTickers;
        }
    }
})(window)
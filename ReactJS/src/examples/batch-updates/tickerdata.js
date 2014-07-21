(function (w) {

    var activeTickers = [
        {
            symbol: "MSFT",
            open: getRandomNumberInRange(40, 50),
            dayChange: 0
        },

        {
            symbol: "GOOGL",
            open: getRandomNumberInRange(40, 50),
            dayChange: 0
        },

        {
            symbol: "LNKD",
            open: getRandomNumberInRange(40, 50),
            dayChange: 0
        },

        {
            symbol: "NFLX",
            open: getRandomNumberInRange(40, 50),
            dayChange: 0
        },

        {
            symbol: "FB",
            open: getRandomNumberInRange(40, 50),
            dayChange: 0
        },

        {
            symbol: "TWTR",
            open: getRandomNumberInRange(40, 50),
            dayChange: 0
        },

        {
            symbol: "YHOO",
            open: getRandomNumberInRange(40, 50),
            dayChange: 0
        },

        {
            symbol: "CRM",
            open: getRandomNumberInRange(40, 50),
            dayChange: 0
        },

        {
            symbol: "GE",
            open: getRandomNumberInRange(40, 50),
            dayChange: 0
        },

        {
            symbol: "GM",
            open: getRandomNumberInRange(40, 50),
            dayChange: 0
        },

        {
            symbol: "BBY",
            open: getRandomNumberInRange(40, 50),
            dayChange: 0
        },

        {
            symbol: "C",
            open: getRandomNumberInRange(40, 50),
            dayChange: 0
        },

        {
            symbol: "JPM",
            open: getRandomNumberInRange(40, 50),
            dayChange: 0
        },

        {
            symbol: "BAC",
            open: getRandomNumberInRange(40, 50),
            dayChange: 0
        }
    ];

    function getRandomNumberInRange(min, max)
    {
        return +(Math.random() * (max - min + 1) + min).toFixed(2);
    }

    function getrandomMultiplier()
    {
        return parseInt(Math.random() * 13) % 2 === 0 ? 1 : -1;
    }

    w.TickerData = new function () {
        this.getLatest = function () {
            activeTickers.forEach(function(ticker) {
                ticker.dayChange = (getrandomMultiplier() * getRandomNumberInRange(0, 1) * ((ticker.open + ticker.dayChange)/100));

                if (ticker.dayChange > (2 * ticker.open / 100)) {
                    ticker.dayChange -=  (0.5 * ticker.open / 100);
                } else if (ticker.dayChange < (2 * ticker.open / 100)) {
                    ticker.dayChange +=  (0.5 * ticker.open / 100);
                }

                ticker.open = +ticker.open.toFixed(2);
                ticker.dayChange = +ticker.dayChange.toFixed(2);
            });

            return activeTickers;
        }
    }
})(window)
export default class SearchService {
  static async fetchData() {
    // Simulate an async call
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));

    await delay(20);

    return [
      {
        type: "application",
        name: "calendar",
        icon: "https://static.thenounproject.com/png/2968387-200.png",
        image: "https://static.thenounproject.com/png/2968387-200.png",
        created: "7/22/2018",
        modified: "12/12/2018",
      },
      {
        type: "news",
        name: "california bart",
        icon: "https://static.thenounproject.com/png/179467-200.png",
        image: "https://static.thenounproject.com/png/179467-200.png",
        created: "11/8/2019",
        modified: "22/8/2019",
      },
      {
        type: "movies",
        name: "sharknedo",
        icon: "https://static.thenounproject.com/png/1605626-200.png",
        image: "https://static.thenounproject.com/png/1605626-200.png",
        created: "2/4/2019",
        modified: "4/6/2019",
      },
      {
        type: "application",
        name: "contacts",
        icon: "https://static.thenounproject.com/png/2966897-200.png",
        image: "https://static.thenounproject.com/png/2966897-200.png",
        created: "10/1/2004",
        modified: "4/6/2007",
      },
      {
        type: "application",
        name: "dictionary",
        icon: "https://static.thenounproject.com/png/1986154-200.png",
        image: "https://static.thenounproject.com/png/1986154-200.png",
        created: "11/1/2009",
        modified: "4/27/2012",
      },
      {
        type: "news",
        name: "cat stuck on tree",
        icon: "https://static.thenounproject.com/png/686705-200.png",
        image: "https://static.thenounproject.com/png/686705-200.png",
        created: "11/8/2009",
        modified: "11/8/2009",
      },
      {
        type: "application",
        name: "maps",
        icon: "https://static.thenounproject.com/png/1854991-200.png",
        image: "https://static.thenounproject.com/png/1854991-200.png",
        created: "1/2/2002",
        modified: "1/6/2017",
      },
      {
        type: "application",
        name: "mail",
        icon: "https://static.thenounproject.com/png/1914527-200.png",
        image: "https://static.thenounproject.com/png/1914527-200.png",
        created: "1/12/2012",
        modified: "1/22/2012",
      },
      {
        type: "application",
        name: "pointer",
        icon: "https://static.thenounproject.com/png/2042273-200.png",
        image: "https://static.thenounproject.com/png/2042273-200.png",
        created: "8/12/2018",
        modified: "8/9/2018",
      },
      {
        type: "movies",
        name: "forrest gump",
        icon: "https://static.thenounproject.com/png/469385-200.png",
        image: "https://static.thenounproject.com/png/469385-200.png",
        created: "2/12/2018",
        modified: "4/5/2019",
      },
      {
        type: "music",
        name: "stevie wonder",
        icon: "https://static.thenounproject.com/png/1311428-200.png",
        image: "https://static.thenounproject.com/png/1311428-200.png",
        created: "12/12/2018",
        modified: "12/30/2018",
      },
      {
        type: "application",
        name: "power point",
        icon: "https://static.thenounproject.com/png/963309-200.png",
        image: "https://static.thenounproject.com/png/963309-200.png",
        created: "3/2/1999",
        modified: "7/12/2019",
      },
      {
        type: "news",
        name: "new pacman coming out",
        icon: "https://static.thenounproject.com/png/2688310-200.png",
        image: "https://static.thenounproject.com/png/2688310-200.png",
        created: "11/2/2019",
        modified: "11/3/2019",
      },
      {
        type: "movies",
        name: "the dark knight",
        icon: "https://static.thenounproject.com/png/1414251-200.png",
        image: "https://static.thenounproject.com/png/1414251-200.png",
        created: "11/2/2008",
        modified: "5/3/2008",
      },
      {
        type: "music",
        name: "john mayer",
        icon: "https://static.thenounproject.com/png/2106061-200.png",
        image: "https://static.thenounproject.com/png/2106061-200.png",
        created: "1/12/2017",
        modified: "1/12/2018",
      },
      {
        type: "application",
        name: "itnues",
        icon: "https://static.thenounproject.com/png/2018242-200.png",
        image: "https://static.thenounproject.com/png/2018242-200.png",
        created: "1/9/2001",
        modified: "11/1/2019",
      },
    ];
  }
}

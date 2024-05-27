import { xml2json } from "xml-js";

export const commonFunctions = {
  fetchDataFromAnnict: async (year, season, title) => {
    const response = await fetch(
      `${
        import.meta.env.VITE_ANNICT_URL
      }?filter_season=${year}-${season}&filter_title=${title}&per_page=50&sort_watchers_count=desc`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
        },
      }
    );
    const data = response.json();
    return data;
  },
  generateYearRange: (start, end) => {
    const range = [];
    for (let year = start; year >= end; year--) {
      range.push(year);
    }
    return range;
  },
  fetchDataFromSyoboiByTID: async (tid) => {
    console.log("import.meta.env.PROD=", import.meta.env.PROD);
    console.log("import.meta.env.DEV=", import.meta.env.DEV);
    console.log("VITE_SYOBOI_URL:", import.meta.env.VITE_SYOBOI_URL);

    const domain =
      import.meta.env.PROD === true
        ? import.meta.env.VITE_SYOBOI_URL
        : "/syoboiapi";

    console.log("domain:", domain);

    const response = await fetch(
      `${domain}/db.php?Command=TitleLookup&TID=${tid}`,
      {
        headers: {
          "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
          "Access-Control-Allow-Origin": "*",
        },
      }
      // `/syoboiapi/db.php?Command=TitleLookup&TID=${tid}`
      // `${import.meta.env.VITE_SYOBOI_URL}/db.php?Command=TitleLookup&TID=${tid}`
    );

    const dataText = await response.text();
    const dataJsonText = xml2json(dataText, { compact: true, spaces: 4 });
    const dataJson = JSON.parse(dataJsonText);

    return dataJson;
  },
};

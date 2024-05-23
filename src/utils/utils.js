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
    const response = await fetch(
      `/syoboiapi/db.php?Command=TitleLookup&TID=${tid}`
    );

    const dataText = await response.text();
    const dataJsonText = xml2json(dataText, { compact: true, spaces: 4 });
    const dataJson = JSON.parse(dataJsonText);

    return dataJson;
  },
};

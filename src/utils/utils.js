export const commonFunctions = {
  fetchDataFromAnnict: async (year, season) => {
    const response = await fetch(
      `${
        import.meta.env.VITE_ANNICT_URL
      }?filter_season=${year}-${season}&per_page=50&sort_watchers_count=desc`,
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
};

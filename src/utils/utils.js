import { xml2json } from "xml-js";

export const commonFunctions = {
  generateYearRange: (start, end) => {
    const range = [];
    for (let year = start; year >= end; year--) {
      range.push(year);
    }
    return range;
  },
  // Annictから放送年・放送シーズン・タイトルで作品情報を検索
  fetchDataFromAnnict: async (year, season, title) => {
    const response = await fetch(
      `${
        import.meta.env.VITE_ANNICT_URL
      }/works?filter_season=${year}-${season}&filter_title=${title}&per_page=50&sort_watchers_count=desc`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
        },
      }
    );
    const data = response.json();
    return data;
  },
  // Annictから作品に紐付くキャスト情報を取得
  fetchCastDataFromAnnict: async (workId) => {
    const response = await fetch(
      `${
        import.meta.env.VITE_ANNICT_URL
      }/casts?filter_work_id=${workId}&per_page=50&sort_id=asc`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
        },
      }
    );
    const data = response.json();
    return data;
  },
  // Annictから作品に紐付くスタッフ情報を取得
  fetchStaffDataFromAnnict: async (workId) => {
    const response = await fetch(
      `${
        import.meta.env.VITE_ANNICT_URL
      }/staffs?filter_work_id=${workId}&per_page=50&sort_id=asc`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
        },
      }
    );
    const data = response.json();
    return data;
  },
  // Annictから作品の放送予定を取得
  fetchProgramDataFromAnnict: async (workId) => {

    const array=[9696];

    const response = await fetch(
      `${
        import.meta.env.VITE_ANNICT_URL
      }/me/programs?filter_work_ids=4681,75187&per_page=50&sort_id=asc`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
        },
      }
    );
    const data = response.json();
    return data;
  },
  fetchDataFromSyoboiByTID: async (tid) => {
    console.log("import.meta.env.PROD=", import.meta.env.PROD);
    console.log("import.meta.env.DEV=", import.meta.env.DEV);
    console.log("VITE_SYOBOI_URL:", import.meta.env.VITE_SYOBOI_URL);

    const domain =
      import.meta.env.PROD === true
        ? `${import.meta.env.VITE_PROD_URL}/syoboiapi`
        : `${import.meta.env.VITE_DEV_URL}/syoboiapi`;

    console.log("domain:", domain);

    const response = await fetch(
      // `${domain}/db.php?Command=TitleLookup&TID=${tid}`
      `/syoboiapi/db.php?Command=TitleLookup&TID=${tid}`
      // `${import.meta.env.VITE_SYOBOI_URL}/db.php?Command=TitleLookup&TID=${tid}`
    );

    const dataText = await response.text();
    const dataJsonText = xml2json(dataText, { compact: true, spaces: 4 });
    const dataJson = JSON.parse(dataJsonText);

    return dataJson;
  },
};

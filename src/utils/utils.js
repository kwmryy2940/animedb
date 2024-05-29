import { xml2json } from "xml-js";

export const commonFunctions = {
  generateYearRange: (start, end) => {
    const range = [];
    // range.push("");
    for (let year = start; year >= end; year--) {
      range.push(year);
    }
    return range;
  },
  // AnnictのOAtuh認証のアクセストークンを取得
  getAccessTokenOauth: async () => {
    const body = {
      client_id: import.meta.env.VITE_ANNICT_CRIENTID,
      client_secret: import.meta.env.VITE_ANNICT_CRIENTSECRET,
      grant_type: "authorization_code",
      redirect_uri: import.meta.env.VITE_ANNICT_URI,
      code: import.meta.env.VITE_ANNICT_CODE,
    };

    const response = await fetch(
      `${import.meta.env.VITE_ANNICT_URL}/oauth/token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    const data = response.json();
    return data;
  },

  // Annictから放送年・放送シーズン・タイトルで作品情報を検索
  fetchDataFromAnnict: async (year, season, title, page) => {
    let apiUrl = `/v1/works?filter_title=${title}&page=${page}&per_page=50&sort_watchers_count=desc&sort_season=desc`;

    console.log("year:",year);
    console.log("season:",season);

    // 放送年・放送シーズンどちらも選択されている場合のみ絞り込む
    if (year!==null || season!==null)
      apiUrl += `&filter_season=${year}-${season}`;

    const response = await fetch(
      `${
        import.meta.env.VITE_ANNICT_URL
      }${apiUrl}`,
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
      }/v1/casts?filter_work_id=${workId}&per_page=50&sort_id=asc`,
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
      }/v1/staffs?filter_work_id=${workId}&per_page=50&sort_id=asc`,
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
    const array = [4681];

    const response = await fetch(
      `${
        import.meta.env.VITE_ANNICT_URL
        // }/me/programs?filter_work_ids=${array}&per_page=50&sort_id=asc`,
      }/v1/me/programs?sort_started_at=desc&page=1&filter_started_at_gt=2016/05/05 02:00&access_token=${
        import.meta.env.VITE_ACCESS_TOKEN
      }`
      // {
      //   headers: {
      //     Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
      //   },
      // }
    );
    const data = response.json();
    return data;
  },
};

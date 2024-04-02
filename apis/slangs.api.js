export function generateApiUrl(path, queries) {
  let apiUrl = `http://localhost:3000/api/${path}`;

  if (queries) {
    const queryString = Object.entries(queries)
      .filter(([key, value]) => value !== undefined)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    if (queryString) {
      apiUrl += `?${queryString}`;
    }
  }

  return apiUrl;
}

export const getAllSlangs = async (getAllSlangConfig) => {
  const mySlangs = getAllSlangConfig?.mySlangs;
  const isApproved = getAllSlangConfig?.isApproved;
  try {
    let apiUrl = generateApiUrl("slangs", { mySlangs, isApproved });
    const res = await fetch(apiUrl, {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.log("Failed to get slangs", error);
  }
};

export const getSingleSlang = async (id) => {
  try {
    let apiUrl = `http://localhost:3000/api/slangs/${id}`;
    const res = await fetch(apiUrl, {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.log("Failed to fetch a slang", error);
  }
};

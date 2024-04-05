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
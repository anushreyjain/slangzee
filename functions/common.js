
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

const ALL_APIS = {
    GET_ALL_SLANG: `${BASE_URL}/api/slangs`,
    GET_SINGLE_SLANG: `${BASE_URL}/api/slangs/{id}`,
    LIKE_SLANG: `${BASE_URL}/api/slangs/{id}/likes`,
}

export function generateApiUrl(path, queries, variables) {
    let apiUrl = ALL_APIS[path];

    // Replace placeholders in apiUrl with values from variables object
    apiUrl = apiUrl.replace(/{([^{}]*)}/g, (match, key) => {
        const value = variables[key.trim()];
        if (value === undefined) {
            throw new Error(`Value for placeholder '${match}' not found in variables object.`);
        }
        return value;
    });

    console.log('apiUrl', apiUrl);

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



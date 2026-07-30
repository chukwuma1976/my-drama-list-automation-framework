export const BASE_API_URL = "https://my-drama-list-api-ten.vercel.app/"
export const BASE_UI_URL = "https://mydramalist.com/"
export const MOCK_API_URL = "http://localhost:5000/api/dramalist/"

export const username = process.env.APP_USERNAME || "mdltester";
export const password = process.env.APP_PASSWORD || "mdltester";
export const email = process.env.APP_EMAIL || "mdltester@gmail.com";

export const generateFullApiUrl = (path: string) => {
    return BASE_API_URL + path;
}

export const generateFullUiUrl = (path: string) => {
    return BASE_UI_URL + path;
}

export const generateMockApiUrl = (path: string) => {
    return MOCK_API_URL + path;
}
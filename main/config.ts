export const BASE_API_URL = "https://my-drama-list-api-ten.vercel.app/"
export const BASE_UI_URL = "https://mydramalist.com/"

export const username = process.env.app_username || "mdltester";
export const password = process.env.app_password || "mdltester";
export const email = process.env.app_email || "mdltester@gmail.com";

export const generateFullApiUrl = (path: string) => {
    return BASE_API_URL + path;
}

export const generateFullUiUrl = (path: string) => {
    return BASE_UI_URL + path;
}
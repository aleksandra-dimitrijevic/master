import { SERVER_URL } from "../constants/Api";
import { getCurrentUser } from "../types/User";

export const API_URL = process?.env?.REACT_APP_API_URL || SERVER_URL;

export type RequestOptions = { 
    url: string; 
    queryParams?: any; 
    method?: string; 
    body?: any; 
}

const encodeParams = (params: { [x: string]: any; }) => {
    return Object.keys(params)
        .filter((key) => Boolean(params[key]))
        .map(
            (key) => {
                if (Array.isArray(params[key])) {
                    return params[key].map((item: any) => `${key}[]=${item}`).join("&");
                }
                return `${key}=${params[key]}`
            }
        )
        .join("&");
};

const getHeaders = async () => {
    const user = await getCurrentUser();
    return {
        "Content-Type": "application/json",
        'x-access-token': user.token,
    };
};

export const request = async (options: RequestOptions) => {
    let url = API_URL + options.url;

    if (options.queryParams) {
        url = `${url}?${encodeParams(options.queryParams)}`;
    }

    const response = await fetch(url, {
        method: options.method,
        headers: await getHeaders(),
        body: options.body && JSON.stringify(options.body),
    });
    const json = await response.json();
    // if(response.status >= 400){
    //     throw new Error(json.msg)
    // }
    return json;
};
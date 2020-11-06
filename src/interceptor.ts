import globalAxios, {AxiosRequestConfig} from "axios";

const apiKeyHeaderName = "X-Killbill-ApiKey";
const apiSecretHeaderName = "X-Killbill-ApiSecret";

export async function followLocationHeaderInterceptor(response) {
    var location = response.headers.location;
    if (response.status === 201 && location) {
        var config: AxiosRequestConfig = {
            auth: response.config.auth,
            headers: {
                [apiKeyHeaderName]: response.config.headers[apiKeyHeaderName],
                [apiSecretHeaderName]: response.config.headers[apiSecretHeaderName]
            }
        };
        var followResponse = await globalAxios.get(location, config)
        response.data = followResponse.data;
    }
    return response;
}

export function apiKey(apiKey: string, apiSecret: string) {
    return (k: string) => {
        if (k === apiKeyHeaderName) return apiKey;
        if (k === apiSecretHeaderName) return apiSecret;
        return null
    }
}
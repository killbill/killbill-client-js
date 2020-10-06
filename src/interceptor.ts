import globalAxios, {AxiosRequestConfig} from "axios";

const apiKeyHeaderName = "X-Killbill-ApiKey";
const apiSecretHeaderName = "X-Killbill-ApiSecret";

globalAxios.interceptors.response.use(async response => {
    var location = response.headers.location;
    if(response.status === 201 && location){
        var config : AxiosRequestConfig = {auth: response.config.auth, headers: {[apiKeyHeaderName]: response.config.headers[apiKeyHeaderName], [apiSecretHeaderName]: response.config.headers[apiSecretHeaderName]}};
        var followResponse = await globalAxios.get(location, config)
        response.data = followResponse.data;
    }
    return response;
}, function (error) {
    return Promise.reject(error);
});
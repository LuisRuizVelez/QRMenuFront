const ENVIRONMENT = 'develop'; // Change this to 'test' or 'production' as needed


const API_ENV = {
    develop: 'http://localhost:8080/',
    test: 'http://localhost:8080/',
    production: 'http://localhost:8080/',
}


export const getBaseEndPoint = (env = ENVIRONMENT) => {
    switch (env) {
        case 'develop':
            return API_ENV.develop;
        case 'test':
            return API_ENV.test;
        case 'production':
            return API_ENV.production;
        default:
            return API_ENV.develop;
    }
}


export const getEndPoint = (path = null, env = ENVIRONMENT) => {
    const baseURL = getBaseEndPoint(env);
    return `${baseURL}${path}`;
}
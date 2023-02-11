namespace NodeJS {
    interface ProcessEnv {
        TYPE: 'low' | 'high';
        KEYWORD: string;
        INTERVAL: number;
        DEBUG: string;
        DOCKER: string;
        REQUESTS_TO_RESTART: string;
    }
}

declare module 'google-trends-api' {
    function interestByRegion<T>(...args: any[]): Promise<T>;
}

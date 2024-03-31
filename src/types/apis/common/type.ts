export type ApiReturnType<D> = {
    status: number;
    error: string;
    data: D;
};

export interface ApiReturnPaginationType<D> {
    status: number;
    error: string;
    data: {
        data: D;
        meta: {
            total: number;
            last_page: number;
        };
    };
}

export type ApiReturnErrorType = {
    error: string;
};

export type UninterceptedApiErrorData = Record<string, string[]>;

export type UninterceptedApiError = {
    error: string | Record<string, string[]>;
};

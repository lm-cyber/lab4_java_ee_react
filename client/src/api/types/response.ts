export interface HitResult {
    id: number;
    x: number;
    y: number;
    r: number;
    hit: boolean;
    hitTime: string;
    executionTimeMicros: number;
}

export interface ListResponse<T> {
    page: number
    perPage: number
    total: number
    totalPages: number
    data: T[]
}
export type Either<L, R> = Left<L, R> | Right<L, R>;
export declare class Left<L, R> {
    readonly value: L;
    constructor(value: L);
    isLeft(): boolean;
    isRight(): boolean;
}
export declare class Right<L, R> {
    readonly value: R;
    constructor(value: R);
    isLeft(): boolean;
    isRight(): boolean;
}
export declare const left: <L>(value: L) => Either<L, never>;
export declare const right: <R>(value: R) => Either<never, R>;

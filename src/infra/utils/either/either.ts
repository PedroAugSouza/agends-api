/* eslint-disable @typescript-eslint/no-unused-vars */
export type Either<L, R> = Left<L, R> | Right<L, R>;

export class Left<L, R> {
  constructor(readonly value: L) {}

  isLeft() {
    return true;
  }

  isRight() {
    return false;
  }
}
export class Right<L, R> {
  constructor(readonly value: R) {}

  isLeft() {
    return false;
  }

  isRight() {
    return true;
  }
}

export const left = <L, R>(value: L): Either<L, R> => new Left(value);

export const right = <L, R>(value: R): Either<L, R> => new Right(value);

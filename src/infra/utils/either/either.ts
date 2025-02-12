/* eslint-disable @typescript-eslint/no-unused-vars */
export type Either<L, R> = Left<L, R> | Right<L, R>;

export class Left<L, R> {
  readonly value: L;

  constructor(value: L) {
    this.value = value;
  }

  isLeft() {
    return true;
  }
  isRight() {
    return false;
  }
}

export class Right<L, R> {
  readonly value: R;

  constructor(value: R) {
    this.value = value;
  }

  isLeft() {
    return false;
  }

  isRight() {
    return true;
  }
}

export const left = <L>(value: L): Either<L, never> => {
  return new Left(value);
};

export const right = <R>(value: R): Either<never, R> => {
  return new Right(value);
};

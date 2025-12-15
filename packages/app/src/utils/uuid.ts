import { v1, v4, v7, NIL, MAX } from 'uuid';

export const buildUuidString = () => {
  return `NIL: ${NIL}

V01: ${v1()}

V04: ${v4()}

V07: ${v7()}

MAX: ${MAX}
`;
};

export const NODE_ENV = process.env.NODE_ENV ?? 'development';

export const URI =
  NODE_ENV === 'development'
    ? '/models/sign-model.onnx'
    : '/hieudoanm/models/sign-model.onnx';

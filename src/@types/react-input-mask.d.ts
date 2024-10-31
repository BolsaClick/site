declare module 'react-input-mask' {
  import { FC, InputHTMLAttributes } from 'react';

  export interface InputMaskProps extends InputHTMLAttributes<HTMLInputElement> {
    mask: string | Array<string | RegExp>;
    maskChar?: string | null;
    alwaysShowMask?: boolean;
  }

  const InputMask: FC<InputMaskProps>;
  export default InputMask;
}

import * as ScreenModule from '../../Register/Register';

export default function Register(props: any) {
  const Screen = (ScreenModule as any).default;
  return <Screen {...props} />;
}

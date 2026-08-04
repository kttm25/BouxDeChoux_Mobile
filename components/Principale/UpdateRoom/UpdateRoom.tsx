import * as ScreenModule from '../../UpdateRoom/UpdateRoom';

export default function UpdateRoom(props: any) {
  const Screen = (ScreenModule as any).default;
  return <Screen {...props} />;
}

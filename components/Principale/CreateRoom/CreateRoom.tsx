import * as ScreenModule from '../../CreateRoom/CreateRoom';

export default function CreateRoom(props: any) {
  const Screen = (ScreenModule as any).default;
  return <Screen {...props} />;
}

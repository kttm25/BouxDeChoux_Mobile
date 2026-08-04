import * as ScreenModule from '../../AssignRoomEducator/AssignRoomEducator';

export default function AssignRoomEducator(props: any) {
  const Screen = (ScreenModule as any).default ?? (ScreenModule as any).AssignRoomEducator;
  return <Screen {...props} />;
}

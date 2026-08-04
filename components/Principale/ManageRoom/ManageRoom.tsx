import { Platform } from 'react-native';
import * as ScreenBase from '../../ManageRoom/ManageRoom';
import ManageRoomWeb from '../../web/ManageRoom/ManageRoomWeb';

export default function ManageRoom(props: any) {
  const Screen = (ScreenBase as any).default ?? (ScreenBase as any).ManageRoom;
  return Platform.OS === 'web' ? <ManageRoomWeb {...props} /> : <Screen {...props} />;
}

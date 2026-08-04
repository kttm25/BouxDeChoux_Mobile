import { Platform } from 'react-native';
import * as ScreenBase from '../../ManageRoom/ManageRooms';
import ManageRoomsWeb from '../../web/ManageRoom/ManageRoomsWeb';

export default function ManageRooms(props: any) {
  const Screen = (ScreenBase as any).default ?? (ScreenBase as any).ManageRoom;
  return Platform.OS === 'web' ? <ManageRoomsWeb {...props} /> : <Screen {...props} />;
}

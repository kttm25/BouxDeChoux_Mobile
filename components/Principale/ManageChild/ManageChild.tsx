import { Platform } from 'react-native';
import * as ScreenBase from '../../ManageChild/ManageChild';
import ManageChildWeb from '../../web/ManageChild/ManageChildWeb';

export default function ManageChild(props: any) {
  const Screen = (ScreenBase as any).default ?? (ScreenBase as any).ManageChild;
  return Platform.OS === 'web' ? <ManageChildWeb {...props} /> : <Screen {...props} />;
}

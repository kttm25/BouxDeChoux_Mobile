import { Platform } from 'react-native';
import * as ScreenBase from '../../ManageChildcares/ManageChildcare';
import ManageChildcareWeb from '../../web/ManageChildcares/ManageChildcareWeb';

export default function ManageChildcare(props: any) {
  const Screen = (ScreenBase as any).default ?? (ScreenBase as any).ManageChildCare;
  return Platform.OS === 'web' ? <ManageChildcareWeb {...props} /> : <Screen {...props} />;
}

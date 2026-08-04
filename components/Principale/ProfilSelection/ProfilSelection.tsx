import { Platform } from 'react-native';
import ProfilSelectionBase from '../../ProfilSelection/ProfilSelection';
import ProfilSelectionWeb from '../../web/ProfilSelection/ProfilSelectionWeb';

export default function ProfilSelection(props: any) {
  return Platform.OS === 'web' ? <ProfilSelectionWeb {...props} /> : <ProfilSelectionBase {...props} />;
}

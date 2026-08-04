import { Platform } from 'react-native';
import FirstPageBase from '../../FirstPage/FirstPage';
import FirstPageWeb from '../../web/FirstPage/FirstPageWeb';

export default function FirstPage(props: any) {
  return Platform.OS === 'web' ? <FirstPageWeb {...props} /> : <FirstPageBase {...props} />;
}

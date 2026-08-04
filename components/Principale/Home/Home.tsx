import { Platform } from 'react-native';
import HomeBase from '../../Home/Home';
import HomeWeb from '../../web/Home/HomeWeb';

export default function Home(props: any) {
  return Platform.OS === 'web' ? <HomeWeb {...props} /> : <HomeBase {...props} />;
}

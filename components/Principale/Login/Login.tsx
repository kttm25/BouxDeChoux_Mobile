import { Platform } from 'react-native';
import LoginBase from '../../Login/Login';
import LoginWeb from '../../web/Login/LoginWeb';

export default function Login(props: any) {
  return Platform.OS === 'web' ? <LoginWeb {...props} /> : <LoginBase {...props} />;
}

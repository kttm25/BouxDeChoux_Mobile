import * as ScreenModule from '../../Profil/Profil';

export default function Profil(props: any) {
  const Screen = (ScreenModule as any).default;
  return <Screen {...props} />;
}

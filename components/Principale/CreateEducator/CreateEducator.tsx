import * as ScreenModule from '../../CreateEducator/CreateEducator';

export default function CreateEducator(props: any) {
  const Screen = (ScreenModule as any).default;
  return <Screen {...props} />;
}

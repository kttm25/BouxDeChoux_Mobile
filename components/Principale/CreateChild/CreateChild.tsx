import * as ScreenModule from '../../CreateChild/CreateChild';

export default function CreateChild(props: any) {
  const Screen = (ScreenModule as any).default;
  return <Screen {...props} />;
}

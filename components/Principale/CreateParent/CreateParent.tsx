import * as ScreenModule from '../../CreateParent/CreateParent';

export default function CreateParent(props: any) {
  const Screen = (ScreenModule as any).default;
  return <Screen {...props} />;
}

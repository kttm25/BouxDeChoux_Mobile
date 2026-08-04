import * as ScreenModule from '../../CreateChildcare/CreateChildcare';

export default function CreateChildcare(props: any) {
  const Screen = (ScreenModule as any).default;
  return <Screen {...props} />;
}

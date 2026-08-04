import * as ScreenModule from '../../ManageParent/ManageParent';

export default function ManageParent(props: any) {
  const Screen = (ScreenModule as any).default ?? (ScreenModule as any).ManageParent;
  return <Screen {...props} />;
}

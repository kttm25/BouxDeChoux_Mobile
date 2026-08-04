import * as ScreenModule from '../../ManageEducator/ManageEducator';

export default function ManageEducator(props: any) {
  const Screen = (ScreenModule as any).default ?? (ScreenModule as any).ManageEducator;
  return <Screen {...props} />;
}

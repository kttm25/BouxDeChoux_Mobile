import * as ScreenModule from '../../ViewDailyReport/ViewDailyReport';

export default function ViewDailyReport(props: any) {
  const Screen = (ScreenModule as any).default;
  return <Screen {...props} />;
}

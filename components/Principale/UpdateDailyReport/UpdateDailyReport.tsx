import * as ScreenModule from '../../UpdateDailyReport/UpdateDailyReport';

export default function UpdateDailyReport(props: any) {
  const Screen = (ScreenModule as any).default;
  return <Screen {...props} />;
}

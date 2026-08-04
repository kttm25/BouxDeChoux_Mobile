import * as ScreenModule from '../../CreateDailyReport/CreateDailyReport';

export default function CreateDailyReport(props: any) {
  const Screen = (ScreenModule as any).default;
  return <Screen {...props} />;
}

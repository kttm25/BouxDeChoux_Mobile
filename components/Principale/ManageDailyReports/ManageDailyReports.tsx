import * as ScreenModule from '../../ManageDailyReports/ManageDailyReports';

export default function ManageDailyReports(props: any) {
  const Screen = (ScreenModule as any).default;
  return <Screen {...props} />;
}

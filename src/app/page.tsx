import { DashboardView } from "@/sections/dashboard/view/dashboard-view";

export const metadata = { title: `Dashboard - Order List` };

export default async function Home() {
  return <DashboardView />;
}

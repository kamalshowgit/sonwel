import CardWrapper from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import {fetchCardData } from '@/app/lib/data';
import { Suspense } from 'react';
import { RevenueChartSkeleton } from '@/app/ui/skeletons';
import { InvoiceSkeleton } from '@/app/ui/skeletons';
import InfiniteScroll from '@/app/ui/InfiniteScroll';


export default async function Page() {
  const { numberOfInvoices, totalPaidInvoices, totalPendingInvoices, numberOfCustomers } = await fetchCardData();

  return (
    <main>
      
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
          <RevenueChart />

          
      
        
        {/* <Suspense fallback={<InvoiceSkeleton />}> */}
          <LatestInvoices />
        {/* </Suspense> */}
        
      </div>
    </main>
  );
}

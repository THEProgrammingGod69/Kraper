'use client';

// Dynamic import with no SSR to avoid text mismatch/hydration errors with dates
import dynamic from 'next/dynamic';

const DashboardContent = dynamic(() => import('./page_content'), {
    ssr: false,
});

export default function DashboardPage() {
    return <DashboardContent />;
}

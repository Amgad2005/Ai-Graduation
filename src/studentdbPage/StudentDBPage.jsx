import React from 'react';
import ProfileCard from '../studentdb/ProfileCard';
import GradesCard from '../studentdb/GradesCard';
import DepartmentsCard from '../studentdb/DepartmentsCard';
import ChartCard from '../studentdb/ChartCard';
import MaterialsTable from '../studentdb/MaterialsTable';

export default function StudentDBPage() {
  return (
    <main className="flex-1 w-full max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* Right Sidebar (Profile & Grades & Departments) */}
        <div className="space-y-6 lg:col-span-1">
          <ProfileCard/>
          <DepartmentsCard/>
          <GradesCard />
        </div>

        {/* Main Content Area (Chart & Materials Table) */}
        <div className="space-y-6 lg:col-span-3">
          <ChartCard />
          <MaterialsTable />
        </div>

      </div>
    </main>
  );
}

"use client"
import ManageCabStatus from '@/components/ManageCab/ManageCabStatus';
import ProtectedRoute from '@/components/ProtectedRoute';
import { AdminState } from '@/lib/adminStore';
import React, {  useEffect as appEffect } from 'react'
interface Props {
  params: { id: number };
}
const page: React.FC<Props> = ({ params }) => {
  const { fetchCab,cab } = AdminState(state => state)

  appEffect(() => {
    fetchCab(params.id)
  }, [params.id]);
  return (
    <ProtectedRoute><ManageCabStatus/></ProtectedRoute>
  )
}

export default page
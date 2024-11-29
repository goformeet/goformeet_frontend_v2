import { KYCColumns, KYCDetails } from '@/components/ui/columns'
import { DataTable } from '@/components/ui/data-table'
import React from 'react'

async function getData(): Promise<KYCDetails[]>{
    const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/get-kyc-details`
    console.log(apiUrl);
    const response = await fetch(apiUrl, {cache: "no-cache"});
    const data = response.json()
    return data;
}

const KycDetails = async () => {
    const data = await getData();
    console.log(data)
  return (
    <div className='p-5'>
        <h2 className='text-2xl font-bold'>KYC Details</h2>
        <DataTable searchColumn='name' columns={KYCColumns} data={data} />
    </div>
  )
}

export default KycDetails

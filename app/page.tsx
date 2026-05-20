import { supabase } from '@/lib/supabase'
import QRCodeCard from '@/components/QRCodeCard'
import type { QRCodeStatus } from '@/types'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const { data: qrCodes } = await supabase
    .from('qr_code_status')
    .select('*')
    .order('id')

  const codes = (qrCodes ?? []) as QRCodeStatus[]
  const assignedCount = codes.filter((qr) => qr.is_assigned).length
  const availableCount = codes.length - assignedCount

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">SnackFlow QR</h1>
          <p className="text-gray-500 text-sm mt-1">Production batch tracking</p>
        </div>

        <div className="flex gap-4 mb-8">
          <div className="bg-white rounded-xl px-5 py-4 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-green-600">{assignedCount}</div>
            <div className="text-sm text-gray-500 mt-0.5">Assigned</div>
          </div>
          <div className="bg-white rounded-xl px-5 py-4 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-gray-400">{availableCount}</div>
            <div className="text-sm text-gray-500 mt-0.5">Available</div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {codes.map((qr) => (
            <QRCodeCard key={qr.id} qrCode={qr} />
          ))}
        </div>
      </div>
    </main>
  )
}

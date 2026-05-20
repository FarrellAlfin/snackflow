import { notFound } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import AssignForm from '@/components/AssignForm'
import BatchDetails from '@/components/BatchDetails'
import type { QRCodeStatus, BatchAssignment } from '@/types'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: { id: string }
}

export default async function QRScanPage({ params }: PageProps) {
  const id = parseInt(params.id)
  if (isNaN(id) || id < 1 || id > 10) notFound()

  const [{ data: qrStatus }, { data: history }] = await Promise.all([
    supabase.from('qr_code_status').select('*').eq('id', id).single(),
    supabase
      .from('batch_assignments')
      .select('*')
      .eq('qr_code_id', id)
      .not('unassigned_at', 'is', null)
      .order('assigned_at', { ascending: false })
      .limit(20),
  ])

  if (!qrStatus) notFound()

  const status = qrStatus as QRCodeStatus
  const pastBatches = (history ?? []) as BatchAssignment[]

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-lg mx-auto px-4 py-8">
        <div className="mb-6 flex items-center gap-3">
          <Link href="/" className="text-sm text-blue-600 hover:underline">
            ← Dashboard
          </Link>
          <span className="text-gray-300">|</span>
          <span className="text-sm font-medium text-gray-700">{status.label}</span>
        </div>

        {status.is_assigned ? (
          <BatchDetails qrStatus={status} />
        ) : (
          <AssignForm qrCodeId={id} />
        )}

        {pastBatches.length > 0 && (
          <section className="mt-10">
            <h2 className="text-base font-semibold text-gray-700 mb-3">Past Batches</h2>
            <div className="space-y-3">
              {pastBatches.map((batch) => (
                <div
                  key={batch.id}
                  className="bg-white rounded-xl border border-gray-100 px-4 py-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{batch.batch_name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {batch.product} &middot; {batch.batch_number}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(batch.assigned_at).toLocaleDateString()} &rarr;{' '}
                        {batch.unassigned_at
                          ? new Date(batch.unassigned_at).toLocaleDateString()
                          : '—'}
                      </p>
                    </div>
                    <span className="shrink-0 text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                      Done
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}

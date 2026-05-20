'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { unassignBatch } from '@/lib/actions'
import type { QRCodeStatus } from '@/types'

export default function BatchDetails({ qrStatus }: { qrStatus: QRCodeStatus }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleUnassign() {
    if (!qrStatus.assignment_id) return
    if (!confirm('Unassign this QR code from the batch?')) return
    setLoading(true)
    try {
      await unassignBatch(qrStatus.assignment_id, qrStatus.id)
      router.refresh()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
          Assigned
        </span>
        <button
          onClick={handleUnassign}
          disabled={loading}
          className="text-sm text-red-500 hover:text-red-700 disabled:opacity-40 transition-colors"
        >
          {loading ? 'Unassigning…' : 'Unassign'}
        </button>
      </div>

      <dl className="space-y-5">
        <DetailRow label="Batch Number" value={qrStatus.batch_number} large />
        <DetailRow label="Batch Name" value={qrStatus.batch_name} />
        <DetailRow label="Product" value={qrStatus.product} />
        <DetailRow label="Serial Number" value={qrStatus.serial_number} mono />
        <DetailRow
          label="Date"
          value={
            qrStatus.batch_date
              ? new Date(qrStatus.batch_date + 'T00:00:00').toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              : null
          }
        />
        {qrStatus.notes && <DetailRow label="Notes" value={qrStatus.notes} />}
        <DetailRow
          label="Assigned at"
          value={
            qrStatus.assigned_at
              ? new Date(qrStatus.assigned_at).toLocaleString()
              : null
          }
          muted
        />
      </dl>
    </div>
  )
}

function DetailRow({
  label,
  value,
  large,
  mono,
  muted,
}: {
  label: string
  value: string | null | undefined
  large?: boolean
  mono?: boolean
  muted?: boolean
}) {
  if (!value) return null
  return (
    <div>
      <dt className="text-xs font-medium text-gray-400 uppercase tracking-wider">{label}</dt>
      <dd
        className={`mt-1 text-gray-900 ${large ? 'text-xl font-bold' : 'text-base'} ${mono ? 'font-mono' : ''} ${muted ? 'text-sm text-gray-500' : ''}`}
      >
        {value}
      </dd>
    </div>
  )
}

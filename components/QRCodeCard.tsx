'use client'

import { useState } from 'react'
import Link from 'next/link'
import QRCode from 'react-qr-code'
import { unassignBatch } from '@/lib/actions'
import type { QRCodeStatus } from '@/types'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

export default function QRCodeCard({ qrCode }: { qrCode: QRCodeStatus }) {
  const [unassigning, setUnassigning] = useState(false)
  const qrUrl = `${APP_URL}/qr/${qrCode.id}`

  function handleDownload() {
    const svg = document.getElementById(`qr-svg-${qrCode.id}`)
    if (!svg) return
    const svgData = new XMLSerializer().serializeToString(svg)
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${qrCode.label}.svg`
    a.click()
    URL.revokeObjectURL(url)
  }

  async function handleUnassign() {
    if (!qrCode.assignment_id) return
    setUnassigning(true)
    try {
      await unassignBatch(qrCode.assignment_id, qrCode.id)
    } finally {
      setUnassigning(false)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-800">{qrCode.label}</span>
        <span
          className={`text-xs px-2 py-0.5 rounded-full font-medium ${
            qrCode.is_assigned
              ? 'bg-green-100 text-green-700'
              : 'bg-gray-100 text-gray-500'
          }`}
        >
          {qrCode.is_assigned ? 'Assigned' : 'Free'}
        </span>
      </div>

      <Link href={`/qr/${qrCode.id}`} className="block">
        <div className="bg-white border border-gray-100 rounded-lg p-2 flex items-center justify-center aspect-square">
          <QRCode
            id={`qr-svg-${qrCode.id}`}
            value={qrUrl}
            size={128}
            bgColor="#ffffff"
            fgColor="#000000"
            level="M"
          />
        </div>
      </Link>

      {qrCode.is_assigned && (
        <div className="text-xs space-y-0.5">
          <p className="font-medium text-gray-800 truncate">{qrCode.batch_name}</p>
          <p className="text-gray-400 truncate">{qrCode.product}</p>
          <p className="text-gray-400">
            {qrCode.batch_date
              ? new Date(qrCode.batch_date + 'T00:00:00').toLocaleDateString()
              : '—'}
          </p>
        </div>
      )}

      <div className="flex gap-2 mt-auto">
        <button
          onClick={handleDownload}
          className="flex-1 text-xs py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
        >
          Download
        </button>
        {qrCode.is_assigned && (
          <button
            onClick={handleUnassign}
            disabled={unassigning}
            className="flex-1 text-xs py-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 disabled:opacity-40 transition-colors"
          >
            {unassigning ? '…' : 'Unassign'}
          </button>
        )}
      </div>
    </div>
  )
}

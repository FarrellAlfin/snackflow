'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { assignBatch } from '@/lib/actions'

export default function AssignForm({ qrCodeId }: { qrCodeId: number }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const today = new Date().toISOString().split('T')[0]

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const formData = new FormData(e.currentTarget)
    try {
      await assignBatch(qrCodeId, formData)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <div className="mb-6">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-500">
          Available
        </span>
        <h2 className="text-xl font-semibold text-gray-900 mt-3">Assign to Batch</h2>
        <p className="text-sm text-gray-400 mt-1">Fill in the details below to track this batch</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label="Batch Number" name="batch_number" placeholder="e.g. B-001" required />
        <Field label="Batch Name" name="batch_name" placeholder="e.g. Morning Batch" required />
        <Field label="Product" name="product" placeholder="e.g. Cheese Crackers" required />
        <Field label="Serial Number" name="serial_number" placeholder="e.g. SN-2024-001" required />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Date *</label>
          <input
            name="batch_date"
            type="date"
            required
            defaultValue={today}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Notes</label>
          <textarea
            name="notes"
            rows={2}
            placeholder="Optional notes..."
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-base"
        >
          {loading ? 'Assigning…' : 'Assign to Batch'}
        </button>
      </form>
    </div>
  )
}

function Field({
  label,
  name,
  placeholder,
  required,
}: {
  label: string
  name: string
  placeholder: string
  required?: boolean
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label} {required && '*'}
      </label>
      <input
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  )
}

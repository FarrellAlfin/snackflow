export interface QRCodeStatus {
  id: number
  label: string
  assignment_id: string | null
  batch_number: string | null
  batch_name: string | null
  product: string | null
  serial_number: string | null
  batch_date: string | null
  notes: string | null
  assigned_at: string | null
  is_assigned: boolean
}

export interface BatchAssignment {
  id: string
  qr_code_id: number
  batch_number: string
  batch_name: string
  product: string
  serial_number: string
  batch_date: string
  notes: string | null
  assigned_at: string
  unassigned_at: string | null
  created_at: string
}

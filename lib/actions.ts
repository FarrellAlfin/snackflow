'use server'

import { revalidatePath } from 'next/cache'
import { supabase } from './supabase'

export async function assignBatch(qrCodeId: number, formData: FormData) {
  const { error } = await supabase.from('batch_assignments').insert({
    qr_code_id: qrCodeId,
    batch_number: formData.get('batch_number') as string,
    batch_name: formData.get('batch_name') as string,
    product: formData.get('product') as string,
    serial_number: formData.get('serial_number') as string,
    batch_date: formData.get('batch_date') as string,
    notes: (formData.get('notes') as string) || null,
  })

  if (error) throw new Error(error.message)

  revalidatePath('/')
  revalidatePath(`/qr/${qrCodeId}`)
}

export async function unassignBatch(assignmentId: string, qrCodeId: number) {
  const { error } = await supabase
    .from('batch_assignments')
    .update({ unassigned_at: new Date().toISOString() })
    .eq('id', assignmentId)

  if (error) throw new Error(error.message)

  revalidatePath('/')
  revalidatePath(`/qr/${qrCodeId}`)
}

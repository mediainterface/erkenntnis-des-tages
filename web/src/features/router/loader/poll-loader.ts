import { TABLE_NAME } from '@/common/constants/table-name.constants'
import { Poll } from '@/common/types/tables/polls/poll.type'
import { supabase } from '@/supabase'
import { LoaderFunctionArgs, redirect } from 'react-router-dom'
import { ROUTING_PATH } from '../domain/constants/routing-path.constants'

export const pollLoader = async ({ params }: LoaderFunctionArgs) => {
  const pollId = params.pollId ?? ''
  const { data, error } = await supabase.from(TABLE_NAME.polls).select().eq('id', pollId).maybeSingle()
  if (!data || error) {
    alert('Umfrage konnte nicht gefunden werden')
    return redirect(ROUTING_PATH.home)
  }
  const pollResponse = data as Poll

  if (pollResponse.is_closed) {
    alert('Diese Umfrage ist abgeschlossen')
    return redirect(ROUTING_PATH.home)
  }
  return null
}


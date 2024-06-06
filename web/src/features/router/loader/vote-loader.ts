import { TABLE_NAME } from '@/common/constants/table-name.constants'
import { supabase } from '@/supabase'
import { LoaderFunctionArgs, generatePath, redirect } from 'react-router-dom'
import { ROUTING_PATH } from '../domain/constants/routing-path.constants'

export const voteLoader = async ({ params }: LoaderFunctionArgs) => {
  const pollId = params.pollId ?? ''
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (!user || userError) {
    alert('Aktuelle Benutzer konnte nicht gefunden werden')
    return redirect(ROUTING_PATH.home)
  }

  const { data: pollVotes } = await supabase
    .from(TABLE_NAME.votes)
    .select()
    .eq('poll_id', pollId)
    .eq('user_id', user.id)

  if (pollVotes && pollVotes.length === 0) {
    return null
  }

  return redirect(generatePath(ROUTING_PATH.result, { pollId }))
}

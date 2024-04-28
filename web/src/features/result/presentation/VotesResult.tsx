import { TABLE_NAME } from '@/common/constants/table-name.constants'
import { PollOption } from '@/common/types/tables/poll_options/poll-option.type'
import { PollVote } from '@/common/types/tables/poll_votes/poll-vote.type'
import { supabase } from '@/supabase'
import { SmileOutlined } from '@ant-design/icons'
import { Result } from 'antd'
import React from 'react'
import { useParams } from 'react-router-dom'

export const VotesResult: React.FC = () => {
  const [votesLeft, setVotesLeft] = React.useState<number>(420)
  const { pollId = '' } = useParams()

  supabase
    .channel('supabase_realtime')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: TABLE_NAME.votes,
      },
      (payload) => {
        const newVote = payload.new as PollVote
        if (newVote.poll_id === pollId) {
          setVotesLeft((oldState) => (oldState > 0 ? oldState - 1 : oldState))
        }
      },
    )
    .subscribe()

  const getResults = React.useCallback(async () => {
    const { data: pollOptionsResponse, error: pollOptionsError } = await supabase
      .from(TABLE_NAME.poll_options)
      .select()
      .eq('poll_id', pollId)
    if (!pollOptionsResponse || pollOptionsError) {
      throw new Error(`cannot get options from poll: ${pollId}`)
    }
    const pollOptions = pollOptionsResponse as PollOption[]

    const { data: pollVotesResponse, error: pollVotesError } = await supabase
      .from(TABLE_NAME.votes)
      .select()
      .eq('poll_id', pollId)
    if (!pollVotesResponse || pollVotesError) {
      throw new Error(`cannot get votes from poll: ${pollId}`)
    }
    const pollVotes = pollVotesResponse as PollVote[]
    setVotesLeft(pollOptions.length - pollVotes.length)
  }, [pollId])

  React.useEffect(() => {
    getResults()
  }, [getResults])

  return votesLeft > 0 ? (
    <Result
      icon={<SmileOutlined />}
      title={`${votesLeft} ${votesLeft === 1 ? 'Person hat' : 'Personen haben'} noch nicht abgestimmt`}
    />
  ) : (
    <p>Gewinner</p>
  )
}


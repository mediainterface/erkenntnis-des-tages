import { TABLE_NAME } from '@/common/constants/table-name.constants'
import { PollOption } from '@/common/types/tables/poll_options/poll-option.type'
import { PollVote } from '@/common/types/tables/poll_votes/poll-vote.type'
import { supabase } from '@/supabase'
import { SmileOutlined } from '@ant-design/icons'
import { Result, Spin } from 'antd'
import React from 'react'
import { useParams } from 'react-router-dom'
import { PollResult } from '../domain/type/poll-result.type'
import { ClosePoll } from './ClosePoll'
import { ResultOption } from './ResultOption'

export const VotesResult: React.FC = () => {
  const initVotesLeft = 420
  const [votesLeft, setVotesLeft] = React.useState<number>(initVotesLeft)
  const [results, setResults] = React.useState<PollResult[]>([])
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

  const getVotes = React.useCallback(async (): Promise<PollVote[]> => {
    const { data: pollVotesResponse, error: pollVotesError } = await supabase
      .from(TABLE_NAME.votes)
      .select()
      .eq('poll_id', pollId)
    if (!pollVotesResponse || pollVotesError) {
      throw new Error(`cannot get votes from poll: ${pollId}`)
    }
    return pollVotesResponse as PollVote[]
  }, [pollId])

  const getPollOptions = React.useCallback(async (): Promise<PollOption[]> => {
    const { data: pollOptionsResponse, error: pollOptionsError } = await supabase
      .from(TABLE_NAME.poll_options)
      .select()
      .eq('poll_id', pollId)
    if (!pollOptionsResponse || pollOptionsError) {
      throw new Error(`cannot get options from poll: ${pollId}`)
    }
    return pollOptionsResponse as PollOption[]
  }, [pollId])

  const startup = React.useCallback(async () => {
    const pollOptions = await getPollOptions()
    const votes = await getVotes()
    setVotesLeft(pollOptions.length - votes.length)
  }, [getVotes, getPollOptions])

  React.useEffect(() => {
    startup()
  }, [startup])

  const getResults = React.useCallback(async (): Promise<PollResult[]> => {
    const votes = await getVotes()
    const options = await getPollOptions()

    return options.map((option) => {
      const count = votes.filter((vote) => vote.poll_option_id === option.id).length
      return { ...option, votes: count }
    })
  }, [getPollOptions, getVotes])

  React.useEffect(() => {
    const perform = async () => {
      if (votesLeft === 0) {
        setResults(await getResults())
      }
    }

    perform()
  }, [votesLeft, getResults])

  return votesLeft === initVotesLeft ? (
    <Spin size={'large'} />
  ) : votesLeft > 0 ? (
    <Result
      icon={<SmileOutlined />}
      title={`${votesLeft} ${votesLeft === 1 ? 'Person hat' : 'Personen haben'} noch nicht abgestimmt`}
    />
  ) : (
    <>
      {results
        .sort((a, b) => b.votes - a.votes)
        .map((result) => (
          <ResultOption {...result} key={result.id} />
        ))}
      <ClosePoll id={pollId} />
    </>
  )
}


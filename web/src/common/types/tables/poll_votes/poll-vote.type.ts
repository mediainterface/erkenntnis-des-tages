import { PollOption } from '../poll_options/poll-option.type'
import { Poll } from '../polls/poll.type'

export type PollVote = Pick<Poll, 'user_id'> &
  Pick<PollOption, 'poll_id' | 'created_at'> & {
    poll_option_id: string
  }

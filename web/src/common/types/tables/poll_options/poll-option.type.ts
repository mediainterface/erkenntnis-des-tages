import { Poll } from '../polls/poll.type'

export type PollOption = Pick<Poll, 'user_id' | 'created_at'> & {
  id: string
  poll_id: string
  content: string
}


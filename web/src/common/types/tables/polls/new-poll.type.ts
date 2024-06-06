import { Poll } from './poll.type'

export type NewPoll = Omit<Poll, 'id'>

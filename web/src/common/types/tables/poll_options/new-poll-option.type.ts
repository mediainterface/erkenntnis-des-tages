import { PollOption } from './poll-option.type'

export type NewPollOption = Omit<PollOption, 'id'>

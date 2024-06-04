import { PollOption } from '@/common/types/tables/poll_options/poll-option.type'

export type PollResult = PollOption & { votes: number }

import { TABLE_NAME } from '@/common/constants/table-name.constants'
import { PollOption } from '@/common/types/tables/poll_options/poll-option.type'
import { Poll } from '@/common/types/tables/polls/poll.type'
import { generateOrder } from '@/features/createPoll/helper/creatPollHelper'
import { supabase } from '@/supabase'

/**
 * Sorts the vote options to match the correct order based on the user order generated for the poll.
 *
 * @param {Poll['id']} pollId - The ID of the poll.
 * @param {PollOption[]} voteOptions - An array of poll options to be sorted.
 * @returns {Promise<PollOption[]>} A promise that resolves to an array of poll options sorted in the correct order.
 */
export const sortVotesToCorrectOrder = async (pollId: Poll['id'], voteOptions: PollOption[]): Promise<PollOption[]> => {
  const { data, error } = await supabase.from(TABLE_NAME.polls).select().eq('id', pollId).maybeSingle()
  if (!data || error) {
    console.error(error)
    return voteOptions
  }
  const poll = data as Poll
  const correctOrder = await generateOrder(poll.user_id)
  //create a map for quick lookup of orderId by userId
  const correctOrderMap = new Map(correctOrder.map((profile) => [profile.user_id, profile.order_id]))

  return voteOptions.sort((a, b) => (correctOrderMap.get(a.user_id) ?? 0) - (correctOrderMap.get(b.user_id) ?? 0))
}

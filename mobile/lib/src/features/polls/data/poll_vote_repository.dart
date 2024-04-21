import 'package:edt/src/features/polls/domain/poll_vote.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

class PollVoteRepository {
  final supabase = Supabase.instance.client;
  final table = "poll_votes";

  Stream<List<PollVote>> watchPollVotesByPollId(String pollId) {
    return supabase
        .from(table)
        .stream(primaryKey: ["poll_id", "user_id"])
        .eq('poll_id', pollId)
        .map((event) => event.map((e) => PollVote.fromJson(e)).toList());
  }

  Future<PollVote> createAsync(String pollId, String userId, String pollOptionId) async {
    final response = await supabase.from(table).insert({
      'poll_id': pollId,
      'user_id': userId,
      'poll_option_id': pollOptionId,
    });

    return PollVote.fromJson(response);
  }
}

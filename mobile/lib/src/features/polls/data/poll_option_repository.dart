import 'package:supabase_flutter/supabase_flutter.dart';

import '../domain/poll_option.dart';

class PollOptionRepository {
  final supabase = Supabase.instance.client;
  final table = "poll_options";

  Future<List<PollOption>> listByPollIdAsync(String pollId) async {
    final response = await supabase.from(table).select("*").eq('poll_id', pollId);
    return response.map((e) => PollOption.fromJson(e)).toList();
  }

  Future<PollOption> createAsync(String pollId, String userId, String content) async {
    final response = await supabase
        .from(table)
        .insert({
          'poll_id': pollId,
          'user_id': userId,
          'content': content,
        })
        .select()
        .single();

    return PollOption.fromJson(response);
  }

  Future<void> deleteAsync(String id) async {
    await supabase.from(table).delete().eq('id', id);
  }
}

import 'package:riverpod_annotation/riverpod_annotation.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

import '../domain/poll.dart';

part 'poll_repository.g.dart';

@riverpod
PollRepository pollRepository(PollRepositoryRef ref) {
  return PollRepository();
}

@riverpod
Stream<List<Poll>> watchPolls(WatchPollsRef ref) {
  return ref.watch(pollRepositoryProvider).watchPolls();
}

@riverpod
Poll getPollById(GetPollByIdRef ref, String id) {
  return ref.watch(watchPollsProvider).requireValue.firstWhere((element) => element.id == id);
}

class PollRepository {
  final supabase = Supabase.instance.client;
  final table = "polls";

  Stream<List<Poll>> watchPolls() {
    return supabase.from(table).stream(primaryKey: ["id"]).map((event) => event.map((e) => Poll.fromJson(e)).toList());
  }

  Future<Poll> createAsync() async {
    final response = await supabase.from(table).insert({"user_id": supabase.auth.currentUser!.id}).select().single();
    return Poll.fromJson(response);
  }

  Future<Poll> update(String id, {bool? isClosed}) async {
    final response = await supabase
        .from(table)
        .update({
          if (isClosed != null) "is_closed": isClosed,
        })
        .match({'id': id})
        .eq('id', id)
        .select()
        .single();
    return Poll.fromJson(response);
  }

  Future<void> delete(String id) async {
    await supabase.from(table).delete().eq('id', id);
  }
}

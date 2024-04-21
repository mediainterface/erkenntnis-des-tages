import 'package:riverpod_annotation/riverpod_annotation.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

import '../domain/poll.dart';

part 'poll_repository.g.dart';

@riverpod
PollRepository pollRepository(PollRepositoryRef ref) {
  return PollRepository();
}

class PollRepository {
  final supabase = Supabase.instance.client;
  final table = "polls";

  Stream<List<Poll>> watchOpenPolls() {
    return supabase
        .from(table)
        .stream(primaryKey: ["id"])
        .eq('is_closed', false)
        .map((event) => event.map((e) => Poll.fromJson(e)).toList());
  }

  Future<Poll> createAsync() async {
    final response = await supabase.from(table).insert({}).select().single();
    return Poll.fromJson(response);
  }

  Future<Poll> update(String id, {bool? isClosed}) async {
    final response = await supabase
        .from(table)
        .update({
          if (isClosed != null) "is_closed": isClosed,
        })
        .eq('id', id)
        .select()
        .single();
    return Poll.fromJson(response);
  }

  Future<void> delete(String id) async {
    await supabase.from(table).delete().eq('id', id);
  }
}

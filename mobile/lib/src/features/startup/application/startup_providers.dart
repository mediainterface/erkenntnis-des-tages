import 'package:riverpod_annotation/riverpod_annotation.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

part 'startup_providers.g.dart';

@Riverpod(keepAlive: true)
SupabaseClient supabase(SupabaseRef ref) {
  return Supabase.instance.client;
}

@Riverpod(keepAlive: true)
Future<void> appStartup(AppStartupRef ref) async {
  await Supabase.initialize(
    url: 'https://rgqdcitvbekkcyyymoyz.supabase.co',
    anonKey:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJncWRjaXR2YmVra2N5eXltb3l6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM2MDgwOTYsImV4cCI6MjAyOTE4NDA5Nn0.aNWUfO43VyDuwOGZ7pszcHBCcaOj91jRGSxyCqa9rAc',
  );
}

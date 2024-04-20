import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:supabase_auth_ui/supabase_auth_ui.dart';

import '../../../constants/app_sizes.dart';

class LoginScreen extends StatelessWidget {
  static const route = "/login";
  static const name = "Login";

  const LoginScreen({super.key});

  @override
  Widget build(BuildContext context) {
    const redirectUrl = kIsWeb ? null : "edt://login-callback";
    return Scaffold(
      appBar: AppBar(),
      body: Padding(
        padding: const EdgeInsets.all(Sizes.p24),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            SupaEmailAuth(
              redirectTo: redirectUrl,
              onSignInComplete: (_) {},
              onSignUpComplete: (_) {},
            ),
          ],
        ),
      ),
    );
  }
}

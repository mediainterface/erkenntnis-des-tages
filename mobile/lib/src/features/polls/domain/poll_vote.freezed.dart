// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'poll_vote.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models');

PollVote _$PollVoteFromJson(Map<String, dynamic> json) {
  return _PollVote.fromJson(json);
}

/// @nodoc
mixin _$PollVote {
  @JsonKey(name: "user_id")
  String get userId => throw _privateConstructorUsedError;
  @JsonKey(name: "poll_id")
  String get pollId => throw _privateConstructorUsedError;
  @JsonKey(name: "poll_option_id")
  String get pollOptionId => throw _privateConstructorUsedError;
  @JsonKey(name: "created_at")
  DateTime get createdAt => throw _privateConstructorUsedError;

  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $PollVoteCopyWith<PollVote> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $PollVoteCopyWith<$Res> {
  factory $PollVoteCopyWith(PollVote value, $Res Function(PollVote) then) =
      _$PollVoteCopyWithImpl<$Res, PollVote>;
  @useResult
  $Res call(
      {@JsonKey(name: "user_id") String userId,
      @JsonKey(name: "poll_id") String pollId,
      @JsonKey(name: "poll_option_id") String pollOptionId,
      @JsonKey(name: "created_at") DateTime createdAt});
}

/// @nodoc
class _$PollVoteCopyWithImpl<$Res, $Val extends PollVote>
    implements $PollVoteCopyWith<$Res> {
  _$PollVoteCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? userId = null,
    Object? pollId = null,
    Object? pollOptionId = null,
    Object? createdAt = null,
  }) {
    return _then(_value.copyWith(
      userId: null == userId
          ? _value.userId
          : userId // ignore: cast_nullable_to_non_nullable
              as String,
      pollId: null == pollId
          ? _value.pollId
          : pollId // ignore: cast_nullable_to_non_nullable
              as String,
      pollOptionId: null == pollOptionId
          ? _value.pollOptionId
          : pollOptionId // ignore: cast_nullable_to_non_nullable
              as String,
      createdAt: null == createdAt
          ? _value.createdAt
          : createdAt // ignore: cast_nullable_to_non_nullable
              as DateTime,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$PollVoteImplCopyWith<$Res>
    implements $PollVoteCopyWith<$Res> {
  factory _$$PollVoteImplCopyWith(
          _$PollVoteImpl value, $Res Function(_$PollVoteImpl) then) =
      __$$PollVoteImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {@JsonKey(name: "user_id") String userId,
      @JsonKey(name: "poll_id") String pollId,
      @JsonKey(name: "poll_option_id") String pollOptionId,
      @JsonKey(name: "created_at") DateTime createdAt});
}

/// @nodoc
class __$$PollVoteImplCopyWithImpl<$Res>
    extends _$PollVoteCopyWithImpl<$Res, _$PollVoteImpl>
    implements _$$PollVoteImplCopyWith<$Res> {
  __$$PollVoteImplCopyWithImpl(
      _$PollVoteImpl _value, $Res Function(_$PollVoteImpl) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? userId = null,
    Object? pollId = null,
    Object? pollOptionId = null,
    Object? createdAt = null,
  }) {
    return _then(_$PollVoteImpl(
      null == userId
          ? _value.userId
          : userId // ignore: cast_nullable_to_non_nullable
              as String,
      null == pollId
          ? _value.pollId
          : pollId // ignore: cast_nullable_to_non_nullable
              as String,
      null == pollOptionId
          ? _value.pollOptionId
          : pollOptionId // ignore: cast_nullable_to_non_nullable
              as String,
      null == createdAt
          ? _value.createdAt
          : createdAt // ignore: cast_nullable_to_non_nullable
              as DateTime,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$PollVoteImpl implements _PollVote {
  const _$PollVoteImpl(
      @JsonKey(name: "user_id") this.userId,
      @JsonKey(name: "poll_id") this.pollId,
      @JsonKey(name: "poll_option_id") this.pollOptionId,
      @JsonKey(name: "created_at") this.createdAt);

  factory _$PollVoteImpl.fromJson(Map<String, dynamic> json) =>
      _$$PollVoteImplFromJson(json);

  @override
  @JsonKey(name: "user_id")
  final String userId;
  @override
  @JsonKey(name: "poll_id")
  final String pollId;
  @override
  @JsonKey(name: "poll_option_id")
  final String pollOptionId;
  @override
  @JsonKey(name: "created_at")
  final DateTime createdAt;

  @override
  String toString() {
    return 'PollVote(userId: $userId, pollId: $pollId, pollOptionId: $pollOptionId, createdAt: $createdAt)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$PollVoteImpl &&
            (identical(other.userId, userId) || other.userId == userId) &&
            (identical(other.pollId, pollId) || other.pollId == pollId) &&
            (identical(other.pollOptionId, pollOptionId) ||
                other.pollOptionId == pollOptionId) &&
            (identical(other.createdAt, createdAt) ||
                other.createdAt == createdAt));
  }

  @JsonKey(ignore: true)
  @override
  int get hashCode =>
      Object.hash(runtimeType, userId, pollId, pollOptionId, createdAt);

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$PollVoteImplCopyWith<_$PollVoteImpl> get copyWith =>
      __$$PollVoteImplCopyWithImpl<_$PollVoteImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$PollVoteImplToJson(
      this,
    );
  }
}

abstract class _PollVote implements PollVote {
  const factory _PollVote(
      @JsonKey(name: "user_id") final String userId,
      @JsonKey(name: "poll_id") final String pollId,
      @JsonKey(name: "poll_option_id") final String pollOptionId,
      @JsonKey(name: "created_at") final DateTime createdAt) = _$PollVoteImpl;

  factory _PollVote.fromJson(Map<String, dynamic> json) =
      _$PollVoteImpl.fromJson;

  @override
  @JsonKey(name: "user_id")
  String get userId;
  @override
  @JsonKey(name: "poll_id")
  String get pollId;
  @override
  @JsonKey(name: "poll_option_id")
  String get pollOptionId;
  @override
  @JsonKey(name: "created_at")
  DateTime get createdAt;
  @override
  @JsonKey(ignore: true)
  _$$PollVoteImplCopyWith<_$PollVoteImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

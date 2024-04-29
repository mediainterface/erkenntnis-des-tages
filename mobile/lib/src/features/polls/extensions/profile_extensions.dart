import '../../profile/domain/profile.dart';

extension ProfileExtensions on List<Profile> {
  void sortByOrder(int startOrder) => sort((a, b) {
        int aDiff = (a.order >= startOrder) ? a.order - startOrder : a.order - startOrder + length;
        int bDiff = (b.order >= startOrder) ? b.order - startOrder : b.order - startOrder + length;

        return aDiff.compareTo(bDiff);
      });
}

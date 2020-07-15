import firebase from '~/plugins/firebase'

export default function FirebaseCore (Collection, DocumentName) {
  return firebase.firestore()
    .collection(Collection)
    .doc(DocumentName)
}

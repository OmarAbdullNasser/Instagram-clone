import { ref, watchEffect } from "vue";

// firebase imports
import { db } from "../firebase/fireconfig";
import {
  collection,
  doc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

const getSingleDoc = (postId) => {
  const documents = ref(null);

  let colRef = collection(db, "posts", postId, "comments");
  colRef = query(colRef, orderBy("timestamp", "desc"));

  const unsub = onSnapshot(colRef, (snapshot) => {
    let results = [];
    snapshot.docs.forEach((doc) => {
      results.push({ ...doc.data(), id: doc.id });
    });

    // update values
    documents.value = results;
  });

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub());
  });

  return { documents };
};
export default getSingleDoc;

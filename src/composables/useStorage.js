import { storage } from "../firebase/fireconfig";
import { ref } from "vue";
import getUser from "./getUser";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
const { user } = getUser();

const useStorage = () => {
  const error = ref(null);
  const url = ref(null);
  const filePath = ref(null);
  const progress = ref(0);

  const uploadImage = async (file) => {
    filePath.value = `posts/${user.value.uid}/${file.name}`;
    const storRef = storageRef(storage, filePath.value);

    try {
      const res = await uploadBytes(storRef, file);
      url.value = await getDownloadURL(storRef);
    } catch (err) {
      console.log(err.message);
      error.value = err;
    }
  };

  return { uploadImage, url, filePath, error };
};

export default useStorage;

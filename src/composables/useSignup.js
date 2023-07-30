import { ref } from "vue";

// firebase imports
import { auth } from "../firebase/fireconfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const error = ref(null);
const isPending = ref(false);

const signup = async (email, password, username) => {
  error.value = null;
  isPending.value = true;

  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, {
      displayName: username,
    });
    if (!res) {
      throw new Error("Could not complete signup");
    }
    error.value = null;
    isPending.value = false;
  } catch (err) {
    console.log(err.message);
    error.value = err.message;
    isPending.value = false;
  }
};

const useSignup = () => {
  return { error, isPending, signup };
};

export default useSignup;

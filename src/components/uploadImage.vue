<template>
  <div class="imageupload">
    <form @submit.prevent="handleSubmit">
      <input type="text" placeholder="Enter Caption ...." v-model="caption" />
      <input type="file" @change="handleChange" />
      <button>Upload</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import useStorage from "../composables/useStorage";
import { Timestamp } from "../firebase/fireconfig";
import { db } from "../firebase/fireconfig";
import { addDoc, collection } from "firebase/firestore";

export default {
  components: {},
  props: ["user"],
  setup(props) {
    const caption = ref("");
    const { filePath, url, uploadImage } = useStorage();
    const file = ref(null);
    const fileError = ref(null);

    const handleSubmit = async () => {
      const colRef = collection(db, "posts");

      if (file.value) {
        await uploadImage(file.value).then(() => {
          addDoc(colRef, {
            timestamp: Timestamp,
            caption: caption.value,
            ImageUrl: url.value,
            username: props.user.displayName,
          });
          caption.value = ref("");
        });
        console.log("image uploaded, url: ", url.value);
      }

      console.log("here submit");
    };
    // allowed file types
    const types = ["image/png", "image/jpeg"];

    const handleChange = (e) => {
      let selected = e.target.files[0];
      console.log(selected);

      if (selected && types.includes(selected.type)) {
        file.value = selected;
        fileError.value = null;
      } else {
        file.value = null;
        fileError.value = "Please select an image file (png or jpg)";
      }
    };

    return { caption, handleSubmit, handleChange };
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  width: 60%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: white;
  /* padding: 20px; */
}

.imageupload input {
  margin: 10px;
}

.imageupload__progress {
  width: 100%;
}

textarea {
  border: 1px solid lightgray;
}
</style>

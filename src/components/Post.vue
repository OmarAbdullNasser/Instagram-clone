<template>
  <div class="post">
    <div class="post__header">
      <Avatar label="O" class="mr-2 post__avatar" size="large" shape="circle" />
      <!--User Name-->
      <h3 class="post__username">{{ username }}</h3>
    </div>

    <!--Image-->
    <img :src="ImageUrl" class="post__Image" alt="" />
    <!--Caption-->
    <h4 class="post__text">
      <strong>{{ username }}:</strong> {{ caption }}
    </h4>
    <!--comment Section -->
    <div class="post__comments" v-for="comment in comments" :key="comment.id">
      <p>
        <b>{{ comment.username }}</b> {{ comment.text }}
      </p>
    </div>

    <!--Add comments-->
    <form
      @submit.prevent="postcomment"
      v-if="user?.displayName"
      class="post__commentBox"
    >
      <input
        type="text"
        class="post__input"
        placeholder="Add comment ..."
        v-model="comment"
        required
      />
      <button class="post__btn" type="submit" v-show="comment">post</button>
    </form>
  </div>
</template>

<script>
import { ref, watchEffect } from "vue";
import Avatar from "primevue/avatar";
import getSingleDoc from "../composables/getSingleDoc";

// firebase imports
import { db, Timestamp } from "../firebase/fireconfig";
import { addDoc, collection } from "firebase/firestore";
import getUser from "../composables/getUser";
export default {
  components: {
    Avatar,
  },
  props: ["username", "caption", "ImageUrl", "postId"],
  setup(props) {
    //get comments
    const { documents: comments } = getSingleDoc(props.postId);
    //get User
    const { user } = getUser();

    const comment = ref("");

    const postcomment = () => {
      const colRef = collection(db, "posts", props.postId, "comments");
      addDoc(colRef, {
        text: comment.value,
        username: user.value.displayName,
        timestamp: Timestamp,
      });
      comment.value = "";
    };

    return { comments, comment, user, postcomment };
  },
};
</script>
<style>
.post {
  max-width: 500px;
  background-color: white;
  border: 1px solid lightgrey;
  margin-bottom: 45px;
}
.post__Image {
  width: 100%;
  object-fit: contain;
  border-top: 1px solid lightgrey;
  border-bottom: 1px solid lightgrey;
}

.post__text {
  font-weight: normal;
  padding: 20px;
}
.post__header {
  display: flex;
  align-items: center;
  padding: 20px;
}
.post__avatar {
  margin-right: 10px;
}
.post__commentBox {
  display: flex;
  margin-top: 10px;
}

.post__input {
  flex: 1;
  border: none;
  padding: 10px;
  border-bottom: 1px solid lightgrey;
  border-top: 1px solid lightgray;
}
.post__btn {
  flex: 0;
  border: none;
  color: #6082a3;
  background-color: transparent;
  border-top: 1px solid lightgray;
  padding: 10px;
}
.post__comments {
  padding: 10px;
  margin-top: -20px;
  margin-bottom: 5px;
  /* word-break: break-all; */
}
</style>

<template>
  <div class="home">
    <Dialog
      v-model:visible="visible"
      modal
      :style="{
        background: 'white',
        border: '1px solid black',
        margin: '0',
      }"
    >
      <!--Singup form-->
      <form class="app__signup" @submit.prevent="handleSignup">
        <img
          class="app__headerImage"
          height="40px;"
          src="https://toogreen.ca/instagreen/img/instagreen.svg"
          alt=""
        />
        <input
          type="text"
          class="singup_input"
          v-model="username"
          required
          placeholder="Enter UserName"
        />
        <input
          type="text"
          class="singup_input"
          v-model="email"
          placeholder="Enter Email"
          required
        />
        <input
          type="password"
          class="singup_input"
          v-model="password"
          placeholder="Enter Password"
          required
        />
        <Button type="submit" v-if="!isPending" class="btn_singup_form"
          >Sign Up</Button
        >
        <button v-if="isPending" disabled>Loading</button>
      </form>
    </Dialog>

    <Dialog
      v-model:visible="visible2"
      modal
      :style="{
        background: 'white',
        border: '1px solid black',
      }"
    >
      <!--Login form -->
      <form class="app__signup" @submit.prevent="handleSubmit">
        <img
          class="app__headerImage"
          height="40px;"
          src="https://toogreen.ca/instagreen/img/instagreen.svg"
          alt=""
        />
        <input
          type="text"
          class="singup_input"
          v-model="email"
          placeholder="Enter Email"
          required
        />
        <input
          type="password"
          class="singup_input"
          v-model="password"
          placeholder="Enter Password"
          required
        />
        <Button type="submit" v-if="!isPending" class="btn_singup_form"
          >Login
        </Button>
        <button v-if="isPending" disabled>Loading</button>
      </form>
    </Dialog>

    <div class="app__header">
      <img
        src="https://toogreen.ca/instagreen/img/instagreen.svg"
        class="app__headerImage"
        alt=""
      />
      <!--User Login in-->
      <div v-if="user">
        <Button @click="handleLogout" class="btn_singup"> Logout</Button>
      </div>

      <!--User LogOut-->
      <div v-if="!user">
        <Button label="Show" @click="visible = true" class="btn_singup"
          >Signup</Button
        >
        <Button label="Show" @click="visible2 = true" class="btn_singup"
          >Login
        </Button>
      </div>
    </div>
    <div class="app__posts">
      <Post
        v-for="post in posts"
        :key="post.id"
        :username="post.username"
        :caption="post.caption"
        :ImageUrl="post.ImageUrl"
        :postId="post.id"
      />
    </div>

    <uploadImage v-if="user?.displayName" :user="user" />
  </div>
</template>

<script>
import { ref, watchEffect } from "vue";
// @ is an alias to /src
import Post from "../components/Post.vue";
import Dialog from "primevue/dialog";
import useSignup from "../composables/useSignup.js";
import { signOut } from "firebase/auth";
import getCollection from "@/composables/getCollection";
import useLogin from "../composables/useLogin.js";
import getUser from "../composables/getUser";
import uploadImage from "../components/uploadImage.vue";
import { auth } from "../firebase/fireconfig";

export default {
  name: "HomeView",
  components: {
    Post,
    Dialog,
    uploadImage,
  },

  setup() {
    const visible = ref(false);
    const username = ref("");
    const email = ref("");
    const password = ref("");
    const visible2 = ref(false);

    //Signup
    const { signup, isPending, error: errSingup } = useSignup();

    //get Collection
    const { documents: posts } = getCollection("posts");

    //Login
    const { login, error: errLogin } = useLogin();

    //get User
    const { user } = getUser();

    ////Singup Function
    const handleSignup = async () => {
      await signup(email.value, password.value, username.value);
      if (!errSingup.value) {
        console.log("Signup is done...!");
      }
    };

    ////Login Functions
    const handleSubmit = async () => {
      await login(email.value, password.value);

      if (!errLogin.value) {
        console.log("Login is done ...");
      }
    };

    //Logout
    const handleLogout = () => {
      signOut(auth);
    };

    ///
    return {
      posts,
      visible,
      username,
      email,
      password,
      user,
      handleSignup,
      handleSubmit,
      handleLogout,
      isPending,
      visible2,
    };
  },
};
</script>

<style>
* {
  margin: 0;
}
.app__header {
  background-color: white;
  object-fit: contain;
  padding: 20px;
  border-bottom: 1px solid lightgrey;
  object-fit: contain;
  display: flex;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 1;
}

.app__headerImage {
  height: 40px;
  object-fit: contain;
}
.app__signup {
  display: flex;
  flex-direction: column;
}
.singup_input {
  border: 0;
  margin: 10px;
  outline: none;
  border-bottom: 1px solid grey;
}
input:focus {
  outline: none;
  border-bottom: 2px solid darkblue;
}
.btn_singup {
  background: transparent;
  text-transform: uppercase;
  border: 0;
  padding: 5px;
  margin-top: 8px;
}
.btn_singup_form {
  border: 0;
  background-color: transparent;
  padding: 4px;
  margin: 2px;
  box-sizing: border-box;
  text-transform: uppercase;
  cursor: pointer;
  transition: background-color 1s;
  font-weight: bold;
}
.btn_singup_form:hover {
  background-color: rgb(208, 207, 207);
}
.p-dialog-header-close-icon {
  margin: 5px;
  width: 20px;
  height: 20px;
}

.app__posts {
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>

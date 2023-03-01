import axios from "./config.axios";

const getJoke = async () => {
  const joke = await axios.post("/joke");
  return joke;
};

const likeJoke = async (id: string) => {
  const joke = await axios.post(`/joke/like/${id}`);
  return joke;
};

const dislikeJoke = async (id: string) => {
  const joke = await axios.post(`/joke/dislike/${id}`);
  return joke;
};

export { getJoke, likeJoke, dislikeJoke };

import { useEffect, useState } from "react";
import { getJoke, likeJoke, dislikeJoke } from "./api/jokeAPI";
import { Box, Stack, Button, Typography, Container } from "@mui/material";
import { getCookie } from "./utils/cookie";

function App() {
  const [joke, setJoke] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const handleNextJoke = async () => {
    setLoading(true);
    const expirationDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const expirationDateUTC = expirationDate.toUTCString();
    const data: any = await getJoke();
    const seenJokes = JSON.parse(getCookie("seenJokes") || "[]");
    if (!seenJokes.includes(data._id) && data.text) {
      seenJokes.push(data._id);
    }
    document.cookie = `seenJokes=${JSON.stringify(
      seenJokes
    )}; expires= + ${expirationDateUTC}; path=/`;
    setJoke(data);
    setLoading(false);
  };
  useEffect(() => {
    handleNextJoke();
  }, []);

  const handleLike = () => {
    if (joke) {
      likeJoke(joke._id).then((response) => {
        setJoke(response);
        handleNextJoke();
      });
    }
  };

  const handleDislike = () => {
    if (joke) {
      dislikeJoke(joke._id).then((response) => {
        setJoke(response);
        handleNextJoke();
      });
    }
  };

  if (!joke) {
    return <p>Loading...</p>;
  }
  return (
    <Container>
      <Box sx={{ background: "green", p: 4, color: "white" }}>
        <Typography variant="h3" component="h1" align="center">
          A joke a day keeps the doctor away
        </Typography>
        <Typography variant="h5" component="h2" align="center">
          If you joke wrong way, your teeth have to pay. (Serious)
        </Typography>
      </Box>
      {joke.text ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Stack spacing={2} direction="column">
            <Typography variant="h4" component="h1">
              {joke.text}
            </Typography>
            <Stack spacing={2} direction="row">
              <Button
                variant="contained"
                onClick={handleLike}
                color="success"
                sx={{ cursor: loading ? "not-allowed" : "pointer" }}
                disabled={loading}
              >
                This is funny
              </Button>
              <Button
                variant="contained"
                onClick={handleDislike}
                color="secondary"
                sx={{ cursor: loading ? "not-allowed" : "pointer" }}
                disabled={loading}
              >
                This is not funny
              </Button>
            </Stack>
          </Stack>
        </Box>
      ) : (
        <>
          {/* That's all the jokes for today! Come back another day! */}

          <Typography variant="h3" component="h1" align="center" sx={{ my: 2 }}>
            That's all the jokes for today! Come back another day!
          </Typography>
        </>
      )}
    </Container>
  );
}

export default App;

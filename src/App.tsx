import { Box, Container, Heading } from '@chakra-ui/react'

import Repositories from './pages/repositories'
import Developers from './pages/developers'
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Box padding="3rem 2rem" textAlign="center" borderBottom='1px'>
        <Container maxW='container.lg'>
          <Heading as="h1" marginBottom="0.5rem">Trending</Heading>
          <p>See what the GitHub community is most excited about today.</p>
        </Container>
      </Box>
      <Routes>
        <Route path="/" element={<Repositories />} />
        <Route path="/developers" element={<Developers />} />
      </Routes>
    </>
  );
}

export default App;

import Layout from "components/Layout";
import BookList from "pages/book";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<BookList />} index />
          <Route path="/book" element={<BookList />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;

import Layout from "components/Layout";
import BookList from "pages/book";
import CreateBook from "pages/book/create";
import BookDetail from "pages/book/detail";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<BookList />} index />
          <Route path="books" element={<BookList />} />
          <Route path="books/create" element={<CreateBook />} />
          <Route path="books/:id" element={<BookDetail />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;

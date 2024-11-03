import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css';
import BookList from "./components/BookList";
import AddBookForm from "./components/AddBookForm";
import EditBookForm from "./components/EditBookForm";
import NavBar from "./components/NavBar";
import { SearchProvider } from "./components/SearchProvider";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
        <SearchProvider>
          <NavBar />
          <BookList />
        </SearchProvider>
        </>
      ),
    },
    {
      path: "/add",
      element: (
        <>
        <SearchProvider>
          <NavBar />
          <AddBookForm />
        </SearchProvider>
        </>
      ),
    },
    {
      path: "/edit/:id",
      element: (
        <>
        <SearchProvider>
          <NavBar />
          <EditBookForm />
        </SearchProvider>
        </>
      ),
    },
  ]);
  return (
    <>
    <div>
      <RouterProvider
        router={router}
        future={{ v7_startTransition: true }}
        />
        </div>
    </>
  );
}

export default App;

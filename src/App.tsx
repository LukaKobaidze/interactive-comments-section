import Comments from './components/Comments/Comments';
import CommentContextProvider from './context/CommentContextProvider';
import './App.scss';

function App() {
  return (
    <>
      <h1 className="hidden">Interactive Comments Section</h1>
      <main className="main">
        <CommentContextProvider>
          <Comments />
        </CommentContextProvider>
      </main>
    </>
  );
}

export default App;

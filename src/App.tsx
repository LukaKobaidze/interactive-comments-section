import Comments from './components/Comments/Comments';
import CommentContextProvider from './context/CommentContextProvider';
import './App.scss';

function App() {
  return (
    <main className="main">
      <CommentContextProvider>
        <Comments />
      </CommentContextProvider>
    </main>
  );
}

export default App;

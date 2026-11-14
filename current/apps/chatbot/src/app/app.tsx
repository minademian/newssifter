import styled from 'styled-components';

import 'the-new-css-reset/css/reset.css';
import '../styles.scss';

import { ChatBot } from '@newssifter/ui';

const StyledApp = styled.div``;

export function App() {
  return (
    <StyledApp className="m-0 p-0 h-full">
      <div className="container m-auto grid grid-cols-3 grid-rows-8 gap-4">
        <div className="row-start-1 row-end-1 p-8"></div>
        <div className="col-start-2 row-start-3 row-end-7 p-8">
          <ChatBot></ChatBot>
        </div>
        <div className="row-start-7 row-end-8 p-8"></div>
      </div>
    </StyledApp>
  );
}

export default App;

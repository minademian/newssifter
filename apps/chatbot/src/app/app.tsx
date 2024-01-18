import styled from 'styled-components';

import 'the-new-css-reset/css/reset.css';
import '../styles.scss';

import { ChatBot } from '@newssifter/ui';

const StyledApp = styled.div``;

export function App() {
  return (
    <StyledApp className="m-0 p-0 h-screen">
      <div className="container m-auto grid grid-cols-3 grid-rows-8 gap-4">
        <div className=" col-span-2 row-start-2 row-end-8 p-8">
          <ChatBot></ChatBot>
        </div>
      </div>
    </StyledApp>
  );
}

export default App;

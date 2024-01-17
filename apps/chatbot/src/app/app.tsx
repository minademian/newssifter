import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import 'the-new-css-reset/css/reset.css';
import '../styles.scss';

import { SubmitButton, TextField, Heading } from '@newssifter/ui';

const StyledApp = styled.div``;

export function App() {
  const { t } = useTranslation();

  return (
    <StyledApp className="m-0 p-0 h-screen">
      <div className="container m-auto grid grid-rows-4 grid-cols-3 gap-4 md:grid-cols-5 lg:grid-cols-8">
        <div className="tile bg-teal-500 col-span-full"></div>
        <div className="tile bg-amber-500 col-span-1 md:col-span-2 lg:col-span-3"></div>
        <div className="tile bg-yellow-500 col-span-2 md:col-span-3 lg:col-span-5"></div>
        <div className="tile bg-lime-600"></div>
        <div className="tile bg-green-600 col-span-2 md:col-span-3 lg:col-span-6 p-8">
          <div className="flex content-center flex-col flex-wrap">
            <Heading label={t('chatbot.app-title')}></Heading>
            <TextField label={t('chatbot.cta-label')}></TextField>
            <SubmitButton
              label={t('chatbot.cta-btn')}
              className="border-indigo-500 bg-indigo-500 hover:bg-indigo-600"
            ></SubmitButton>
          </div>
        </div>
        <div className="tile bg-emerald-500"></div>
        <div className="tile bg-pink-500 h-60 row-start-4 md:col-span-full"></div>
      </div>
    </StyledApp>
  );
}

export default App;

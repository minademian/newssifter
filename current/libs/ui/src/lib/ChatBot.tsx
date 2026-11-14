import { useTranslation } from 'react-i18next';

import styled from 'styled-components';

import Grid from '@mui/material/Grid';

import { SubmitButton, Heading, SubHeading } from '@newssifter/ui';
import { Divider, Paper } from '@mui/material';

/* eslint-disable-next-line */
export interface ChatBotProps {}

const StyledChatBot = styled.div`
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.25);
`;

const StyledInput = styled.input``;

export function ChatBot(props: ChatBotProps) {
  const { t } = useTranslation();
  return (
    <StyledChatBot className="rounded-3xl w-auto">
      <Grid container className="flex flex-col">
        <div className="m-2">
          <Heading label={t('chatbot.app-title')}></Heading>
          <Divider></Divider>
        </div>
        <div className="bg-slate-200 p-3.5 m-2 rounded-xl size-9">
          <SubHeading label={t('chatbot.cta-label')}></SubHeading>
        </div>
        <Divider></Divider>
        <div className="flex flex-row justify-evenly m-2">
          <div>
            <label className="tracking-tight text-black text-xl px-2 py-4 flex-grow">
              <StyledInput
                type="text"
                placeholder={t('chatbot.cta-placeholder')}
                name="article"
                id="article"
                className="text-black"
              />
            </label>
          </div>
          <SubmitButton
            label={t('chatbot.cta-btn')}
            className=" bg-green-300 hover:bg-green-600"
          ></SubmitButton>
        </div>
      </Grid>
    </StyledChatBot>
  );
}

import { useTranslation } from 'react-i18next';
import { InfoNote } from '../InfoNote';
import {
  Container,
  Item,
  Ladder,
  Tab,
  Text,
  Title,
  Tone,
} from './StepsVariant1.styles';

const STEP_KEYS = ['enter', 'check', 'data', 'context'] as const;

export function StepsVariant1() {
  const { t } = useTranslation();

  return (
    <Container>
      <Ladder>
        {STEP_KEYS.map((key, index) => {
          const tone = (index + 1) as Tone;

          return (
            <Item key={key}>
              <Tab tone={tone} aria-hidden="true">
                {String(tone).padStart(2, '0')}
              </Tab>
              <div>
                <Title tone={tone}>{t(`steps.${key}.title`)}</Title>
                <Text>{t(`steps.${key}.text`)}</Text>
              </div>
            </Item>
          );
        })}
      </Ladder>
      <InfoNote />
    </Container>
  );
}

export default StepsVariant1;

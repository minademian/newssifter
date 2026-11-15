import { useTranslation } from "react-i18next";
import { HeadingWrap } from "../HeroLayout/HeroLayout.styles";

export function HeroHeading() {
  const { t } = useTranslation();

  return (
    <HeadingWrap>
      <h1>
        {t('hero.heading-line1')}
        <br />
        <em>{t('hero.heading-line2')}</em>
      </h1>
    </HeadingWrap>
  );
}

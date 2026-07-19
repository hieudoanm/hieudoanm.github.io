'use client';

import { ToolPage } from '../../_shared/ToolPage';
import { PrisonerDilemma } from '@hieudoanm.github.io/components/pages/games/trivia/PrisonerDilemma';

const GamesTriviaPd = () => {
  return <ToolPage Component={PrisonerDilemma} backPath="/games/trivia" />;
};
export default GamesTriviaPd;

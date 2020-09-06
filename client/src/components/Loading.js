import React from 'react';
import { css } from '@emotion/core';
import PacmanLoader from 'react-spinners/PacmanLoader';

const Loading = () => {
  return <PacmanLoader css={css} size={50} color={'#8FB5DE'} />;
};

export default Loading;

import { ReactNode } from 'react';

export type TPrivateRouteProps = {
  children?: ReactNode;
  onlyUnAuth?: boolean;
};

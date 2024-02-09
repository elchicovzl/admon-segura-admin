'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const ProgressBarProvider = ({ children }: { children: React.ReactNode }) => {
    return (
      <>
        {children}
        <ProgressBar
          height="5px"
          color="#114899"
          options={{ showSpinner: true }}
          shallowRouting
        />
      </>
    );
  };
  
  export default ProgressBarProvider;
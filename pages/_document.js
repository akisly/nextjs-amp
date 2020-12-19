import Document, { Html, Head, Main, NextScript } from 'next/document'
import { useAmp } from 'next/amp'
import Sidebar from "../src/components/Sidebar";
import { GA_TRACKING_ID } from '../lib/gtag'
import AmpAnalytics from '../src/components/amp/AmpAnalytics'

function AmpWrap({ ampOnly, nonAmp }) {
  const isAmp = useAmp();
  if (ampOnly) return isAmp && ampOnly;
  return !isAmp && nonAmp;
}

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }
  
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Sidebar />
          <Main />
          <NextScript />
          <AmpWrap
            ampOnly={
              <AmpAnalytics
                type="googleanalytics"
                script={{
                  vars: {
                    account: GA_TRACKING_ID,
                    gtag_id: GA_TRACKING_ID,
                    config: {
                      [GA_TRACKING_ID]: { groups: 'default' },
                    },
                  },
                  triggers: {
                    trackPageview: {
                      on: 'visible',
                      request: 'pageview',
                    },
                  },
                }}
              />
            }
          />
        </body>
      </Html>
    )
  }
}

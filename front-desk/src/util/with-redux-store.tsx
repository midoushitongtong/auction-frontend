import React from 'react';
import { initializeStore } from '../store/index';

const isServer = typeof window === 'undefined';
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__';

function getOrCreateStore(initialState?: any) {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return initializeStore(initialState);
  }

  // Create store if unavailable on the client and set it on the window object
  if (!(window as any)[__NEXT_REDUX_STORE__]) {
    (window as any)[__NEXT_REDUX_STORE__] = initializeStore(initialState);
  }
  return (window as any)[__NEXT_REDUX_STORE__];
}

export default (App: any) => {
  return class AppWithRedux extends React.Component {
    public store: any;

    public static getInitialProps = async (appContext: any) => {
      // Get or Create the store with `undefined` as initialState
      // This allows you to set a custom default initialState
      const store = getOrCreateStore();

      // Provide the store to getInitialProps of pages
      appContext.ctx.store = store;

      let appProps = {};
      if (typeof App.getInitialProps === 'function') {
        appProps = await App.getInitialProps(appContext);
      }

      return {
        ...appProps,
        initialReduxState: store.getState()
      };
    };

    public constructor(props: any) {
      super(props);
      this.store = getOrCreateStore(props.initialReduxState);
    };

    public render = (): JSX.Element => {
      return <App {...this.props} store={this.store}/>;
    }
  };
}

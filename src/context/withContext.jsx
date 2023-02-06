export default function withContext(Component, Provider) {
  return function WithContextProvider(props) {
    return (
      <Provider>
        <Component {...props} />
      </Provider>
    );
  };
}

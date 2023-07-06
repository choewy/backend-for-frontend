export const AppService = () => {
  const getMessage = () => {
    return 'hi, there!';
  };

  const getVersion = () => {
    return '1.0.0';
  };

  return { getMessage, getVersion };
};

import { useHistory } from 'react-router-dom';

export const useNavigation = () => {
  const history = useHistory();

  return {
    navigateToLink: (link) => history.push(link),
  };
};

import { render } from '@testing-library/react-native';
import { HelloWave } from '../hello-wave';

describe('HelloWave', () => {
  it('renders correctly', () => {
    const { getByText } = render(<HelloWave />);
    expect(getByText('👋')).toBeTruthy();
  });
});
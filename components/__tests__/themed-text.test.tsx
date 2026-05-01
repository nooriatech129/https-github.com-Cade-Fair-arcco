import { render } from '@testing-library/react-native';
import { ThemedText } from '../themed-text';

// Mock the hook
jest.mock('@/hooks/use-theme-color', () => ({
  useThemeColor: jest.fn(() => '#000000'),
}));

describe('ThemedText', () => {
  it('renders with default type', () => {
    const { getByText } = render(<ThemedText>Test Text</ThemedText>);
    expect(getByText('Test Text')).toBeTruthy();
  });

  it('renders with title type', () => {
    const { getByText } = render(<ThemedText type="title">Title Text</ThemedText>);
    expect(getByText('Title Text')).toBeTruthy();
  });

  it('applies custom style', () => {
    const { getByText } = render(
      <ThemedText style={{ fontSize: 20 }}>Styled Text</ThemedText>
    );
    const text = getByText('Styled Text');
    expect(text.props.style).toContainEqual({ fontSize: 20 });
  });
});
import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

const API_URL = 'http://localhost:8000/recommendations';

type Recommendation = {
  id: string;
  title: string;
  description?: string;
};

export default function HomeScreen() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          days: ['Mon'],
          start_hour: 9,
          end_hour: 17,
        }),
      });

      if (!response.ok) throw new Error('API unavailable');

      const data = await response.json();
      setRecommendations(data.recommendations ?? []);

    } catch (err) {
      setError('Unable to load occupancy data right now.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Recommendations</ThemedText>
      </ThemedView>

      {loading && (
        <ThemedView style={styles.stateContainer}>
          <ActivityIndicator size="large" />
          <ThemedText>Loading occupancy data...</ThemedText>
        </ThemedView>
      )}

      {!loading && error && (
        <ThemedView style={styles.stateContainer}>
          <ThemedText style={styles.errorText}>{error}</ThemedText>
          <ThemedText onPress={fetchRecommendations} style={styles.retryText}>
            Tap to retry
          </ThemedText>
        </ThemedView>
      )}

      {!loading && !error && recommendations.length === 0 && (
        <ThemedView style={styles.stateContainer}>
          <ThemedText>No recommendations found.</ThemedText>
        </ThemedView>
      )}

      {!loading && !error && recommendations.map((item) => (
        <ThemedView key={item.id} style={styles.card}>
          <ThemedText type="subtitle">{item.title}</ThemedText>
          {item.description && <ThemedText>{item.description}</ThemedText>}
        </ThemedView>
      ))}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  stateContainer: {
    alignItems: 'center',
    gap: 8,
    padding: 16,
  },
  card: {
    gap: 4,
    marginBottom: 12,
    padding: 12,
    borderRadius: 8,
  },
  errorText: {
    color: '#e74c3c',
    textAlign: 'center',
  },
  retryText: {
    color: '#3498db',
    textDecorationLine: 'underline',
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
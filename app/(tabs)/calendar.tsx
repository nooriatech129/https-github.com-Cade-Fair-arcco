import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useState } from 'react';
import { Alert, FlatList, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';

interface Event {
  id: string;
  date: string;
  title: string;
}

interface Recommendation {
  day: string;
  hour: number;
  occupancy: number;
}

interface Task {
  id: string;
  title: string;
  done: boolean;
}

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [events, setEvents] = useState<Event[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);

  const addEvent = () => {
    if (selectedDate && eventTitle) {
      const newEvent: Event = {
        id: Date.now().toString(),
        addTask = () => {
    if (taskTitle) {
      const newTask: Task = {
        id: Date.now().toString(),
        title: taskTitle,
        done: false,
      };
      setTasks([...tasks, newTask]);
      setTaskTitle('');
    }
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, done: !task.done } : task));   method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ days: [day], start_hour: 9, end_hour: 17 }),
      });
      const data = await response.json();
      setRecommendations(data.recommendations || []);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch recommendations');
    }
  };
  <ThemedView style={styles.container}>
      <ThemedText type="title">ARRCO Calendar</ThemedText>
      <ThemedText type="subtitle">Tasks</ThemedText>
      <TextInput
        style={styles.input}
        placeholder="Add a task"
        value={taskTitle}
        onChangeText={setTaskTitle}
      />
      <TouchableOpacity style={styles.button} onPress={addTask}>
        <ThemedText>Add Task</ThemedText>
      </TouchableOpacity>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => toggleTask(item.id)}>
            <ThemedText style={item.done ? styles.done : undefined}>
              {item.done ? '✓ ' : ''}{item.title}
            </ThemedText>
          </TouchableOpacity>
        )}
      />
      <ThemedText type="subtitle">Eventsr: 'blue' };
    return acc;
  }, {} as any);

  const selectedEvents = events.filter(event => event.date === selectedDate);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">ARRCO Calendar</ThemedText>
      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={markedDates}
      />
      {selectedDate && (
        <>
          <ThemedText>Selected: {selectedDate}</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Event title"
            value={eventTitle}
            onChangeText={setEventTitle}
          />
          <TouchableOpacity style={styles.button} onPress={addEvent}>
            <ThemedText>Add Event</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={getRecommendations}>
            <ThemedText>Find Best Time</ThemedText>
          </TouchableOpacity>
          <FlatList
            data={selectedEvents}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ThemedText>{item.title}</ThemedText>}
          />
          {recommendations.length > 0 && (
            <>
              <ThemedText type="subtitle">Recommended Times:</ThemedText>
              <FlatList
                data={recommendations}
                keyExtractor={(item) => `${item.day}-${item.hour}`}
                renderItem={({ item }) => (
                  <ThemedText>{item.hour}:00 - Occupancy: {item.occupancy}</ThemedText>
                )}
              />
            </>
          )}
        </>
      )}
  done: {
    textDecorationLine: 'line-through',
    color: '#888',
  }, </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    alignItems: 'center',
    marginVertical: 5,
  },
});
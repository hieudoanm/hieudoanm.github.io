import { useEffect, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

interface Task {
  id: number;
  text: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

let nextId = 1;

function loadTasks(): Task[] {
  return [];
}

function saveTasks(_tasks: Task[]) {
  void _tasks;
}

export function TasksTab() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    setTasks(loadTasks());
  }, []);

  const handleAdd = () => {
    if (!newTask.trim()) return;
    const task: Task = {
      id: nextId++,
      text: newTask.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updated = [...tasks, task];
    saveTasks(updated);
    setTasks(updated);
    setNewTask('');
  };

  const handleToggle = (task: Task) => {
    const updated = tasks.map((t) =>
      t.id === task.id ? { ...t, completed: !t.completed } : t
    );
    saveTasks(updated);
    setTasks(updated);
  };

  const handleDelete = (id: number) => {
    const updated = tasks.filter((t) => t.id !== id);
    saveTasks(updated);
    setTasks(updated);
  };

  const pending = tasks.filter((t) => !t.completed).length;

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          value={newTask}
          onChangeText={setNewTask}
          placeholder="New task…"
          placeholderTextColor="rgba(220,165,77,0.6)"
          style={styles.input}
          onSubmitEditing={handleAdd}
          returnKeyType="done"
        />
        <Pressable
          onPress={handleAdd}
          disabled={!newTask.trim()}
          style={({ pressed }) => [
            styles.addButton,
            pressed && styles.buttonPressed,
            !newTask.trim() && styles.addButtonDisabled,
          ]}>
          <Text style={styles.addButtonText}>+</Text>
        </Pressable>
      </View>
      <ScrollView style={styles.scrollArea}>
        {tasks.length === 0 ? (
          <Text style={styles.empty}>No tasks yet.</Text>
        ) : (
          <View style={styles.taskList}>
            {tasks.map((task) => (
              <View key={task.id} style={styles.taskRow}>
                <Pressable
                  onPress={() => handleToggle(task)}
                  style={[
                    styles.checkbox,
                    task.completed && styles.checkboxChecked,
                  ]}>
                  {task.completed && <Text style={styles.checkmark}>✓</Text>}
                </Pressable>
                <Text
                  style={[
                    styles.taskText,
                    task.completed && styles.taskTextCompleted,
                  ]}
                  numberOfLines={1}>
                  {task.text}
                </Text>
                <Pressable
                  onPress={() => handleDelete(task.id)}
                  style={({ pressed }) => [
                    styles.deleteButton,
                    pressed && styles.deleteButtonPressed,
                  ]}>
                  <Text style={styles.deleteText}>✕</Text>
                </Pressable>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {pending} pending · {tasks.length} total
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  inputContainer: {
    flexDirection: 'row',
    gap: 8,
    borderBottomWidth: 1,
    borderColor: '#1e1d1f',
    padding: 12,
  },
  input: {
    flex: 1,
    backgroundColor: '#171618',
    borderWidth: 1,
    borderColor: '#1e1d1f',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    fontSize: 12,
    color: '#fff',
  },
  addButton: {
    backgroundColor: '#ffffff',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonDisabled: { opacity: 0.4 },
  addButtonText: { color: '#161616', fontSize: 18, fontWeight: '700' },
  buttonPressed: { opacity: 0.8 },
  scrollArea: { flex: 1 },
  taskList: { padding: 12, gap: 2 },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: { backgroundColor: '#ffffff' },
  checkmark: { color: '#161616', fontSize: 10, fontWeight: '700' },
  taskText: { flex: 1, fontSize: 12, color: '#fff' },
  taskTextCompleted: { opacity: 0.3, textDecorationLine: 'line-through' },
  deleteButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
  },
  deleteButtonPressed: { opacity: 1, backgroundColor: '#e7000b' },
  deleteText: { color: '#ef4444', fontSize: 10 },
  empty: {
    color: 'rgba(220,165,77,0.6)',
    textAlign: 'center',
    paddingVertical: 32,
    fontSize: 12,
  },
  footer: {
    borderTopWidth: 1,
    borderColor: '#1e1d1f',
    padding: 16,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 10,
    letterSpacing: 1,
    textTransform: 'uppercase',
    opacity: 0.2,
    fontFamily: 'ui-monospace',
    color: '#fff',
  },
});

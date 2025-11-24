import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { auth, db } from './firebaseConfig';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [workouts, setWorkouts] = useState([]);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (user) {
      const userRef = doc(db, 'users', user.uid);
      const unsubscribe = onSnapshot(userRef, (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          setUserData(data.user);
          // Sort workouts by date descending
          const sortedWorkouts = (data.workouts || []).sort((a, b) => new Date(b.date) - new Date(a.date));
          setWorkouts(sortedWorkouts);
        }
      });
      return unsubscribe;
    }
  }, [user]);

  const handleLogin = async () => {
    try {
      setError('');
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#8B5CF6" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>💪 Shokunin</Text>
        <Text style={styles.subtitle}>Login to sync your workouts</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#666"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#666"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <StatusBar style="light" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Workout History</Text>
          <Text style={styles.headerSubtitle}>Welcome back, {userData?.name || 'Athlete'}</Text>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
          <Text style={styles.logoutText}>🚪</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={workouts}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.date}>{new Date(item.date).toLocaleDateString()}</Text>
                <Text style={styles.exercisesCount}>{item.exercises.length} Exercises</Text>
              </View>
              <View style={styles.xpBadge}>
                <Text style={styles.xpText}>+{item.xpEarned} XP</Text>
              </View>
            </View>
            <View style={styles.exercisesList}>
              {item.exercises.slice(0, 3).map((ex, i) => (
                <Text key={i} style={styles.exerciseTag}>{ex.name}</Text>
              ))}
              {item.exercises.length > 3 && (
                <Text style={styles.moreTag}>+{item.exercises.length - 3} more</Text>
              )}
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No workouts recorded yet.</Text>
            <Text style={styles.emptySubtext}>Complete a workout on the web app to see it here!</Text>
          </View>
        }
      />
      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f1115',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#0f1115',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#9ca3af',
    marginBottom: 40,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#1f2937',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    color: '#fff',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#374151',
  },
  button: {
    backgroundColor: '#8B5CF6',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  error: {
    color: '#ef4444',
    marginBottom: 20,
    textAlign: 'center',
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#9ca3af',
  },
  logoutBtn: {
    padding: 10,
    backgroundColor: '#1f2937',
    borderRadius: 8,
  },
  logoutText: {
    fontSize: 20,
  },
  listContent: {
    padding: 20,
  },
  card: {
    backgroundColor: '#1f2937',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#374151',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  date: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  exercisesCount: {
    fontSize: 14,
    color: '#9ca3af',
  },
  xpBadge: {
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  xpText: {
    color: '#8B5CF6',
    fontWeight: 'bold',
    fontSize: 14,
  },
  exercisesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  exerciseTag: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    color: '#d1d5db',
    fontSize: 12,
    overflow: 'hidden',
    marginBottom: 4,
    marginRight: 4,
  },
  moreTag: {
    color: '#9ca3af',
    fontSize: 12,
    paddingVertical: 4,
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 8,
  },
  emptySubtext: {
    color: '#9ca3af',
    textAlign: 'center',
  },
});

/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const CountdownTimerApp = () => {
  const [inputHours, setInputHours] = useState('');
  const [inputMinutes, setInputMinutes] = useState('');
  const [remainingTime, setRemainingTime] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [pausedTime, setPausedTime] = useState(0);

  useEffect(() => {
    let interval;
    if (timerActive) {
      interval = setInterval(() => {
        setRemainingTime(prevTime => {
          if (prevTime === 0) {
            stopCountdown();
            return 0;
          } else {
            return prevTime - 1;
          }
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerActive]);

  const startCountdown = () => {
    const hours = parseInt(inputHours);
    const minutes = parseInt(inputMinutes);
    if (!isNaN(hours) && !isNaN(minutes) && (hours >= 0 && hours <= 24) && (minutes >= 0 && minutes <= 60)) {
      setRemainingTime((hours * 60 + minutes) * 60);
      setTimerActive(true);
    }
  };

  const stopCountdown = () => {
    setTimerActive(false);
    setPausedTime(remainingTime);
  };

  const resumeCountdown = () => {
    if (pausedTime > 0) {
      setRemainingTime(pausedTime);
      setTimerActive(true);
    }
  };

  const formatTime = timeInSeconds => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Đồng hồ đếm ngược</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Giờ"
          keyboardType="numeric"
          value={inputHours}
          onChangeText={text => {
            const hours = parseInt(text);
            if (!isNaN(hours) && hours >= 0 && hours <= 24) {
              setInputHours(text);
            }
          }}
        />
        <Text style={styles.separator}>:</Text>
        <TextInput
          style={styles.input}
          placeholder="Phút"
          keyboardType="numeric"
          value={inputMinutes}
          onChangeText={text => {
            const minutes = parseInt(text);
            if (!isNaN(minutes) && minutes >= 0 && minutes <= 60) {
              setInputMinutes(text);
            }
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={startCountdown}>
          <Text style={styles.buttonText}>Bắt đầu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: 'red' }]} onPress={stopCountdown}>
          <Text style={styles.buttonText}>Dừng</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: 'green' }]} onPress={resumeCountdown}>
          <Text style={styles.buttonText}>Tiếp tục</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.timer}>{formatTime(remainingTime)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    width: 80,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 10,
  },
  separator: {
    fontSize: 24,
    marginHorizontal: 5,
    alignSelf: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginBottom: 20,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue', // Màu mặc định của nút
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  timer: {
    fontSize: 40,
    marginTop: 20,
  },
});

export default CountdownTimerApp;

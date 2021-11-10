import React, {useState} from 'react'
import {Text, View, StyleSheet, Vibration, Platform} from 'react-native'
import {ProgressBar} from 'react-native-paper'
import {useKeepAwake} from 'expo-keep-awake'

import {colors} from '../../utils/colors'
import {spacing} from '../../utils/sizes'
import {Countdown} from '../../components/Countdown'
import {RoundedButton} from '../../components/RoundedButton'
import {Timing} from './Timing'

const DEFAULT_TIME = 0.1

export const Timer = ({focusSubject, onTimerEnd, clearSubject}) => {
  useKeepAwake()

  const [minutes, setMinutes] = useState(DEFAULT_TIME)
  const [isStarted, setIsStarted] = useState(false)
  const [progress, setProgress] = useState(1)

  const onProgress = (progress) => {
    setProgress(progress)
  }

  const vibrate = () => {
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), 1000)

      setTimeout(() => clearInterval(interval), 10000)
    } else {
      Vibration.vibrate(10000)
    }
  }

  const onEnd = () => {
    vibrate()
    setMinutes(DEFAULT_TIME)
    setProgress(1)
    setIsStarted(false)
    onTimerEnd()
  }

  const changeTime = (min) => {
    setMinutes(min)
    setProgress(1)
    setIsStarted(false)
  }

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={onProgress}
          onEnd={onEnd}
        />
      </View>
      <View style={styles.focusContainer}>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>

      {/* Progress bar */}
      <View style={styles.progressBarContainer}>
        <ProgressBar
          progress={progress}
          color='#5e84e2'
          style={styles.progressBar}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Timing onChangeTime={changeTime} />
      </View>

      {/* Start / Stop button */}
      <View style={styles.buttonContainer}>
        {isStarted ? (
          <RoundedButton title='pause' onPress={() => setIsStarted(false)} />
        ) : (
          <RoundedButton title='start' onPress={() => setIsStarted(true)} />
        )}
      </View>
      <View style={styles.clearSubject}>
        <RoundedButton title='-' size={50} onPress={() => clearSubject()} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  focusContainer: {
    paddingTop: spacing.xxl,
  },
  title: {
    color: colors.white,
    textAlign: 'center',
  },
  task: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    flex: 0.3,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBarContainer: {
    paddingTop: spacing.sm,
  },
  progressBar: {
    height: 10,
  },
  clearSubject: {
    paddingBottom: 25,
    paddingLeft: 25,
  },
})

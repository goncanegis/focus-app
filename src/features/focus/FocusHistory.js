import React from 'react'
import {Text, StyleSheet, FlatList, SafeAreaView, View} from 'react-native'

import {fontSizes, spacing} from '../../utils/sizes'
import {RoundedButton} from '../../components/RoundedButton'

export const FocusHistory = ({focusHistory, onClear}) => {
  const clearHistory = () => {
    onClear()
  }

  const HistoryItem = ({item, index}) => {
    return <Text style={styles.historyItem(item.status)}>{item.subject}</Text>
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        {!!focusHistory.length && (
          <>
            <Text style={styles.title}>Things we've focused on</Text>

            <FlatList
              style={{flex: 1}}
              contentContainerStyle={{flex: 1, alignItems: 'center'}}
              data={focusHistory}
              renderItem={HistoryItem}
            />
            <View style={styles.clearContainer}>
              <RoundedButton
                size={75}
                title='clear'
                onPress={() => onClear()}
              />
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  historyItem: (status) => ({
    color: status > 1 ? 'red' : 'green',
    fontSize: fontSizes.md,
  }),
  title: {
    color: 'white',
    fontSize: fontSizes.lg,
  },
  clearContainer: {
    alignItems: 'center',
    padding: spacing.md,
  },
})

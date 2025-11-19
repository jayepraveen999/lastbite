import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { GestureDetector, Gesture, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    runOnJS,
    interpolate,
    Extrapolate
} from 'react-native-reanimated';
import FoodCard from './FoodCard';
import { COLORS } from '../constants/theme';

const { width, height } = Dimensions.get('window');
const SWIPE_THRESHOLD = width * 0.3;

const SwipeDeck = ({ data, onSwipeLeft, onSwipeRight }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const currentItem = data[currentIndex];
    const nextItem = data[currentIndex + 1];

    const handleSwipeComplete = (direction) => {
        if (direction === 'right') {
            onSwipeRight && onSwipeRight(currentItem);
        } else {
            onSwipeLeft && onSwipeLeft(currentItem);
        }
        setCurrentIndex((prev) => prev + 1);
        translateX.value = 0;
        translateY.value = 0;
    };

    const pan = Gesture.Pan()
        .onUpdate((event) => {
            translateX.value = event.translationX;
            translateY.value = event.translationY;
        })
        .onEnd((event) => {
            if (Math.abs(event.translationX) > SWIPE_THRESHOLD) {
                const direction = event.translationX > 0 ? 'right' : 'left';
                translateX.value = withSpring(direction === 'right' ? width * 1.5 : -width * 1.5, {}, () => {
                    runOnJS(handleSwipeComplete)(direction);
                });
            } else {
                translateX.value = withSpring(0);
                translateY.value = withSpring(0);
            }
        });

    const animatedStyle = useAnimatedStyle(() => {
        const rotate = interpolate(
            translateX.value,
            [-width / 2, 0, width / 2],
            [-10, 0, 10],
            Extrapolate.CLAMP
        );

        return {
            transform: [
                { translateX: translateX.value },
                { translateY: translateY.value },
                { rotate: `${rotate}deg` },
            ],
        };
    });

    if (currentIndex >= data.length) {
        return (
            <View style={styles.container}>
                <View style={styles.emptyState}>
                    <Text style={styles.emptyText}>No more food nearby!</Text>
                    <Text style={styles.emptySubText}>Check back later or post your own.</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {nextItem && (
                <View style={[styles.cardContainer, styles.nextCard]}>
                    <FoodCard item={nextItem} />
                </View>
            )}

            <GestureDetector gesture={pan}>
                <Animated.View style={[styles.cardContainer, animatedStyle]}>
                    <FoodCard item={currentItem} />
                </Animated.View>
            </GestureDetector>
        </View>
    );
};

import { Text } from 'react-native'; // Import Text here to avoid conflict with Animated.Text if used

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardContainer: {
        position: 'absolute',
        zIndex: 1,
    },
    nextCard: {
        zIndex: 0,
        transform: [{ scale: 0.95 }, { translateY: 10 }],
        opacity: 0.8,
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 8,
    },
    emptySubText: {
        fontSize: 16,
        color: COLORS.textLight,
    },
});

export default SwipeDeck;

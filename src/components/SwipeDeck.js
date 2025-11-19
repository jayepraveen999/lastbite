import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
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

const { width } = Dimensions.get('window');
const SWIPE_THRESHOLD = width * 0.3;

// Inner component that handles the gesture and animation for a SINGLE card
const SwipeableCard = forwardRef(({ item, onSwipeComplete }, ref) => {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    useImperativeHandle(ref, () => ({
        swipeLeft: () => {
            translateX.value = withSpring(-width * 1.5, {}, () => {
                runOnJS(onSwipeComplete)('left');
            });
        },
        swipeRight: () => {
            translateX.value = withSpring(width * 1.5, {}, () => {
                runOnJS(onSwipeComplete)('right');
            });
        }
    }));

    const pan = Gesture.Pan()
        .onUpdate((event) => {
            translateX.value = event.translationX;
            translateY.value = event.translationY;
        })
        .onEnd((event) => {
            if (Math.abs(event.translationX) > SWIPE_THRESHOLD) {
                const direction = event.translationX > 0 ? 'right' : 'left';
                translateX.value = withSpring(direction === 'right' ? width * 1.5 : -width * 1.5, {}, () => {
                    runOnJS(onSwipeComplete)(direction);
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

    return (
        <GestureDetector gesture={pan}>
            <Animated.View style={[styles.cardContainer, animatedStyle]}>
                <FoodCard item={item} />
            </Animated.View>
        </GestureDetector>
    );
});

const SwipeDeck = ({ data, onSwipeLeft, onSwipeRight, onSwipeLeftPress, onSwipeRightPress }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentCardRef = useRef(null);

    const currentItem = data[currentIndex];
    const nextItem = data[currentIndex + 1];

    // Connect external triggers to the current card
    useEffect(() => {
        if (onSwipeLeftPress) {
            onSwipeLeftPress.current = () => {
                currentCardRef.current?.swipeLeft();
            };
        }
        if (onSwipeRightPress) {
            onSwipeRightPress.current = () => {
                currentCardRef.current?.swipeRight();
            };
        }
    }, [onSwipeLeftPress, onSwipeRightPress, currentIndex]); // Re-bind when index changes

    const handleSwipeComplete = (direction) => {
        const item = data[currentIndex];
        if (!item) return;

        if (direction === 'right') {
            onSwipeRight && onSwipeRight(item);
        } else {
            onSwipeLeft && onSwipeLeft(item);
        }

        // Just update index - the key prop will handle the reset!
        setCurrentIndex((prev) => prev + 1);
    };

    if (currentIndex >= data.length || !currentItem) {
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
                    <FoodCard key={nextItem.id} item={nextItem} />
                </View>
            )}

            {/* 
                KEY PROP IS CRITICAL HERE:
                When key changes (new item), React unmounts the old SwipeableCard 
                (destroying its state) and mounts a new one (with fresh state).
                This prevents the "flash back" and image flickering.
            */}
            <SwipeableCard
                key={currentItem.id}
                ref={currentCardRef}
                item={currentItem}
                onSwipeComplete={handleSwipeComplete}
            />
        </View>
    );
};

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

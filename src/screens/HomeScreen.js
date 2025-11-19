import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import SwipeDeck from '../components/SwipeDeck';
import { COLORS } from '../constants/theme';

const MOCK_DATA = [
    {
        id: '1',
        title: 'Homemade Lasagna',
        image: 'https://images.unsplash.com/photo-1574868235872-651e3a837d28?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        distance: '0.5 km',
        expiry: '2h',
        tags: ['Italian', 'Non-Veg'],
    },
    {
        id: '2',
        title: 'Fresh Sourdough Bread',
        image: 'https://images.unsplash.com/photo-1585478259539-e6215b19064b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        distance: '1.2 km',
        expiry: '5h',
        tags: ['Bakery', 'Veg'],
    },
    {
        id: '3',
        title: 'Vegetable Biryani',
        image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        distance: '0.8 km',
        expiry: '3h',
        tags: ['Indian', 'Veg', 'Spicy'],
    },
    {
        id: '4',
        title: 'Chocolate Chip Cookies',
        image: 'https://images.unsplash.com/photo-1499636138143-bd649025ebeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        distance: '2.0 km',
        expiry: '24h',
        tags: ['Dessert', 'Sweet'],
    },
];

const HomeScreen = () => {
    const handleSwipeLeft = (item) => {
        console.log('Passed:', item.title);
    };

    const handleSwipeRight = (item) => {
        console.log('Liked:', item.title);
        // Navigate to Match/Chat screen or show match animation
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <SwipeDeck
                    data={MOCK_DATA}
                    onSwipeLeft={handleSwipeLeft}
                    onSwipeRight={handleSwipeRight}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default HomeScreen;

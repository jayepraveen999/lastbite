import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MapPin, Clock } from 'lucide-react-native';
import { COLORS, SPACING, FONT_SIZE, SHADOWS } from '../constants/theme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;
const CARD_HEIGHT = CARD_WIDTH * 1.4;

const FoodCard = ({ item }) => {
    return (
        <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />

            <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.8)']}
                style={styles.gradient}
            >
                <View style={styles.content}>
                    <View style={styles.tagContainer}>
                        {item.tags.map((tag, index) => (
                            <View key={index} style={styles.tag}>
                                <Text style={styles.tagText}>{tag}</Text>
                            </View>
                        ))}
                    </View>

                    <Text style={styles.title}>{item.title}</Text>

                    <View style={styles.row}>
                        <View style={styles.infoItem}>
                            <MapPin size={14} color={COLORS.white} />
                            <Text style={styles.infoText}>{item.distance}</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Clock size={14} color={COLORS.white} />
                            <Text style={styles.infoText}>{item.expiry}</Text>
                        </View>
                    </View>
                </View>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        borderRadius: 20,
        backgroundColor: COLORS.white,
        overflow: 'hidden',
        ...SHADOWS.medium,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '40%',
        justifyContent: 'flex-end',
        padding: SPACING.m,
    },
    content: {
        gap: SPACING.xs,
    },
    tagContainer: {
        flexDirection: 'row',
        gap: SPACING.xs,
        marginBottom: SPACING.xs,
    },
    tag: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: SPACING.s,
        paddingVertical: SPACING.xs,
        borderRadius: 12,
    },
    tagText: {
        color: COLORS.white,
        fontSize: FONT_SIZE.xs,
        fontWeight: '600',
    },
    title: {
        color: COLORS.white,
        fontSize: FONT_SIZE.xl,
        fontWeight: 'bold',
    },
    row: {
        flexDirection: 'row',
        gap: SPACING.m,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    infoText: {
        color: COLORS.white,
        fontSize: FONT_SIZE.s,
        opacity: 0.9,
    },
});

export default FoodCard;

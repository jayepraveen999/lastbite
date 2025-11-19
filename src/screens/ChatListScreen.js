import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, FONT_SIZE } from '../constants/theme';

const MOCK_CHATS = [
    {
        id: '1',
        name: 'Alex',
        lastMessage: 'Is the lasagna still available?',
        time: '2m ago',
        avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
        unread: 2,
    },
    {
        id: '2',
        name: 'Sarah',
        lastMessage: 'Great, I can pick it up in 10 mins.',
        time: '1h ago',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
        unread: 0,
    },
];

const ChatListScreen = ({ navigation }) => {
    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.chatItem}
            onPress={() => navigation.navigate('ChatDetail', { name: item.name })}
        >
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={styles.chatInfo}>
                <View style={styles.header}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.time}>{item.time}</Text>
                </View>
                <Text style={styles.lastMessage} numberOfLines={1}>{item.lastMessage}</Text>
            </View>
            {item.unread > 0 && (
                <View style={styles.unreadBadge}>
                    <Text style={styles.unreadText}>{item.unread}</Text>
                </View>
            )}
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.screenTitle}>Messages</Text>
            </View>
            <FlatList
                data={MOCK_CHATS}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    headerContainer: {
        padding: SPACING.m,
        backgroundColor: COLORS.white,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    screenTitle: {
        fontSize: FONT_SIZE.xl,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    list: {
        padding: SPACING.m,
    },
    chatItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SPACING.m,
        backgroundColor: COLORS.white,
        borderRadius: 12,
        marginBottom: SPACING.s,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: SPACING.m,
    },
    chatInfo: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    name: {
        fontSize: FONT_SIZE.m,
        fontWeight: '600',
        color: COLORS.text,
    },
    time: {
        fontSize: FONT_SIZE.xs,
        color: COLORS.textLight,
    },
    lastMessage: {
        fontSize: FONT_SIZE.s,
        color: COLORS.textLight,
    },
    unreadBadge: {
        backgroundColor: COLORS.primary,
        width: 20,
        height: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: SPACING.s,
    },
    unreadText: {
        color: COLORS.white,
        fontSize: 10,
        fontWeight: 'bold',
    },
});

export default ChatListScreen;

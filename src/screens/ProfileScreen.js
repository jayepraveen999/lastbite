import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Settings, Award, Heart, LogOut, ChevronRight } from 'lucide-react-native';
import { COLORS, SPACING, FONT_SIZE, SHADOWS } from '../constants/theme';
import { auth } from '../config/firebaseConfig';

const ProfileScreen = () => {
    // Get anonymous username from Firebase Auth
    const currentUser = auth.currentUser;
    const username = currentUser?.displayName || 'Anonymous';
    const email = currentUser?.email || '';

    // TODO: Fetch real stats from Firestore
    const stats = {
        shared: 0,
        rescued: 0,
        karma: 0,
    };

    const MenuItem = ({ icon: Icon, title, subtitle, color = COLORS.text }) => (
        <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
                <Icon size={24} color={color} />
            </View>
            <View style={styles.menuTextContainer}>
                <Text style={[styles.menuTitle, { color }]}>{title}</Text>
                {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
            </View>
            <ChevronRight size={20} color={COLORS.textLight} />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.header}>
                    <View style={styles.avatarPlaceholder}>
                        <Text style={styles.avatarText}>{username.charAt(0).toUpperCase()}</Text>
                    </View>
                    <Text style={styles.name}>{username}</Text>
                    <Text style={styles.email}>{email}</Text>
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>{stats.shared}</Text>
                        <Text style={styles.statLabel}>Shared</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>{stats.rescued}</Text>
                        <Text style={styles.statLabel}>Rescued</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                        <Text style={[styles.statValue, { color: COLORS.primary }]}>{stats.karma}</Text>
                        <Text style={styles.statLabel}>Karma</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Account</Text>
                    <MenuItem icon={Settings} title="Settings" subtitle="Notifications, Privacy" />
                    <MenuItem icon={Award} title="Achievements" subtitle="Level 3 Food Saver" />
                    <MenuItem icon={Heart} title="Favorites" subtitle="Saved items" />
                </View>

                <View style={styles.section}>
                    <TouchableOpacity style={styles.logoutButton} onPress={() => auth.signOut()}>
                        <LogOut size={20} color={COLORS.error} />
                        <Text style={styles.logoutText}>Log Out</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    content: {
        padding: SPACING.l,
    },
    header: {
        alignItems: 'center',
        marginBottom: SPACING.xl,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: SPACING.m,
        borderWidth: 3,
        borderColor: COLORS.white,
        ...SHADOWS.medium,
    },
    name: {
        fontSize: FONT_SIZE.xl,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 4,
    },
    email: {
        fontSize: FONT_SIZE.s,
        color: COLORS.textLight,
    },
    statsContainer: {
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        borderRadius: 20,
        padding: SPACING.m,
        marginBottom: SPACING.xl,
        ...SHADOWS.small,
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statDivider: {
        width: 1,
        height: '100%',
        backgroundColor: COLORS.border,
    },
    statValue: {
        fontSize: FONT_SIZE.l,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 4,
    },
    statLabel: {
        fontSize: FONT_SIZE.xs,
        color: COLORS.textLight,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    section: {
        marginBottom: SPACING.xl,
    },
    sectionTitle: {
        fontSize: FONT_SIZE.m,
        fontWeight: '600',
        color: COLORS.textLight,
        marginBottom: SPACING.m,
        marginLeft: SPACING.s,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        padding: SPACING.m,
        borderRadius: 16,
        marginBottom: SPACING.s,
        ...SHADOWS.small,
    },
    menuIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.background,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: SPACING.m,
    },
    menuTextContainer: {
        flex: 1,
    },
    menuTitle: {
        fontSize: FONT_SIZE.m,
        fontWeight: '600',
        marginBottom: 2,
    },
    menuSubtitle: {
        fontSize: FONT_SIZE.xs,
        color: COLORS.textLight,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: SPACING.m,
        backgroundColor: '#FFE5E5',
        borderRadius: 16,
        gap: SPACING.s,
    },
    logoutText: {
        fontSize: FONT_SIZE.m,
        fontWeight: '600',
        color: COLORS.error,
    },
});

export default ProfileScreen;

import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { COLORS, SPACING, FONT_SIZE } from '../constants/theme';
import Input from '../components/Input';
import Button from '../components/Button';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            // In a real app, we would set the auth state here
            // For now, we can't easily toggle the AppNavigator state from here without context
            // But we can simulate navigation or just show it works
            alert('Login clicked! (Auth logic pending)');
        }, 1000);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.title}>Welcome Back</Text>
                    <Text style={styles.subtitle}>Sign in to continue sharing</Text>
                </View>

                <View style={styles.form}>
                    <Input
                        label="Email"
                        placeholder="hello@example.com"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <Input
                        label="Password"
                        placeholder="********"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

                    <TouchableOpacity style={styles.forgotPassword}>
                        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                    </TouchableOpacity>

                    <Button
                        title="Log In"
                        onPress={handleLogin}
                        loading={loading}
                        style={styles.button}
                    />
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Don't have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                        <Text style={styles.link}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
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
        padding: SPACING.l,
        justifyContent: 'center',
    },
    header: {
        marginBottom: SPACING.xl,
    },
    title: {
        fontSize: FONT_SIZE.xxl,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: SPACING.s,
    },
    subtitle: {
        fontSize: FONT_SIZE.m,
        color: COLORS.textLight,
    },
    form: {
        marginBottom: SPACING.xl,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: SPACING.m,
    },
    forgotPasswordText: {
        color: COLORS.primary,
        fontSize: FONT_SIZE.s,
        fontWeight: '600',
    },
    button: {
        marginTop: SPACING.s,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    footerText: {
        color: COLORS.textLight,
        fontSize: FONT_SIZE.m,
    },
    link: {
        color: COLORS.primary,
        fontSize: FONT_SIZE.m,
        fontWeight: 'bold',
    },
});

export default LoginScreen;

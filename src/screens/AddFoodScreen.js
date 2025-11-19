import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, Alert } from 'react-native';
import { COLORS, SPACING } from '../constants/theme';
import Input from '../components/Input';
import Button from '../components/Button';

const AddFoodScreen = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [expiry, setExpiry] = useState('');
    const [loading, setLoading] = useState(false);

    const handlePost = () => {
        if (!title || !description) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        setLoading(true);
        // Mock API call
        setTimeout(() => {
            setLoading(false);
            Alert.alert('Success', 'Your food has been posted!', [
                { text: 'OK', onPress: () => navigation.navigate('HomeTab') }
            ]);
        }, 1500);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <Input
                    label="Title"
                    placeholder="e.g. Homemade Lasagna"
                    value={title}
                    onChangeText={setTitle}
                />
                <Input
                    label="Description"
                    placeholder="Describe the food, quantity, etc."
                    multiline
                    numberOfLines={3}
                    textAlignVertical="top"
                    value={description}
                    onChangeText={setDescription}
                />
                <Input
                    label="Expiry Time"
                    placeholder="e.g. 2 hours"
                    value={expiry}
                    onChangeText={setExpiry}
                />

                <Button
                    title="Post Food"
                    onPress={handlePost}
                    loading={loading}
                    style={styles.button}
                />
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
    button: {
        marginTop: SPACING.m,
    },
});

export default AddFoodScreen;

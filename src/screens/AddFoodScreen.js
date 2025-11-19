// Fixed duplicate imports

import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert, Image, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { COLORS, SPACING, FONT_SIZE } from '../constants/theme';
import Input from '../components/Input';
import Button from '../components/Button';
import { auth, db, storage } from '../config/firebaseConfig';
import { Camera } from 'lucide-react-native';

const AddFoodScreen = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [expiry, setExpiry] = useState('');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const pickImage = async () => {
        try {
            console.log('pickImage called');

            // Request permission to access media library
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
            console.log('Permission result:', permissionResult);

            if (permissionResult.status !== 'granted') {
                Alert.alert('Permission Required', 'Sorry, we need camera roll permissions to upload photos!');
                return;
            }

            console.log('Launching image library...');
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: 'images', // Use string instead of enum for compatibility
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.5,
            });

            console.log('Image picker result:', result);

            if (!result.canceled && result.assets && result.assets.length > 0) {
                console.log('Image selected:', result.assets[0].uri);
                setImage(result.assets[0].uri);
            } else {
                console.log('Image selection cancelled');
            }
        } catch (error) {
            console.error('Error in pickImage:', error);
            Alert.alert('Error', `Failed to pick image: ${error.message}`);
        }
    };

    const uploadImage = async (uri) => {
        try {
            // Why XMLHttpRequest? Firebase Storage sometimes fails with fetch() on React Native
            // This is the recommended workaround for Expo/RN
            const blob = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = function () {
                    resolve(xhr.response);
                };
                xhr.onerror = function (e) {
                    console.log(e);
                    reject(new TypeError("Network request failed"));
                };
                xhr.responseType = "blob";
                xhr.open("GET", uri, true);
                xhr.send(null);
            });

            const filename = `food_images/${auth.currentUser.uid}/${Date.now()}.jpg`;
            const storageRef = ref(storage, filename);

            await uploadBytes(storageRef, blob);

            // We're done with the blob, close and release it
            blob.close();

            return await getDownloadURL(storageRef);
        } catch (error) {
            console.error("Image upload failed:", error);
            throw error;
        }
    };

    const handlePost = async () => {
        if (!title || !description || !image) {
            Alert.alert('Error', 'Please fill in all fields and add an image');
            return;
        }

        setLoading(true);
        try {
            const imageUrl = await uploadImage(image);

            await addDoc(collection(db, 'foods'), {
                title,
                description,
                expiry,
                imageUrl,
                createdBy: auth.currentUser.uid,
                creatorName: auth.currentUser.displayName || 'Anonymous',
                createdAt: serverTimestamp(),
                status: 'available',
                location: null // TODO: Add location later
            });

            Alert.alert('Success', 'Your food has been posted!', [
                {
                    text: 'OK',
                    onPress: () => {
                        setTitle('');
                        setDescription('');
                        setExpiry('');
                        setImage(null);
                        navigation.navigate('HomeTab');
                    }
                }
            ]);
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to post food. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                    {image ? (
                        <Image source={{ uri: image }} style={styles.image} />
                    ) : (
                        <View style={styles.placeholder}>
                            <Camera color={COLORS.textLight} size={40} />
                            <Text style={styles.placeholderText}>Add Food Photo</Text>
                        </View>
                    )}
                </TouchableOpacity>

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
    imagePicker: {
        width: '100%',
        height: 200,
        backgroundColor: COLORS.surface,
        borderRadius: 12,
        marginBottom: SPACING.l,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    placeholder: {
        alignItems: 'center',
    },
    placeholderText: {
        marginTop: SPACING.s,
        color: COLORS.textLight,
        fontSize: FONT_SIZE.m,
    },
    button: {
        marginTop: SPACING.m,
    },
});

export default AddFoodScreen;

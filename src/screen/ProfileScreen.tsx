
import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {
  setName,
  setEmail,
  setAvatar,
} from '../redux/profileSlice'
import { RootState } from '../redux/store'
import { launchImageLibrary } from 'react-native-image-picker'
import PrimaryButton from '../resuableComponent/PrimaryBuuton'

const ProfileScreen = () => {
  const dispatch = useDispatch()
  const { name, email, avatar } = useSelector((state: RootState) => state.profile)
  const [localName, setLocalName] = useState(name)
  const [localEmail, setLocalEmail] = useState(email)
  const [uploading, setUploading] = useState(false)

  const handleSave = () => {
    dispatch(setName(localName))
    dispatch(setEmail(localEmail))
  }

  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES || PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const handlePickAvatar = async () => {
    const hasPermission = await requestStoragePermission();
    if (!hasPermission) {
      Alert.alert('Permission denied');
      return;
    }

    launchImageLibrary({ mediaType: 'photo' }, (res) => {
      if (res.didCancel || res.errorCode) return;

      const uri = res.assets?.[0]?.uri;
      console.log('Selected Image URI:', uri);
      if (!uri) return;

      setUploading(true);

      setTimeout(() => {
        dispatch(setAvatar(uri));
        setUploading(false);
      }, 2000);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={[styles.avatar, styles.avatarPlaceholder]}>
        {avatar ? (
          <Image source={{ uri: avatar }} style={StyleSheet.absoluteFill} />
        ) : (
          <Text>Avatar</Text>
        )}
        {uploading && (
          <ActivityIndicator
            size="small"
            color="#0000ff"
            style={StyleSheet.absoluteFill}
          />
        )}
      </View>


      <PrimaryButton title='Upload Avatar' onPress={handlePickAvatar} />

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={localName}
        onChangeText={setLocalName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={localEmail}
        onChangeText={setLocalEmail}
        keyboardType="email-address"
      />


      <PrimaryButton title='Save' onPress={handleSave} />

      <View style={styles.summary}>
        <Text> Name: {name}</Text>
        <Text> Email: {email}</Text>
      </View>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    gap: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#888',
  },
  avatarPlaceholder: {
    backgroundColor: '#ccc',
  },

  input: {
    borderWidth: 2.5,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 6,
  },
  summary: {
    marginTop: 20,
  },
})

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Button, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

const initialFormState = {
  propertyType: '',
  propertyOccupied: '',
  streetAddress: '',
  city: '',
  country: '',
  state: '',
  postalCode: '',
  unitNumber: '',
};

const SubjectPropertyScreen = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [isPropertyVisible, setIsPropertyVisible] = useState(true);
  const [isAddressVisible, setIsAddressVisible] = useState(true);

  useEffect(() => {
   // sendStoredData();
  }, []);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      console.log('Saving data:', formData);
      const existingData = await AsyncStorage.getItem('subjectData');
      let siteData = existingData ? JSON.parse(existingData) : [];
      console.log('Existing siteData:', siteData);

      if (!Array.isArray(siteData)) {
        console.error('Error: siteData is not an array:', siteData);
        siteData = []; // Ensure siteData is an array
      }

      siteData.push(formData);
      await AsyncStorage.setItem('subjectData', JSON.stringify(siteData));
      Alert.alert('Success', 'Data has been saved locally.');
      setFormData(initialFormState);
      sendStoredData();
    } catch (error) {
      console.error('Failed to save data', error);
      Alert.alert('Error', `Failed to save data: ${error.message}`);
    }
  };

  const sendStoredData = async () => {
    const state = await NetInfo.fetch();
    if (state.isConnected) {
      try {
        const existingData = await AsyncStorage.getItem('subjectData');
        if (existingData) {
          const siteData = JSON.parse(existingData);
          for (const property of siteData) {
            const response = await fetch('https://subjectData.com', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(property),
            });
            if (!response.ok) {
              throw new Error('Failed to send data');
            }
          }
          await AsyncStorage.removeItem('subjectData');
          Alert.alert('Success', 'All data has been sent to the server.');
        }
      } catch (error) {
        console.error('Failed to send data', error);
        Alert.alert('Error', `Failed to send data: ${error.message}`);
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => setIsPropertyVisible(!isPropertyVisible)} style={{backgroundColor:"#00314e",marginBottom:10}}>
        <Text style={styles.header}>Property {isPropertyVisible ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      {isPropertyVisible && (
        <>
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              placeholder="Property Type"
              value={formData.collectionType}
              onChangeText={(value) => handleChange('propertyType', value)}
            />
          </View>
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              placeholder="Property Occupied"
              value={formData.caseFileId}
              onChangeText={(value) => handleChange('propertyOccupied', value)}
            />
          </View>
        </>
      )}
      <TouchableOpacity onPress={() => setIsAddressVisible(!isAddressVisible)} style={{backgroundColor:"#00314e",marginBottom:10}}>
        <Text style={styles.header}>Address {isAddressVisible ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      {isAddressVisible && (
        <>
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              placeholder="Street Address"
              value={formData.phoneNumber}
              onChangeText={(value) => handleChange('streetAddress', value)}
            />
          </View>
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              placeholder="City"
              value={formData.email}
              onChangeText={(value) => handleChange('city', value)}
            />
          </View>
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              placeholder="Country"
              value={formData.pdaCollectionEntity}
              onChangeText={(value) => handleChange('country', value)}
            />
          </View>
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              placeholder="State"
              value={formData.propertyDataCollectorType}
              onChangeText={(value) => handleChange('state', value)}
            />
          </View>
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              placeholder="Postal Code"
              value={formData.propertyDataCollectorTypeDescription}
              onChangeText={(value) => handleChange('postalCode', value)}
            />
          </View>
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              placeholder="Unit Number"
              value={formData.dataCollectorAcknowledgement}
              onChangeText={(value) => handleChange('unitNumber', value)}
            />
          </View>
        </>
      )}
      <Button title="Save" onPress={handleSave} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f7f8f6',
  },
  header: {
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 0,
    color:"#fff",
    padding:10
  },
  inputGroup: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 2,
    padding: 5,
    backgroundColor: '#f8f8f8',
  },
});

export default SubjectPropertyScreen;

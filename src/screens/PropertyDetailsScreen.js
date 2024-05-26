import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Button, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

const initialFormState = {
  collectionType: '',
  caseFileId: '',
  lpaId: '',
  pdaSubmitterEntity: '',
  propertyDataCollectorName: '',
  pdaHyperlink: '',
  phoneNumber: '',
  email: '',
  pdaCollectionEntity: '',
  propertyDataCollectorType: '',
  propertyDataCollectorTypeDescription: '',
  dataCollectorAcknowledgement: '',
  dataCollectionDate: '',
};

const PropertyDetailsScreen = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [isInspectionReportVisible, setInspectionReportVisible] = useState(true);
  const [isPropertyDataContactsVisible, setIsPropertyContactsVisible] = useState(false);

  useEffect(() => {
    sendStoredData();
  }, []);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      console.log('Saving data:', formData);
      const existingData = await AsyncStorage.getItem('propertyData');
      let properties = existingData ? JSON.parse(existingData) : [];
      console.log('Existing properties:', properties);

      if (!Array.isArray(properties)) {
        console.error('Error: properties is not an array:', properties);
        properties = []; // Ensure properties is an array
      }

      properties.push(formData);
      await AsyncStorage.setItem('propertyData', JSON.stringify(properties));
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
        const existingData = await AsyncStorage.getItem('propertyData');
        if (existingData) {
          const properties = JSON.parse(existingData);
          for (const property of properties) {
            const response = await fetch('https://propertyData.com', {
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
          await AsyncStorage.removeItem('propertyData');
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
      <TouchableOpacity onPress={() => setInspectionReportVisible(!isInspectionReportVisible)} style={{backgroundColor:"#00314e",marginBottom:10}}>
        <Text style={styles.header}>Inspection Report {isInspectionReportVisible ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      {isInspectionReportVisible && (
        <>
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              placeholder="Collection Type"
              value={formData.collectionType}
              onChangeText={(value) => handleChange('collectionType', value)}
            />
          </View>
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              placeholder="Case File ID"
              value={formData.caseFileId}
              onChangeText={(value) => handleChange('caseFileId', value)}
            />
          </View>
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              placeholder="LPA ID"
              value={formData.lpaId}
              onChangeText={(value) => handleChange('lpaId', value)}
            />
          </View>
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              placeholder="PDA Submitter Entity"
              value={formData.pdaSubmitterEntity}
              onChangeText={(value) => handleChange('pdaSubmitterEntity', value)}
            />
          </View>
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              placeholder="Property Data Collector Name"
              value={formData.propertyDataCollectorName}
              onChangeText={(value) => handleChange('propertyDataCollectorName', value)}
            />
          </View>
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              placeholder="PDA Hyperlink"
              value={formData.pdaHyperlink}
              onChangeText={(value) => handleChange('pdaHyperlink', value)}
            />
          </View>
        </>
      )}
      <TouchableOpacity onPress={() => setIsPropertyContactsVisible(!isPropertyDataContactsVisible)} style={{backgroundColor:"#00314e",marginBottom:10}}>
        <Text style={styles.header}>Property Data Collector Contacts {isPropertyDataContactsVisible ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      {isPropertyDataContactsVisible && (
        <>
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChangeText={(value) => handleChange('phoneNumber', value)}
            />
          </View>
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={formData.email}
              onChangeText={(value) => handleChange('email', value)}
            />
          </View>
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              placeholder="PDA Collection Entity"
              value={formData.pdaCollectionEntity}
              onChangeText={(value) => handleChange('pdaCollectionEntity', value)}
            />
          </View>
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              placeholder="Property Data Collector Type"
              value={formData.propertyDataCollectorType}
              onChangeText={(value) => handleChange('propertyDataCollectorType', value)}
            />
          </View>
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              placeholder="Property Data Collector Type Description"
              value={formData.propertyDataCollectorTypeDescription}
              onChangeText={(value) => handleChange('propertyDataCollectorTypeDescription', value)}
            />
          </View>
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              placeholder="Data Collector Acknowledgement"
              value={formData.dataCollectorAcknowledgement}
              onChangeText={(value) => handleChange('dataCollectorAcknowledgement', value)}
            />
          </View>
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              placeholder="Data Collection Date"
              value={formData.dataCollectionDate}
              onChangeText={(value) => handleChange('dataCollectionDate', value)}
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

export default PropertyDetailsScreen;

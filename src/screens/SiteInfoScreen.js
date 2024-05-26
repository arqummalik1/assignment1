import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Button, TouchableOpacity,Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SiteInfoScreen = () => {
  const [formData, setFormData] = useState({
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
  });
console.log("Form data ==>>",formData)
  const [isInspectionReportVisible, setInspectionReportVisible] = useState(true);
  const [isPropertyDataContactsVisible, setIsPropertyContactsVisible] = useState(false);

  useEffect(() => {
    const loadFormData = async () => {
      try {
        const savedData = await AsyncStorage.getItem('propertyData');
        if (savedData) {
          setFormData(JSON.parse(savedData));
        }
      } catch (error) {
        console.error('Failed to load data', error);
      }
    };
    loadFormData();
  }, []);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    AsyncStorage.setItem('propertyData', JSON.stringify({ ...formData, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await AsyncStorage.setItem('propertyData', JSON.stringify(formData));
      Alert.alert('Success', 'Data has been saved.');
      // Send data to backend when network is available
    } catch (error) {
      console.error('Failed to save data', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => setInspectionReportVisible(!isInspectionReportVisible)}>
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
      <TouchableOpacity onPress={() => setIsPropertyContactsVisible(!isPropertyDataContactsVisible)}>
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
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  inputGroup: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
});

export default SiteInfoScreen;

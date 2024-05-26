import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';


const cards = [
  { title: 'Property Data', subtitle: 'Inspection Report', screen: 'PropertyData' },
  { title: 'Subject Property', subtitle: 'Property, Address, Identification', screen: 'SubjectProperty' },
  { title: 'Site Info', subtitle: 'Lot, Site Features, Offsite Features, Site Utilities', screen: 'SiteInfo' },
  { title: 'Buildings', subtitle: 'Building Details, Exterior Deficiencies, Exterior Updates', screen: 'Buildings' },
  { title: 'Units', subtitle: 'Unit Details, Unit Features, Heating Systems, Cooling Systems, Mechanical Deficiencies, Garages', screen: 'Units'  },
  { title: 'Levels', subtitle: 'Level 1', screen: 'Levels' },
  { title: 'Rooms', subtitle: 'Room 1', screen: 'Rooms' },
  { title: 'Ancillary', subtitle: 'Ancillary Details, Alley, Appliances, Exterior, Gas', screen: 'Ancillary' },
];

const cardColors = {
  'Property Data': '#d0e8f2',
  'Subject Property': '#f3d1dc',
  'Site Info': '#fdf7d6',
  'Buildings': '#d2f2e5',
  'Units': '#f9dccd',
  'Levels': '#fdf7d6',
  'Rooms': '#f3d1dc',
  'Ancillary': '#d0e8f2',
};

const HomeScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: cardColors[item.title] }]}
      onPress={() => navigation.navigate("Property Details")}
    >
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={cards}
      renderItem={renderItem}
      keyExtractor={(item) => item.title}
      numColumns={2}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  row: {
    flex: 1,
    justifyContent: 'space-around',
  },
  card: {
    flex: 1,
    margin: 10,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '40%', // Ensures the card takes enough width
    maxWidth: '45%', // Ensures the card does not exceed the desired width
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardSubtitle: {
    fontSize: 12,
    textAlign: 'center',
  },
});

export default HomeScreen;

Property Management App
The Property Management App is a React Native application designed to streamline the management of property-related data.
 It provides users with a comprehensive interface to input, view, and manage various aspects of properties, including details, 
 site information, and buildings.

Features
Navigation: The app utilizes React Navigation to implement a structured navigation flow, allowing users to navigate between different screens and sections seamlessly.
Tab Navigation: The Property Details screen utilizes a Material Top Tab Navigator to organize property-related information into distinct tabs, enhancing usability and organization.
Dynamic Icons: Each tab in the Property Details screen is associated with a dynamic icon, providing visual cues to users and improving navigation intuitiveness.
Custom Styling: The app incorporates custom styling for headers, tabs, and icons, creating a visually appealing and cohesive user interface.




//HomeScreen
The Home Screen is a React Native component designed to serve as the main landing page of the application. 
It provides users with an overview of different sections or categories within the app,
 allowing them to navigate to specific screens for managing property-related data.

Features
Card-based Layout: The Home Screen utilizes a card-based layout to display different categories or sections of the application.
Dynamic Content: The content of each card is dynamically generated based on predefined data, providing flexibility and ease of maintenance.
Navigation: Users can navigate to specific screens by tapping on the respective cards, allowing for intuitive and efficient navigation within the application.
Offline Data Storage: Property data is stored locally using AsyncStorage, allowing users to save data even when offline.
Data Synchronization: When the device is connected to the internet, the saved data is synchronized with a remote server, 






// PropertyDetailsScreen
The Property Details Screen is a React Native component designed to collect and manage property-related data. 
It allows users to input various details related to a property, such as inspection reports, contact information,
 and other relevant data points.

Features
1: Dynamic Form Fields: The screen dynamically renders input fields based on the user's selection, ensuring flexibility and ease of use.
2: Offline Data Storage: Property data is stored locally using AsyncStorage, allowing users to save data even when offline.
3: Data Synchronization: When the device is connected to the internet, the saved data is synchronized with a remote server, 
ensuring data integrity and availability.
4: Error Handling: The component includes robust error handling to handle network failures, data storage errors, 
and other potential issues gracefully.

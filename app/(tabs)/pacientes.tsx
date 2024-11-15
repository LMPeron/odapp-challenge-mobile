import ParallaxScrollView from "@/components/ParallaxScrollView";
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import { useState, useCallback, useEffect } from "react";
import PatientService from "@/service/PatientService";
import { Card, Text, Avatar, IconButton } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";

const Logo = require("@/assets/images/logo.jpg");
const UserImage = require("@/assets/images/user.jpeg");

type Patient = {
  id: string;
  name: string;
  age: number;
  Location: {
    City: {
      id: string;
      name: string;
    };
    State: {
      id: string;
      name: string;
    };
  };
};

export default function Patients() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPatients = useCallback(async () => {
    setLoading(true);
    try {
      const patientService = new PatientService();
      const response = await patientService.getAll();
      setPatients(response.patients || []);
    } catch (err) {
      console.error("Erro ao buscar pacientes:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  const navigateToPatientDetails = (patient: Patient) => {};

  return loading ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="rgb(54, 174, 219)" />
    </View>
  ) : (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#f0f0f0", dark: "rgb(54, 174, 219)" }}
      headerImage={
        <View
          style={{
            alignItems: "center",
            height: "100%",
            justifyContent: "center",
          }}
        >
          <Image source={Logo} style={styles.headerImage} />
        </View>
      }
    >
      <LinearGradient
        colors={["#e0eafc", "#cfdef3"]}
        style={{ flex: 1, padding: 0 }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          {patients.map((patient, index) => (
            <Card key={index} style={styles.card} mode="elevated">
              <Card.Title
                title={patient.name}
                subtitle={`Idade: ${patient.age}`}
                titleStyle={styles.cardTitle}
                subtitleStyle={styles.cardSubtitle}
                style={{
                  backgroundColor: "rgb(54, 174, 219)",
                }}
                left={(props) => (
                  <Avatar.Image
                    {...props}
                    source={UserImage}
                    style={{
                      marginRight: 100,
                    }}
                    size={60}
                  />
                )}
                right={(props) => (
                  <IconButton
                    {...props}
                    icon="chevron-right"
                    size={30}
                    style={{
                      backgroundColor: "rgb(54, 174, 219)",
                    }}
                    onPress={() => navigateToPatientDetails(patient)}
                  />
                )}
              />
              <Card.Content style={styles.cardContent}>
                <View style={styles.infoRow}>
                  <IconButton icon="map-marker" />
                  <Text style={styles.infoText}>
                    {patient.Location.City.name}, {patient.Location.State.name}
                  </Text>
                </View>
              </Card.Content>
            </Card>
          ))}
        </ScrollView>
      </LinearGradient>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    width: 100,
    height: 100,
    borderRadius: 100,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  gradientBackground: {
    flex: 1,
  },
  container: {
    padding: 40,
  },
  card: {
    marginBottom: 24,
    borderRadius: 5,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.17,
    shadowRadius: 3.84,
  },
  cardCover: {
    height: 200,
  },
  cardHeader: {
    position: "absolute",
    top: 140,
    left: 16,
    right: 16,
    borderRadius: 12,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "right",
  },
  cardSubtitle: {
    color: "#fff",
    fontSize: 16,
    textAlign: "right",
  },
  cardContent: {
    marginTop: 16,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoText: {
    fontSize: 18,
    color: "#333",
  },
});

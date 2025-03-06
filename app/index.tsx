import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { usePush } from "@/hooks/usePush";
import Galaxies from "@/modules/galaxies";

export default function Index() {
  const { registerForPushNotificationsAsync } = usePush();
  const [expoPushToken, setExpoPushToken] = useState("");

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => {
        console.log("push notification token:", token);
        if (token) {
          setExpoPushToken(token);
        }
      })
      .catch((err) => {
        console.log("error getting push notification token:", err);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(Galaxies.getDeviceInfo())}</Text>
      <Text>{expoPushToken}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
});

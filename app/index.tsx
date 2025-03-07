import * as Notifications from "expo-notifications";
import { Link, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { usePush } from "@/hooks/usePush";
import Galaxies from "@/modules/galaxies";

export default function Index() {
  const router = useRouter();
  const { registerForPushNotificationsAsync } = usePush();
  const [expoPushToken, setExpoPushToken] = useState("");

  const notificationListener = useRef<Notifications.EventSubscription>();
  const responseListener = useRef<Notifications.EventSubscription>();

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

    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      console.log("notification received:", notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log("notification response received:", response);
      router.push(`/${response.notification.request.content.data.pageId}`);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(Galaxies.getDeviceInfo())}</Text>
      <Text>{expoPushToken}</Text>
      <Link href="/42" asChild>
        <Text>Go to page 42</Text>
      </Link>
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

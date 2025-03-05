import { Text, View } from "react-native";
import Galaxies from "@/modules/galaxies";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>{JSON.stringify(Galaxies.getDeviceInfo())}</Text>
    </View>
  );
}

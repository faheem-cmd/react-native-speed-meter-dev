import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  PanResponder,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";

import { RFValue } from "react-native-responsive-fontsize";
const height = 844;

export const GlobalSize = (number) => {
  const value = RFValue(number, height);
  return value;
};

const SpeedMeter = ({
  rotationValueProp,
  onError,
  percentageValue,
  showPercentage,
}) => {
  const [percentage, setPercentage] = useState(1);
  const [rotationValue, setRotationValue] = useState(90);

  useEffect(() => {
    handleInputChange(rotationValueProp);
  }, [rotationValueProp]);

  const handleInputChange = (text) => {
    const inputValue = parseFloat(text);
    if (inputValue > 100 || inputValue < 0) {
      onError("invalid");
    } else if (!isNaN(inputValue)) {
      setPercentage(inputValue);
      percentageValue(inputValue);
      setRotationValue(90 - (inputValue / 100) * 180);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={{ height: GlobalSize(200), width: GlobalSize(200) }}>
          <Image
            source={require("./assets/SpeedChart.png")}
            style={{
              height: null,
              width: null,
              flex: 1,
              resizeMode: "contain",
            }}
          />
        </View>

        <View style={styles.meterOverlay}>
          <View style={styles.meterArrow}>
            <View
              style={[
                styles.arrowStick,
                {
                  transform: [{ rotate: `${rotationValue}deg` }],
                },
              ]}
            >
              <Image
                source={require("./assets/Arrow.png")}
                style={styles.arrowImage}
              />
            </View>
            <View style={styles.arrowRotationPosition} />
          </View>
        </View>
        {showPercentage && (
          <View style={styles.textInputContainer}>
            <Text style={styles.percentageText}>{percentage}%</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default SpeedMeter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
  },
  subContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    // marginTop: GlobalSize(24),
    // backgroundColor: 'red',
    padding: GlobalSize(24),
  },
  meterOverlay: {
    bottom: "45%",
    alignItems: "center",
    position: "absolute",
  },
  meterArrow: {
    alignItems: "center",
    height: GlobalSize(86),
    left: GlobalSize(-4.4),
  },
  arrowStick: {
    height: GlobalSize(135),
    width: GlobalSize(30),
    zIndex: 1000,
  },
  arrowImage: {
    height: null,
    width: null,
    flex: 1,
    resizeMode: "contain",
    top: GlobalSize(12.5),
  },
  arrowRotationPosition: {
    height: GlobalSize(24),
    width: GlobalSize(24),
    backgroundColor: "black",
    position: "absolute",
    bottom: GlobalSize(6.2),
    borderRadius: 100,
  },
  title: {
    color: "#000000",
    fontSize: GlobalSize(16),
    lineHeight: GlobalSize(17.07),
    marginTop: GlobalSize(28),
  },
  textInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    bottom: GlobalSize(20),
    paddingBottom: GlobalSize(25),

    justifyContent: "center",
  },
  fuelFont: {
    color: "#000000",
    fontSize: GlobalSize(16),
    lineHeight: GlobalSize(18.07),
  },
  textInputContainer2: {
    height: GlobalSize(45),
    width: GlobalSize(80),
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  input: {
    color: "#242424",
    fontSize: GlobalSize(13),
    letterSpacing: GlobalSize(-0.41),
    padding: 0,
  },
  percentageText: {
    color: "#242424",
    fontSize: GlobalSize(16),
  },
});

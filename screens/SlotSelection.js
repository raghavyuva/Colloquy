import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  TextInput,
  TouchableHighlight,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import Headingbar from "../components/Header";
const { width, height } = Dimensions.get("window");
import { Config } from "../config";
import "firebase/auth";
import "firebase/firestore";
import LoadingComp from "../components/LoadingComp";
import UploadingComp from "../components/UploadingComp";
import { useSelector } from "react-redux";
import Payment_Parent from "./Payment_Parent";
import DatePicker from "react-native-date-picker";
const SlotSelection = (props) => {
  const { colors } = useTheme();
  const [Input, setInput] = useState(null);
  const [uploading, setuploading] = useState(false);
  const [load, setload] = useState(false);
  const [active, setactive] = useState("1");
  const user = useSelector((state) => state.userDetails);
  const [date, setDate] = useState(new Date());
  const [today, settoday] = useState(null);
  const [month, setmonth] = useState(null);
  const [slotavailable, setslotavailable] = useState(false);
  const VerifyTheSlot = () => {
    try {
      setload(true);
      fetch(`${Config.url}` + `/Interview`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + `${user.userToken}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          let filtered = null;
          filtered = data.filter((ele) => {
            return (
              ele.InterviewDate.includes(date.toLocaleDateString()) &&
              ele.InterviewTime.includes(active.time)
            );
          });
          if (filtered[0] != null) {
            setslotavailable(false);
             alert('slot not available')
          } else {
            setslotavailable(true);
            alert('slot available')
          }
          setload(false);
        })
        .catch((error) => {
          console.error("Error:", error);
          setload(false);
        });
    } catch (error) {
      alert(error);
      setload(false);
    }
  };
  useEffect(() => {
    let IsMounted = true;
    settoday(new Date());
    var tomorrow = new Date();
    var some = new Date(tomorrow.setUTCDate(tomorrow.getDate() + 30));
    setmonth(some);
    return () => {
      IsMounted = false;
    };
  }, []);

  
  if (load) {
    return <LoadingComp />;
  }
  if (uploading) {
    return <UploadingComp />;
  }
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Headingbar {...props} />
      <Text
        style={{
          color: colors.text,
          fontSize: 24,
          fontWeight: "bold",
          marginLeft: 10,
        }}
      >
        Select a Slot
      </Text>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 30,
        }}
      >
        <Text
          style={{ color: colors.text, textAlign: "center", marginBottom: 15 }}
        >
          Pick a Date in the range of one month for an interview
        </Text>
        <DatePicker
          date={date}
          onDateChange={setDate}
          mode="date"
          minimumDate={today}
          maximumDate={month}
          fadeToColor={colors.primary}
          androidVariant="iosClone"
          textColor={colors.text}
        />
      </View>
      <View style={{ marginTop: 20 }}>
        <Text style={{ color: colors.text, textAlign: "center" }}>
          Select a Time slot for an interview to be conducted
        </Text>
        <FlatList
          renderItem={({ item }) => {
            let ele = item;
            return (
              <View
                style={{
                  justifyContent: "center",
                  alignSelf: "center",
                  alignItems: "center",
                  alignContent: "center",
                }}
              >
                <TouchableOpacity
                  style={
                    active.id == item.id
                      ? styles(colors).selectedlist
                      : styles(colors).timelist
                  }
                  onPress={() => {
                    setactive(ele);
                  }}
                >
                  <View
                    style={{ justifyContent: "center", alignSelf: "center" }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        color: colors.text,
                        textAlign: "center",
                      }}
                    >
                      {ele.time}{" "}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
          data={Data}
          style={{ margin: 20 }}
          numColumns={2}
        />
        <TouchableHighlight
          style={{
            borderWidth: 0.5,
            borderColor: "grey",
            width: 200,
            height: 40,
            backgroundColor: colors.card,
            justifyContent: "center",
            alignSelf: "center",
          }}
          onPress={VerifyTheSlot}
          underlayColor={colors.primary}
        >
          <Text style={{ color: colors.text, textAlign: "center" }}>
            Verify Slot Availability
          </Text>
        </TouchableHighlight>
      </View>
      <View
        style={{
          flexDirection: "column",
          marginTop: 20,
          padding: 20,
          borderBottomColor: colors.text,
          borderBottomWidth: 1,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text style={{ color: colors.text, fontSize: 20 }}>Interview</Text>
          </View>
          <View>
            <Text
              style={{
                color: colors.text,
                fontWeight: "bold",
                fontSize: 20,
              }}
            >
              400 {"\u20A8"}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text style={{ color: colors.text, fontSize: 20 }}>
              Report of Interview
            </Text>
          </View>
          <View>
            <Text
              style={{
                color: colors.text,
                fontWeight: "bold",
                fontSize: 20,
              }}
            >
              100 {"\u20A8"}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 20,
        }}
      >
        <View>
          <Text style={{ color: colors.text, fontSize: 20 }}>Total Amount</Text>
        </View>
        <View>
          <Text
            style={{ color: colors.primary, fontWeight: "bold", fontSize: 20 }}
          >
            500 {"\u20A8"}
          </Text>
        </View>
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Payment_Parent disabled={slotavailable} date={date}  time={active.time} Branch={props.route.params.thread} />
      </View>
    </View>
  );
};

export default SlotSelection;

const styles = (colors) =>
  StyleSheet.create({
    datePickerStyle: {
      width: 200,
      marginTop: 0,
      color: colors.text,
      marginBottom: 10,
    },
    timelist: {
      width: width / 2.5,
      backgroundColor: colors.background,
      borderRadius: 1,
      marginBottom: 5,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.37,
      shadowRadius: 7.49,
      elevation: 12,
      margin: 10,
    },
    selectedlist: {
      width: width / 2.5,
      backgroundColor: colors.primary,
      borderRadius: 1,
      marginBottom: 5,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.37,
      shadowRadius: 7.49,

      elevation: 12,
      margin: 10,
    },
  });
const Data = [
  {
    time: "10.00",
    id: "1",
  },
  {
    time: "12.00",
    id: "2",
  },
  {
    time: "04.00",
    id: "3",
  },
  {
    time: "06.00",
    id: "4",
  },
  {
    time: "08.00",
    id: "5",
  },
  {
    time: "10.00",
    id: "6",
  },
];

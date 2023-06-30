import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { SelectList } from "react-native-dropdown-select-list";
import { useNavigation } from "@react-navigation/native";
import DatePicker from "react-native-datepicker";
import { CheckBox, Button } from "react-native-elements";
import { AuthContext } from "../Context/AuthContext";

const Ticket = () => {
  const navigation = useNavigation();

  const countsNumber = parseInt(counts);

  const [dataSelect, setDataSelect] = useState([]);

  const [data, setData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [fullData, setFullData] = useState([]);

  const isDisabled = dataSelect.length === 0;

  const { userToken } = useContext(AuthContext);

  const [symbol, setSymbol] = useState([]);
  const [selectedSymbol, setSelectedSymbol] = useState(null);

  const getSymbol = (userToken) => {
    fetch(
      "https://demohoadon123.mobifoneinvoice.vn/api/System/GetDataReferencesByRefId?refId=RF00059",
      {
        method: "GET",
        headers: {
          Authorization: `Bear ${userToken};VP`,
        },
      }
    )
      .then((res) => res.json())
      .then((resJson) => {
        const symbolData = resJson.map((item) => ({
          value: item.khhdon,
          label: item.khhdon,
          qlkhsdung_id: item.qlkhsdung_id,
        }));

        console.log("Symbol Data:", symbolData);
        setSymbol(symbolData);
      })
      .catch((error) => {
        console.log("Error fetching symbol data:", error);
      });
  };

  useEffect(() => {
    getSymbol(userToken);
  }, [userToken]);

  const handleSelected = (selectedItem) => {
    if (selectedItem) {
      const qlkhsdung_id = selectedItem.qlkhsdung_id;
      console.log("Selected Item:", selectedItem);
      console.log("qlkhsdung_id:", qlkhsdung_id);

      setSelectedSymbol(selectedItem); // Cập nhật giá trị selectedSymbol
    }
  };

  const API = (userToken) => {
    fetch(
      "https://demohoadon123.mobifoneinvoice.vn/api/System/GetDataByWindowNo",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bear ${userToken};VP`,
        },
        body: JSON.stringify({
          window_id: "WIN00015",
          start: 0,
          count: 50,
          filter: [],
          infoparam: null,
          tlbparam: [],
        }),
      }
    )
      .then((res) => res.json())
      .then((resJson) => {
        // console.log(resJson)
        setData(resJson.data);
        setFullData(resJson.data);
      })
      .catch((error) => {
        console.log("Error:", error);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    API(userToken);
    return () => {};
  }, [userToken]);

  const handleSearch = (text) => {
    if (text) {
      const newData = fullData.filter((item) => {
        const itemData = item.name
          ? item.name.toLowerCase()
          : "".toLocaleLowerCase();
        const textData = text.toLowerCase();
        return itemData.indexOf(textData) > -1;
      });
      setData(newData);
      setSearch(text);
    } else {
      setData(fullData);
      setSearch(text);
    }
  };

  const [date, setDate] = useState(new Date());

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
  };

  const [counts, setCounts] = useState({});

  const increment = (id) => {
    const newData = [...data];
    const index = newData.findIndex((item) => item.pl_goods_id === id);
    if (index !== -1) {
      const newCount = counts[id] ? counts[id] + 1 : 1;
      const newCounts = { ...counts, [id]: newCount };
      setCounts(newCounts);
      newData[index].quantity = newCount;
      setData(newData);
    }
  };

  const decrement = (id) => {
    const newData = [...data];
    const index = newData.findIndex((item) => item.pl_goods_id === id);
    if (index !== -1) {
      const newCount = counts[id] ? counts[id] - 1 : 1;
      const newCounts = { ...counts, [id]: newCount };
      setCounts(newCounts);
      newData[index].quantity = newCount;
      setData(newData);
    }
  };

  const onValueChange = (itemSelected) => {
    const updatedData = data.map((item) => {
      if (item.pl_goods_id === itemSelected.pl_goods_id) {
        return {
          ...item,
          selected: !item.selected,
        };
      }
      return item;
    });
    setData(updatedData);
    const newSelected = updatedData.filter((item) => item.selected);
    setDataSelect(newSelected);
  };
  const renderItem = ({ item }) => {
    const count = counts[item.pl_goods_id] || 1;
    return (
      <View style={styles.item}>
        <Text style={styles.info}>
          {" "}
          Loại vé: <Text style={styles.name}>{item.name}</Text>{" "}
        </Text>
        <Text style={styles.info}> Ngày hiệu lực: {item.date_edit}</Text>
        <Text style={styles.info}> Giá vé: {item.unit_price} </Text>
        <Text style={styles.info}> VAT: {item.vat_type}%</Text>
        <View style={styles.checkboxContainer}>
          <CheckBox
            key={item.pl_goods_id}
            title={item.title}
            checked={item.selected}
            onPress={() => onValueChange(item)}
          />
        </View>
        <View style={styles.Count}>
          <Text style={styles.info}>Số lượng:</Text>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              style={styles.Dec}
              onPress={() => decrement(item.pl_goods_id)}
              disabled={counts[item.pl_goods_id] <= 1}
            >
              <Text style={styles.TextAction}>-</Text>
            </TouchableOpacity>
            <Text style={styles.Numb}>{counts[item.pl_goods_id] || 1}</Text>
            <TouchableOpacity
              style={styles.Inc}
              onPress={() => increment(item.pl_goods_id)}
              disabled={counts[item.pl_goods_id] >= 9}
            >
              <Text style={styles.TextAction}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"dark-content"} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.dates}>
          <DatePicker
            style={styles.datePicker}
            date={date}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            minDate="2022-01-01"
            maxDate="2023-12-31"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: "absolute",
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 36,
              },
            }}
            onDateChange={handleDateChange}
          />
        </View>
        <View style={styles.symbol}>
          <SelectList
            setSelected={handleSelected}
            placeholder="Ký hiệu"
            searchPlaceholder="Mã ký hiệu"
            data={symbol}
            boxStyles={{ backgroundColor: "white", borderColor: "#ccc" }}
            dropdownStyles={{ backgroundColor: "white" }}
          />
        </View>
        <TextInput
          style={styles.search}
          placeholder="Tìm kiếm"
          clearButtonMode="always"
          autoCapitalize="none"
          autoCorrect={false}
          value={search}
          onChangeText={(text) => handleSearch(text)}
        />
        <View style={styles.container}>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => `key-${item.pl_goods_id}`}
            />
          )}
        </View>
        <View>
          <View style={styles.action}>
            <TouchableOpacity
              style={styles.ButtonText}
              onPress={() => {
                if (selectedSymbol !== null && dataSelect.length > 0) {
                  console.log(dataSelect.length);
                  navigation.navigate("Khách hàng", {
                    dataSelect,
                    date,
                    symbol,
                    selected: selectedSymbol,
                  });
                } else {
                  let message = "";
                  if (selectedSymbol === null && dataSelect.length === 0) {
                    message = "Vui lòng chọn mã ký hiệu và sản phẩm";
                  } else if (selectedSymbol === null) {
                    message = "Vui lòng chọn mã ký hiệu";
                  } else {
                    message = "Vui lòng chọn sản phẩm";
                  }
                  Alert.alert("Thông báo", message);
                }
              }}
              disabled={false}
            >
              <Text style={styles.ButtonActionText}>Tiếp</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const TEXT = {
  color: "white",
};
const TEXT2 = {
  color: "blue",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ccffff",
  },
  // contain: {
  //   flex: 1,
  //   backgroundColor: "white",
  //   margin: 10,
  //   borderRadius: 10,
  //   height: 160,
  //   justifyContent: "center",
  // },
  item: {
    flex: 1,
    backgroundColor: "white",
    margin: 8,
    borderRadius: 10,
    // height: 160,
    justifyContent: "center",
    paddingLeft: 50,
  },
  info: {
    color: "black",
    fontSize: 15,
  },
  checkboxContainer: {
    position: "absolute",
  },
  checkbox: {
    width: 20,
    height: 20,
  },
  ButtonText: {
    alignItems: "center",
    backgroundColor: "#00aaff",
    borderRadius: 5,
    height: 35,
    justifyContent: "center",
    margin: 15,
    aspectRatio: "4",
  },
  ButtonText1: {
    alignItems: "center",
    backgroundColor: "#00aaff",
    borderRadius: 5,
    height: 35,
    margin: 15,
    justifyContent: "center",
    aspectRatio: "2",
  },
  ButtonActionText: {
    ...TEXT,
  },
  action: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  Count: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
  },
  Dec: {
    backgroundColor: "#D9D7FD",
    alignItems: "center",
    width: 40,
    height: 25,
  },
  Inc: {
    backgroundColor: "#D9D7FD",
    alignItems: "center",
    width: 40,
    height: 25,
  },
  TextAction: {
    ...TEXT2,
  },
  Numb: {
    backgroundColor: "#D9D7FD",
    height: 25,
    width: 40,
    textAlign: "center",
  },
  search: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderColor: "#ccc",
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 10,
    margin: 10,
  },
  symbol: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  dates: {
    // flex:1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  name: {
    color: "blue",
  },
});

export default Ticket;

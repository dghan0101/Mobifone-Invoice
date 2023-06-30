import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { AuthContext } from "../Context/AuthContext";
import Icon from "react-native-vector-icons/FontAwesome";

function Guest({ navigation, route }) {
  const [mst, setMst] = useState("");

  const [email, setEmail] = useState("");

  const [phone, setPhone] = useState("");

  const [address, setAddress] = useState({
    dctsdchi: "",
    dctstxa: "",
    dctsthuyen: "",
    dctstinh: "",
  });

  const [guest, setGuest] = useState("");

  const { userToken } = useContext(AuthContext);

  const [hdonId, setHdonId] = useState(null);

  const { selected, dataSelect, date, symbol } = route.params;

  const [invoiceCreated, setInvoiceCreated] = useState(false);

  let tongTien = 0;
  for (let i = 0; i < dataSelect.length; i++) {
    tongTien += dataSelect[i].unit_price * dataSelect[i].quantity;
  }

  let tgtthue = 0;
  for (let i = 0; i < dataSelect.length; i++) {
    tgtthue +=
      (dataSelect[i].unit_price *
        dataSelect[i].quantity *
        dataSelect[i].vat_type) /
      100;
  }

  const handleSave = () => {
    if (mst === "" || guest === "" || address === "") {
      Alert.alert(
        "Lỗi",
        "Vui lòng nhập đầy đủ mã số thuế, tên khách hàng và địa chỉ.",
        [{ text: "OK" }],
        { cancelable: false }
      );
      return;
    }

    const selectedSymbol = symbol.find((item) => item.value === selected);

    const qlkhsdung_id = selectedSymbol ? selectedSymbol.qlkhsdung_id : null;

    fetch(
      "https://demohoadon123.mobifoneinvoice.vn/api/Invoice68/SaveListHoadon78",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bear ${userToken};VP`,
        },
        body: JSON.stringify({
          editmode: 1,
          data: [
            {
              cctbao_id: qlkhsdung_id,
              nlap: date,
              sdhang: "",
              dvtte: "VND",
              tgia: "1",
              htttoan: "Tiền mặt/Chuyển khoản",
              stknban: "",
              tnhban: "",
              mnmua: "1",
              mst: mst,
              tnmua: guest,
              email: email,
              ten: guest,
              dchi: address,
              sdt: phone,
              stknmua: "",
              tnhmua: "",
              tgtcthue: tongTien,
              tgtthue: tgtthue,
              tgtttbso: 117150,
              tgtttbso_last: tgtthue + tongTien,
              tkcktmn: 72600,
              ttcktmai: 2500,
              tgtphi: 10000,
              mdvi: "VP",
              tthdon: 0,
              is_hdcma: 1,
              details: [
                {
                  data: dataSelect.map((item, index) => ({
                    stt: index + 1,
                    ma: item.code,
                    ten: item.name,
                    mdvtinh: item.unit_code,
                    sluong: item.quantity,
                    dgia: item.unit_price,
                    thtien: item.unit_price * item.quantity,
                    tlckhau: 0,
                    stckhau: 0,
                    tsuat: item.vat_type,
                    tthue:
                      (item.unit_price * item.quantity * item.vat_type) / 100,
                    tgtien:
                      item.unit_price * item.quantity +
                      (item.unit_price * item.quantity * item.vat_type) / 100,
                    kmai: 1,
                  })),
                },
              ],
              hoadon68_phi: [
                {
                  data: [
                    {
                      tienphi: 10000,
                      tnphi: "Phí môi trường",
                    },
                  ],
                },
              ],
              hoadon68_khac: [
                {
                  data: [
                    {
                      dlieu: "Địa chỉ",
                      kdlieu: "decimal",
                      ttruong: "dclhe",
                    },
                  ],
                },
              ],
            },
          ],
        }),
      }
    )
      .then((res) => res.json())
      .then((resJson) => {
        console.log(resJson);
        if (
          resJson &&
          resJson.length > 0 &&
          resJson[0].data &&
          resJson[0].data.hdon_id
        ) {
          const hdon_id = resJson[0].data.hdon_id;
          setHdonId(hdon_id);
          getInvoice(hdon_id);
        } else {
          console.log("No hdon_id found in API response");
        }

        setInvoiceCreated(true);

        Alert.alert(
          "Tạo hóa đơn thành công",
          "Nhấn nút xem hóa đơn để xem",
          [{ text: "OK" }],
          { cancelable: false }
        );
      })
      .catch((error) => {
        console.error(error);
        // Xử lý lỗi nếu có
      });
  };

  useEffect(() => {}, [userToken]);

  const [pdfBase64, setPdfBase64] = useState("");

  const getInvoice = (hdon_id) => {
    fetch(
      `https://demohoadon123.mobifoneinvoice.vn/api/Invoice68/inHoadon?id=${hdon_id}&type=PDF&inchuyendoi=false`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bear ${userToken};VP`,
        },
      }
    ).then(async (response) => {
      const blob = await response.blob();
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64String = reader.result
          .replace("data:", "")
          .replace(/^.+,/, "");
        setPdfBase64(base64String);
        // console.log(base64String);
      };
    });
  };

  const isValidMst = (mst) => {
    // Thực hiện kiểm tra mã số thuế ở đây
    // Trả về true nếu mã số thuế hợp lệ, ngược lại trả về false
    // Ví dụ:
    const regex = /^\d{10}(-\d{1,5})?$/; // Kiểm tra MST có 10 chữ số, có thể có ký tự "-" và sau đó là 1 hoặc 2 chữ số
    return regex.test(mst);
  };

  const validateMst = () => {
    if (!isValidMst(mst)) {
      // Mã số thuế không hợp lệ
      alert("Vui lòng nhập mã số thuế hợp lệ");
    } else {
      // Mã số thuế hợp lệ, tiến hành tìm kiếm
      getCompany();
    }
  };


  const getCompany = () => {
    fetch(
      `https://hoadondientu.gdt.gov.vn:30000/category/public/dsdkts/${mst}/manager`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((resJson) => {
        // console.log(resJson);
        const { tennnt, dctsdchi, dctstxa, dctsthuyen, dctstinh } = resJson;
        setGuest(tennnt);
        setAddress({
          dctsdchi: dctsdchi || "",
          dctstxa: dctstxa || "",
          dctsthuyen: dctsthuyen || "",
          dctstinh: dctstinh || "",
        });
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.container}>
          <View style={styles.infoContainer}>
            <View style={styles.action2}>
              <View style={styles.searchInputContainer}>
                <Text style={{ color: "black" }}>Mã số thuế</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Mã số thuế"
                  value={mst}
                  onChangeText={(text) => {
                    setMst(text);
                  }}
                />
              </View>
              <TouchableOpacity
                style={styles.searchButton}
                onPress={validateMst}
              >
                <Icon name="search" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <Text style={{ color: "black" }}>Tên khách hàng</Text>
            <TextInput
              style={styles.input}
              placeholder="Tên khách hàng"
              value={guest}
              onChangeText={(text) => {
                setGuest(text);
              }}
            />
            <Text style={{ color: "black" }}>Địa chỉ</Text>
            <TextInput
              style={styles.input}
              placeholder="Địa chỉ"
              value={`${address.dctsdchi}${
                address.dctstxa ? ", " + address.dctstxa : ""
              }${address.dctsthuyen ? ", " + address.dctsthuyen : ""}${
                address.dctstinh ? ", " + address.dctstinh : ""
              }`}
              onChangeText={(text) => {
                const [dctsdchi, dctstxa, dctsthuyen, dctstinh] =
                  text.split(", ");
                setAddress({ dctsdchi, dctstxa, dctsthuyen, dctstinh });
              }}
            />
            <Text style={{ color: "black" }}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
              }}
            />
            <Text style={{ color: "black" }}>Số điện thoại</Text>
            <TextInput
              style={styles.input}
              placeholder="Số điện thoại"
              value={phone}
              onChangeText={(text) => {
                setPhone(text);
              }}
            />
          </View>
          <View style={styles.action}>
            <TouchableOpacity
              style={styles.ButtonText}
              onPress={() => handleSave()}
              disabled={invoiceCreated}
            >
              <Text style={styles.ButtonActionText}>Tạo mới hóa đơn</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.ButtonText}
              onPress={() =>
                navigation.navigate("PDF View", {
                  pdfBase64: pdfBase64,
                  symbol,
                  hdonId,
                })
              }
            >
              <Text style={styles.ButtonActionText}>Xem hóa đơn</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const TEXT = {
  color: "white",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "space-between",
  },
  input: {
    height: 40,
    backgroundColor: "#e6e6e6",
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  infoContainer: {
    padding: 20,
  },
  action: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  action2: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  ButtonActionText: {
    ...TEXT,
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
  contain: {
    flex: 1,
    backgroundColor: "white",
    margin: 10,
    borderRadius: 10,
    height: 160,
    justifyContent: "center",
    paddingLeft: 40,
  },
  symbol: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  searchInputContainer: {
    flex: 1,
    marginRight: 10,
  },
  searchButton: {
    padding: 10,
    borderRadius: 5,
  },
});

export default Guest;

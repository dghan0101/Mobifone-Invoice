import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Alert } from "react-native";
import Pdf from "react-native-pdf";
import RNPrint from "react-native-print";
import { DocumentDirectoryPath, writeFile } from "react-native-fs";
import Icon from "react-native-vector-icons/FontAwesome";
import { AuthContext } from "../Context/AuthContext";

const PDFViewExample = ({ route, navigation }) => {
  const { pdfBase64, symbol, hdonId } = route.params;
  const handlePrint = async () => {
    const pdfFilePath = `${DocumentDirectoryPath}/document.pdf`;
    await writeFile(pdfFilePath, pdfBase64, "base64");
    await RNPrint.print({ filePath: pdfFilePath });
  };

  const { userToken } = useContext(AuthContext);

  const delInvoice = () => {
    Alert.alert(
      "Xác nhận",
      "Bạn có chắc chắn muốn xóa hóa đơn không?",
      [
        {
          text: "Không",
          style: "cancel",
        },
        {
          text: "Có",
          onPress: () => {
            // Thực hiện xóa hóa đơn ở đây
            fetch(
              "https://demohoadon123.mobifoneinvoice.vn/api/Invoice68/SaveHoadon78",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bear ${userToken};VP`,
                },
                body: JSON.stringify({
                  editmode: 3,
                  data: [
                    {
                      hdon_id: hdonId,
                      cctbao_id: symbol,
                    },
                  ],
                }),
              }
            )
              .then((res) => res.json())
              .then((resJson) => {
                // Xử lý dữ liệu phản hồi theo nhu cầu của bạn
                console.log(resJson);
                Alert.alert(
                  "Xóa hóa đơn thành công",
                  "Hóa đơn đã được xóa thành công.",
                  [
                    {
                      text: "OK",
                      onPress: () => navigation.popToTop(),
                    },
                  ],
                  { cancelable: false }
                );
              })
              .catch((error) => {
                console.log("Error:", error);
              });
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.action}>
        <TouchableOpacity style={styles.deleteButton} onPress={delInvoice}>
          <Icon name="trash-o" size={25} color="gray" />
        </TouchableOpacity>
      </View>
      <Pdf
        source={{ uri: `data:application/pdf;base64,${pdfBase64}` }}
        style={styles.pdf}
      />
      <View style={styles.action}>
        <TouchableOpacity style={styles.ButtonText} onPress={handlePrint}>
          <Text style={styles.ButtonActionText}>In hóa đơn</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const TEXT = {
  color: "white",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: "100%",
    height: "100%",
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
  ButtonActionText: {
    ...TEXT,
  },
  deleteButton: {
    justifyContent: "flex-end",
    margin: 10,
  },
  action: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});

export default PDFViewExample;

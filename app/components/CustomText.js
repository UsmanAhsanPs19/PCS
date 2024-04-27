import React from "react";
import { Text } from "react-native";

export default function CustomText({ className, styles, text }) {
    return <Text style={[styles, { fontFamily: "Poppins-Regular" }]} className={"text-3xl text-red-600"}>{text}</Text>
}
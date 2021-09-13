import React from 'react';
import { StyleSheet,Text, View, Image } from 'react-native';

export default function BuildingCard (props){
    let item = props.item;
    return(
        <View style={styles.container}>
            <View style={styles.col1}>
                <Image resizeMode="cover" style={styles.image} source={{ uri:item.image }}></Image>
            </View>
            <View style={styles.col2}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.text}>{item.address}</Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection:"row",
        //backgroundColor: "#bcbcbc",
        marginBottom:5,
        marginLeft:5,
        marginRight:5,
        height:100,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    col1:{
        flex: 1,
        width: 100,
        padding: 5,
    },
    image:{
        flex:1,
    },
    col2:{
        flex: 3,
        alignItems: "flex-start",
        justifyContent: "center",
        width: 100,
        paddingLeft: 20,
    },
    title:{
        fontWeight:"bold",
        marginBottom:10,
    },
    text:{
        alignItems: "flex-start",
        justifyContent: "center",
        flexShrink: 1,
        width: 100,
    }
});
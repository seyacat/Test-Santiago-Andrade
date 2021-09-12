import React, {useState , useEffect} from 'react';
import {TouchableOpacity, StyleSheet,FlatList,Text, View, Image } from 'react-native';
import {useNavigation} from '@react-navigation/native';

 function BuildingDetails (props){
    const navigation = useNavigation();
    const [data,setData] = useState({"contactIndex":0});

    let item = props.item;
    let mainContact = "none";
    let email = "";
    let index = data.contactIndex;
    if( item.contacts[0] ){
        mainContact = item.contacts[0].name;
    }


    let phones = [];
    let other_contacts = [];

    for(let contact_index in item.contacts){
        if( contact_index == index ){
            if( "phone" in item.contacts[index] ){
                phones.push({id:1,phone:item.contacts[index].phone,type:"work"});
            }
            if( "phone_home" in item.contacts[index] ){
                phones.push({id:2,phone:item.contacts[index].phone,type:"home"});
            }
            if( "email" in item.contacts[index] ){
                email = item.contacts[index].email;
            }
        }
        else{
            item.contacts[contact_index].id = contact_index;
            other_contacts.push(item.contacts[contact_index]);
        }
    }

    console.log(phones);

    return(
        <View>
            <TouchableOpacity style={styles.header} onPress={() => navigation.navigate('Home',{item:item})}>
                    <Text style={styles.headerTitle}>&#60; All Sites</Text>
                    <Image resizeMode="contain" style={styles.icon} source={require("../assets/edit.png")}/>
            </TouchableOpacity>
            <View style={styles.container}>
                <View style={styles.col1}>
                    <Image resizeMode="resize" style={styles.image} source={{ uri:item.image }}></Image>
                </View>
                <View style={styles.col2}>
                    <Text style={styles.title}>Name:</Text>
                    <Text style={styles.text}>{item.name}</Text>
                    <Text style={styles.text}></Text>
                    <Text style={styles.text}></Text>
                    <Text style={styles.title}>Main Contact:</Text>
                    <Text style={styles.text}>{mainContact}</Text>
                </View>
            </View>
            <View style={styles.container2}>
                <Text style={styles.title}>Address:</Text>
                <Text style={styles.text}>{item.address}</Text>
            </View>
            <View style={styles.container2}>
                <Text style={styles.title}>Phone:</Text>
                <FlatList
                    data = {phones}
                    keyExtractor = {(item,index)=>item.id.toString()}
                    renderItem = {({item})=>(
                        <View key={index} style={styles.phone}>
                            <Text style={styles.phoneNumber}>{item.phone}</Text>
                            <Text style={styles.phoneType}>{item.type}</Text>
                        </View>
                    )}
                        >
                </FlatList>
            </View>
            <View style={styles.container2}>
                <Text style={styles.title}>Email:</Text>
                <Text style={styles.text}>{email}</Text>
            </View>
            <View style={styles.card}>
                <View style={styles.cardHead}>
                    <Text style={styles.cardTitle}>Others Contacts</Text>
                </View>
                <View style={styles.cardBody}>
                    <FlatList
                        data = {other_contacts}
                        keyExtractor = {(item,index)=>item.id.toString()}
                        renderItem = {({item})=>(
                            <TouchableOpacity key={index} style={styles.otherContact} onPress={() => setData({"contactIndex":item.id})}>
                                <Text style={styles.cardName}>{item.name}</Text>
                                <Text style={styles.cardPhone}>{item.phone}</Text>
                            </TouchableOpacity>
                        )}
                            >
                    </FlatList>
                </View>
            </View>

        </View>
    )

}

export default BuildingDetails;

const styles = StyleSheet.create({
    header: {
        flex:1,
        borderColor: "#ddd",
        borderBottomWidth: "1px",
        justifyContent: "center",
        flexDirection:"row",
        padding:"5px",
        paddingLeft:"15px",
    },
    headerTitle: {
        fontWeight:"bold",
        flex:6,
        padding:"5px",
        justifyContent: "center",
    },
    container: {

        flexDirection:"row",
        //backgroundColor: "#bcbcbc",
        margin:"5px",
        marginTop:"20px",
        height:"170px"
    },
    col1:{
        flex: 1,
        paddingLeft: "15px",
    },
    image:{
        flex:1,
    },
    icon:{
        flex:1
    },
    col2:{
        flex: 1,
        alignItems: "left",
        justifyContent: "center",
        paddingLeft: "20px",
    },
    title:{
        fontWeight:"bold",
        marginBottom:"5px",
    },
    text:{
        alignItems: "left",
        justifyContent: "center",
        flexShrink: 1,
        width: "100%",
        marginBottom:"10px",
    },
    container2: {
        flex:1,
        paddingLeft: "15px",
        //backgroundColor: "#bcbcbc",
        margin:"5px",
        height:"170px"
    },
    phone: {
        flexDirection:"row",
    },
    phoneNumber: {
        flex:4,
    },
    phoneType: {
        flex:1,
    },
    card: {
        margin:"10px",
        minHeight:"100px",
        borderWidth:1,
        borderColor: "#ddd",
    },
    cardHead: {
        alignItems: "left",
        padding:"5px",
        justifyContent: "center",
        borderBottomWidth:1,
        borderColor: "#ddd",
    },
    cardTitle:{
        fontWeight:"bold",
    },
    cardName:{
        flex:1,
    },
    cardPhone:{
        flex:1,
    },
    otherContact:{
        paddingLeft:"5px",
        flexDirection:"row",
    }
});